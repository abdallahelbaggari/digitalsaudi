// DigitalSaudi — /dict  (Cloudflare Pages Function)
// English ⇄ Arabic dictionary for ANY word or phrase. Uses Google Gemini (GEMINI_API_KEY, free tier),
// with Cloudflare Workers AI (binding AI) as a backup. Results are cached for 30 days.
//   GET /dict?q=pharmacy        GET /dict?q=شكرا
// Returns: { ok, query, from, results:[{ en, ar, tr, pos, note }], examples:[{ ar, tr, en }] }

const HEADERS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Content-Type': 'application/json' };
const json = (o, age) => new Response(JSON.stringify(o), { status: 200, headers: { ...HEADERS, 'Cache-Control': age ? 'public, max-age=' + age : 'no-store' } });
const TTL = 2592000;

const PROMPT = q => `You are an expert English–Arabic dictionary for visitors to Saudi Arabia.
Look up: "${q}"
If it is English, give Arabic translations. If it is Arabic, give English meanings.
Return ONLY valid JSON (no markdown) in exactly this shape:
{"from":"en" or "ar","results":[{"en":"English meaning","ar":"Arabic in Arabic script, with key vowel marks if helpful","tr":"simple Latin transliteration","pos":"noun/verb/adjective/phrase/etc","note":"short usage note, e.g. 'Saudi/Gulf everyday word' or 'formal (MSA)'; empty string if none"}],"examples":[{"ar":"short example sentence in Arabic","tr":"transliteration","en":"English translation"}]}
Rules: 1–4 results, most common first. Include the Saudi/Gulf everyday word when it differs from formal Arabic and label which is which. 1–2 short practical examples. Be accurate; never invent words. If the input is not a real word or phrase, return {"from":"en","results":[],"examples":[]}.`;

function parse(text) {
  const m = String(text || '').replace(/```json|```/g, '').match(/\{[\s\S]*\}/);
  if (!m) throw new Error('no json');
  const d = JSON.parse(m[0]);
  const clean = s => String(s == null ? '' : s).replace(/[<>]/g, '').slice(0, 300);
  return {
    from: d.from === 'ar' ? 'ar' : 'en',
    results: (Array.isArray(d.results) ? d.results : []).slice(0, 4).map(r => ({ en: clean(r.en), ar: clean(r.ar), tr: clean(r.tr), pos: clean(r.pos), note: clean(r.note) })).filter(r => r.ar || r.en),
    examples: (Array.isArray(d.examples) ? d.examples : []).slice(0, 2).map(e => ({ ar: clean(e.ar), tr: clean(e.tr), en: clean(e.en) })).filter(e => e.ar)
  };
}
async function viaGemini(env, q) {
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + (env.GEMINI_MODEL || 'gemini-flash-latest') + ':generateContent', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
    body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: PROMPT(q) }] }], generationConfig: { temperature: 0.2, maxOutputTokens: 2048, responseMimeType: 'application/json' } })
  });
  const d = await res.json().catch(() => null);
  if (!res.ok || !d) throw new Error('gemini ' + res.status);
  const parts = (d.candidates && d.candidates[0] && d.candidates[0].content && d.candidates[0].content.parts) || [];
  return parse(parts.filter(p => p.text && !p.thought).map(p => p.text).join(''));
}
async function viaWorkersAI(env, q) {
  const r = await env.AI.run(env.CF_AI_MODEL || '@cf/meta/llama-3.3-70b-instruct-fp8-fast', { messages: [{ role: 'user', content: PROMPT(q) }], max_tokens: 700, temperature: 0.2 });
  return parse(r && (r.response || (r.result && r.result.response)));
}

export async function onRequestGet(context) {
  const env = context.env;
  const q = (new URL(context.request.url).searchParams.get('q') || '').trim().replace(/\s+/g, ' ').slice(0, 80);
  if (!q) return json({ ok: false, error: 'Missing word' });
  const key = q.toLowerCase();
  const creq = new Request('https://cache.digitalsaudi.internal/dict/' + encodeURIComponent(key));
  try { const hit = await caches.default.match(creq); if (hit) return json(await hit.json(), 86400); } catch (e) {}
  if (env.DS_KV) { try { const k = await env.DS_KV.get('dict:' + key, 'json'); if (k) return json(k, 86400); } catch (e) {} }

  // light per-IP limit for new (uncached) lookups
  const ip = context.request.headers.get('CF-Connecting-IP') || '0', day = new Date().toISOString().slice(0, 10);
  if (env.DS_KV) { const n = parseInt(await env.DS_KV.get('dictn:' + day + ':' + ip), 10) || 0; if (n >= 80) return json({ ok: false, error: 'Daily lookup limit reached — try again tomorrow' }); context.waitUntil(env.DS_KV.put('dictn:' + day + ':' + ip, String(n + 1), { expirationTtl: 172800 })); }

  const tries = [];
  if (env.GEMINI_API_KEY) tries.push(() => viaGemini(env, q));
  if (env.AI && typeof env.AI.run === 'function') tries.push(() => viaWorkersAI(env, q));
  if (!tries.length) return json({ ok: false, error: 'Dictionary not configured (add GEMINI_API_KEY)' });
  for (const t of tries) {
    try {
      const r = await t();
      const out = { ok: true, query: q, ...r };
      if (out.results.length) {
        context.waitUntil(caches.default.put(creq, new Response(JSON.stringify(out), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=' + TTL } })));
        if (env.DS_KV) context.waitUntil(env.DS_KV.put('dict:' + key, JSON.stringify(out), { expirationTtl: TTL }));
      }
      return json(out, out.results.length ? 86400 : 0);
    } catch (e) { console.log('[dict] ' + (e && e.message)); }
  }
  return json({ ok: false, error: 'Dictionary unavailable right now' });
}
export async function onRequestOptions() { return new Response(null, { status: 204, headers: HEADERS }); }
