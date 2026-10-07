// DigitalSaudi — /translate  (Cloudflare Pages Function)
// Translates short interface and guide texts into the user's language, once, and caches each result for 60 days.
// Free: Google Gemini (GEMINI_API_KEY), with Cloudflare Workers AI (binding AI) as a backup.
//   POST /translate   { "lang": "ar", "texts": ["Visas & residency", "..."] }
//   → { ok, out: ["التأشيرات والإقامة", ...] }   (same order; null where a text could not be translated)

const HEADERS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Content-Type': 'application/json' };
const json = o => new Response(JSON.stringify(o), { status: 200, headers: { ...HEADERS, 'Cache-Control': 'no-store' } });
const LANGS = { ar: 'Arabic (Modern Standard, as used in Saudi Arabia)', ur: 'Urdu', id: 'Indonesian', ha: 'Hausa', fr: 'French' };
const TTL = 5184000;      // 60 days
const MAX_TEXTS = 40, MAX_LEN = 700, DAILY_NEW = 4000;

async function sha(s) {
  const d = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(s));
  return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, '0')).join('');
}
const PROMPT = (lang, arr) => `Translate each English string in this JSON array into ${lang} for a mobile app about life, travel, Umrah and work in Saudi Arabia.
Rules:
- Return ONLY a JSON array of strings, same length and same order. No comments, no markdown.
- Keep emoji, numbers, symbols (π, SAR, %, +966…), URLs and e-mail addresses exactly as they are.
- Keep brand and service names unchanged: DigitalSaudi, Pi, Pi Network, Pi Browser, Pi Wallet, Absher, Nusuk, Tawakkalna, Qiwa, Muqeem, Sehhaty, Jadarat, Haramain, Uber, Careem, WhatsApp.
- Use the usual Islamic terms for that language (Umrah, Hajj, Ihram, Tawaf, Sa'i, Zamzam, etc.).
- Short labels stay short. Be natural, polite and accurate.
${JSON.stringify(arr)}`;

function parseArr(text, n) {
  const m = String(text || '').replace(/```json|```/g, '').match(/\[[\s\S]*\]/);
  if (!m) throw new Error('no json');
  const a = JSON.parse(m[0]);
  if (!Array.isArray(a) || a.length !== n) throw new Error('length ' + (a && a.length) + '≠' + n);
  return a.map(x => (typeof x === 'string' ? x.replace(/<[^>]*>/g, '').slice(0, 1400) : null));
}
async function viaGemini(env, lang, arr) {
  const models = [env.GEMINI_MODEL, 'gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-flash-lite-latest'].filter((m, i, a) => m && a.indexOf(m) === i);
  const errs = [];
  for (const model of models) {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': String(env.GEMINI_API_KEY).trim() },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: PROMPT(lang, arr) }] }], generationConfig: { temperature: 0.1, maxOutputTokens: 8192, responseMimeType: 'application/json' } })
    });
    const d = await res.json().catch(() => null);
    if (!res.ok || !d) { errs.push(model + ' ' + res.status); continue; }
    const parts = (d.candidates && d.candidates[0] && d.candidates[0].content && d.candidates[0].content.parts) || [];
    try { return parseArr(parts.filter(p => p.text && !p.thought).map(p => p.text).join(''), arr.length); } catch (e) { errs.push(model + ' ' + e.message); }
  }
  throw new Error('gemini: ' + errs.join(' | '));
}
async function viaWorkersAI(env, lang, arr) {
  const r = await env.AI.run(env.CF_AI_MODEL || '@cf/meta/llama-3.3-70b-instruct-fp8-fast', { messages: [{ role: 'user', content: PROMPT(lang, arr) }], max_tokens: 4000, temperature: 0.1 });
  return parseArr(r && (r.response || (r.result && r.result.response)), arr.length);
}

export async function onRequestPost(context) {
  const env = context.env;
  let b; try { b = await context.request.json(); } catch (e) { return json({ ok: false, error: 'bad_request' }); }
  const code = String(b.lang || ''), lang = LANGS[code];
  if (!lang) return json({ ok: false, error: 'Unsupported language' });
  const texts = (Array.isArray(b.texts) ? b.texts : []).slice(0, MAX_TEXTS).map(s => String(s == null ? '' : s).slice(0, MAX_LEN));
  if (!texts.length) return json({ ok: true, out: [] });

  // 1) cached answers
  const out = new Array(texts.length).fill(null);
  const keys = await Promise.all(texts.map(s => sha(code + '|' + s)));
  const reqs = keys.map(k => new Request('https://cache.digitalsaudi.internal/tr/' + k));
  await Promise.all(reqs.map(async (r, i) => {
    try { const h = await caches.default.match(r); if (h) { out[i] = await h.text(); return; } } catch (e) {}
    if (env.DS_KV) { try { const v = await env.DS_KV.get('tr:' + keys[i]); if (v != null) out[i] = v; } catch (e) {} }
  }));
  const miss = []; out.forEach((v, i) => { if (v == null && texts[i].trim()) miss.push(i); });
  if (!miss.length) return json({ ok: true, out, cached: true });

  // 2) light per-IP limit for new translations
  const ip = context.request.headers.get('CF-Connecting-IP') || '0', day = new Date().toISOString().slice(0, 10);
  if (env.DS_KV) {
    const k = 'trn:' + day + ':' + ip, n = parseInt(await env.DS_KV.get(k), 10) || 0;
    if (n >= DAILY_NEW) return json({ ok: true, out, limited: true });
    context.waitUntil(env.DS_KV.put(k, String(n + miss.length), { expirationTtl: 172800 }));
  }

  // 3) translate the missing ones
  const arr = miss.map(i => texts[i]);
  const tries = [];
  if (env.GEMINI_API_KEY) tries.push(() => viaGemini(env, lang, arr));
  if (env.AI && typeof env.AI.run === 'function') tries.push(() => viaWorkersAI(env, lang, arr));
  if (!tries.length) return json({ ok: false, error: 'Translation not configured (add GEMINI_API_KEY)', out });
  const errors = [];
  for (const fn of tries) {
    try {
      const got = await fn();
      got.forEach((v, j) => {
        const i = miss[j]; if (!v) return; out[i] = v;
        context.waitUntil(caches.default.put(reqs[i], new Response(v, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=' + TTL } })));
        if (env.DS_KV) context.waitUntil(env.DS_KV.put('tr:' + keys[i], v, { expirationTtl: TTL }));
      });
      return json({ ok: true, out });
    } catch (e) { errors.push(String(e && e.message || e).slice(0, 300)); }
  }
  return json({ ok: false, error: 'Translation unavailable right now', detail: errors.join(' || '), out });
}
export async function onRequestGet() { return json({ ok: true, info: 'POST { lang, texts[] } — languages: ' + Object.keys(LANGS).join(', ') }); }
export async function onRequestOptions() { return new Response(null, { status: 204, headers: HEADERS }); }
