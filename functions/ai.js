// DigitalSaudi — /ai  (Cloudflare Pages Function)
// Saudi AI assistant — FREE providers first, with automatic fallback:
//   1. Google Gemini (free tier)      → secret  GEMINI_API_KEY   (aistudio.google.com → Get API key)
//   2. Cloudflare Workers AI (free)   → binding AI  (Settings → Bindings → Add → Workers AI)
//   3. Anthropic Claude (paid, optional) → secret ANTHROPIC_API_KEY
// Set up at least one. DS_KV binding enforces the daily free limit and checks Premium.
// Free users: AI_FREE_PER_DAY questions/day (default 10). Premium: unlimited.
//   POST /ai { mode, messages:[{role,content}], accessToken?, guest? }

const GEMINI_MODEL = 'gemini-flash-latest';
const CF_MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const CLAUDE_MODEL = 'claude-haiku-4-5-20251001';
const HEADERS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
const json = o => new Response(JSON.stringify(o), { status: 200, headers: HEADERS });

const BASE = `You are "Saudi AI", the assistant inside DigitalSaudi — an independent Pi Network app that helps pilgrims, visitors, workers and residents with Saudi Arabia. DigitalSaudi is NOT affiliated with the Saudi government.
Style: friendly, clear, practical. Simple English (many users speak English as a second language). Use short paragraphs, bullet points and bold for key facts. Keep answers under about 250 words unless the user asks for a full plan or itinerary.
Accuracy: visa rules, fees, prices and procedures change — say so briefly and point to the official source (visa.visitsaudi.com, Nusuk, Absher, Qiwa, the relevant ministry). Never invent phone numbers, prices, hotel names or opening hours; if unsure, say so. Give prices as rough ranges.
Safety: for emergencies tell users to call 911 (ambulance 997, police 999). You are not a doctor or lawyer — give general information and advise professional help when needed.
Religion: give mainstream, respectful answers; mention when scholars differ, and suggest asking a qualified scholar for personal rulings.
Security: never ask for passwords, OTP codes or a Pi passphrase. If a user shares one, tell them to change it and never share it.
Stay on helpful, lawful topics. Politely decline anything harmful.`;

const MODES = {
  general: 'Mode: general Saudi assistant.',
  travel: 'Mode: travel planner. Build realistic day-by-day plans with times, transport between places, rough SAR costs and heat/prayer-time tips. Ask at most one clarifying question if key details (dates, budget, city) are missing — otherwise make sensible assumptions and state them.',
  pilgrim: 'Mode: Hajj & Umrah assistant. Explain rites step by step, documents, Nusuk permits, health and packing, and etiquette in the Haramain. For users from Nigeria, mention NAHCON for Hajj where relevant.',
  city: 'Mode: city guide for Saudi cities — neighbourhoods, sights, family activities, best times to visit.',
  food: 'Mode: food finder — Saudi dishes, what to order, types of restaurants and areas to look in. Do not invent specific restaurant names unless they are well-known chains or landmarks; suggest using the app’s Explore › Restaurants map for nearby places.',
  career: 'Mode: career assistant — CVs, cover letters, interviews (one question at a time when running a mock interview, then feedback), Saudi job market, Qiwa, contracts and end-of-service basics. Warn that real employers never charge for visas or jobs.',
  finance: 'Mode: finance helper — budgets in SAR/NGN/USD, VAT (15%), gratuity, remittances via licensed providers, basic Pi safety. Not financial advice; no investment recommendations.',
  knowledge: 'Mode: Saudi knowledge — history, geography, culture, traditions, Vision 2030, landmarks. Be factual and balanced.',
  translate: 'Mode: translator between English and Arabic. Give the Arabic, a simple transliteration and a note on Saudi/Gulf dialect when helpful. Keep it short.',
  safety: 'Mode: safety assistant — lost documents, scams, heat, desert and road safety. Give clear numbered steps and the right emergency numbers.'
};

function today() { return new Date(Date.now() + 3 * 3600000).toISOString().slice(0, 10); }

async function verifyPi(token) {
  if (!token) return null;
  try { const r = await fetch('https://api.minepi.com/v2/me', { headers: { Authorization: 'Bearer ' + token } }); if (!r.ok) return null; const u = await r.json(); return u && u.uid ? u : null; }
  catch (e) { return null; }
}


/* ---------- providers: each returns reply text or throws ---------- */
const GEMINI_FALLBACKS = ['gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-flash-lite-latest'];
async function askGemini(env, system, msgs) {
  const models = [env.GEMINI_MODEL].concat(GEMINI_FALLBACKS).filter((m, i, a) => m && a.indexOf(m) === i);
  const errs = [];
  for (const model of models) {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': String(env.GEMINI_API_KEY).trim() },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: msgs.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
        generationConfig: { temperature: 0.6, maxOutputTokens: 2048 }
      })
    });
    const d = await res.json().catch(() => null);
    if (!res.ok || !d) { errs.push(model + ' ' + res.status + ' ' + (d && d.error && d.error.message || '').slice(0, 120)); if (res.status === 400 && /API key/i.test(JSON.stringify(d || ''))) break; continue; }
    const parts = (d.candidates && d.candidates[0] && d.candidates[0].content && d.candidates[0].content.parts) || [];
    const text = parts.filter(p => p.text && !p.thought).map(p => p.text).join('').trim();
    if (text) return text;
    errs.push(model + ' empty');
  }
  throw new Error('gemini: ' + errs.join(' | '));
}
async function askWorkersAI(env, system, msgs) {
  const r = await env.AI.run(env.CF_AI_MODEL || CF_MODEL, { messages: [{ role: 'system', content: system }].concat(msgs), max_tokens: 900, temperature: 0.6 });
  const text = (r && (r.response || (r.result && r.result.response)) || '').trim();
  if (!text) throw new Error('workers-ai empty');
  return text;
}
async function askClaude(env, system, msgs) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: env.AI_MODEL || CLAUDE_MODEL, max_tokens: 1000, system, messages: msgs })
  });
  const d = await res.json().catch(() => null);
  if (!res.ok || !d || !d.content) throw new Error('claude ' + res.status);
  const text = d.content.filter(c => c.type === 'text').map(c => c.text).join('\n').trim();
  if (!text) throw new Error('claude empty');
  return text;
}
function providers(env) {
  const list = [];
  if (env.GEMINI_API_KEY) list.push(['gemini', askGemini]);
  if (env.AI && typeof env.AI.run === 'function') list.push(['workers-ai', askWorkersAI]);
  if (env.ANTHROPIC_API_KEY) list.push(['claude', askClaude]);
  return list;
}

export async function onRequestPost(context) {
  const env = context.env;
  const list = providers(env);
  if (!list.length) return json({ ok: false, error: 'not_configured' });
  const FREE = parseInt(env.AI_FREE_PER_DAY, 10) || 10;
  const kv = env.DS_KV;
  try {
    const b = await context.request.json();
    const mode = MODES[b.mode] ? b.mode : 'general';

    // Clean the conversation: alternating roles, user first and last, trimmed length.
    let msgs = (Array.isArray(b.messages) ? b.messages : []).slice(-10)
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
      .map(m => ({ role: m.role, content: m.content.slice(0, 4000) }));
    while (msgs.length && msgs[0].role !== 'user') msgs.shift();
    const merged = [];
    for (const m of msgs) { if (merged.length && merged[merged.length - 1].role === m.role) merged[merged.length - 1].content += '\n\n' + m.content; else merged.push(m); }
    if (!merged.length || merged[merged.length - 1].role !== 'user') return json({ ok: false, error: 'bad_request' });

    // Who is asking + limits
    const user = await verifyPi(b.accessToken);
    let premium = false;
    if (user && kv) {
      const p = JSON.parse((await kv.get('premium:' + user.uid)) || 'null');
      premium = !!(p && (p.tier === 'lifetime' || (p.expires && p.expires > Date.now())));
    }
    const ip = context.request.headers.get('CF-Connecting-IP') || '0';
    const who = user ? 'u:' + user.uid : 'g:' + String(b.guest || '').slice(0, 40) + ':' + ip;
    const limitKey = 'ai:' + today() + ':' + who;
    let used = 0, ipUsed = 0;
    if (!premium && kv) {
      used = parseInt(await kv.get(limitKey), 10) || 0;
      if (used >= FREE) return json({ ok: false, error: 'limit', remaining: 0, free: FREE });
      if (!user) { ipUsed = parseInt(await kv.get('ai:' + today() + ':ip:' + ip), 10) || 0; if (ipUsed >= FREE * 4) return json({ ok: false, error: 'limit', remaining: 0, free: FREE }); }
    }

    const LANGS = { Arabic: 1, Urdu: 1, Indonesian: 1, Hausa: 1, French: 1 };
    const lang = LANGS[b.lang] ? b.lang : '';
    const system = BASE + '\n' + MODES[mode] + '\nToday (Saudi time) is ' + today() + '.' +
      (lang ? '\nThe user has chosen ' + lang + ' as their app language. Reply in ' + lang + ' unless they write to you in another language, then reply in theirs. Keep Arabic religious terms and names of places, apps and services recognisable.' : '');
    let reply = '', via = '';
    const errors = [];
    for (const [name, fn] of list) {
      try { reply = await fn(env, system, merged); via = name; break; }
      catch (e) { errors.push(String(e && e.message || e).slice(0, 300)); console.log('[ai] ' + name + ' failed: ' + (e && e.message)); }
    }
    if (!reply) return json({ ok: false, error: 'upstream', detail: errors.join(' || ') });

    if (!premium && kv) {
      await kv.put(limitKey, String(used + 1), { expirationTtl: 172800 });
      if (!user) await kv.put('ai:' + today() + ':ip:' + ip, String(ipUsed + 1), { expirationTtl: 172800 });
    }
    return json({ ok: true, reply, via, premium, free: FREE, remaining: premium ? null : Math.max(0, FREE - used - 1) });
  } catch (err) {
    return json({ ok: false, error: 'server' });
  }
}
// Health check: open /ai?check=1 in a browser to see whether the AI providers answer.
export async function onRequestGet(context) {
  const env = context.env;
  if (!new URL(context.request.url).searchParams.get('check')) return json({ ok: true, endpoint: '/ai' });
  const list = providers(env), out = { providers: list.map(p => p[0]), KV: !!env.DS_KV, results: {} };
  for (const [name, fn] of list) {
    try { const r = await fn(env, 'Reply with the single word OK.', [{ role: 'user', content: 'Say OK' }]); out.results[name] = 'OK: ' + r.slice(0, 40); }
    catch (e) { out.results[name] = 'FAILED: ' + String(e && e.message || e).slice(0, 300); }
  }
  return json(out);
}
export async function onRequestOptions() { return new Response(null, { status: 204, headers: HEADERS }); }
