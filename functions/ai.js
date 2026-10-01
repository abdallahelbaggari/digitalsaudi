// DigitalSaudi — /ai  (Cloudflare Pages Function)
// Saudi AI assistant powered by Claude (Anthropic API).
// Needs: ANTHROPIC_API_KEY (secret) and the DS_KV binding (for daily limits + Premium check).
// Free users: 5 questions per day. Premium (verified Pi account with active Premium): unlimited.
//   POST /ai { mode, messages:[{role,content}], accessToken?, guest? }

const MODEL = 'claude-haiku-4-5-20251001';
const FREE_PER_DAY = 5;
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

export async function onRequestPost(context) {
  const env = context.env;
  if (!env.ANTHROPIC_API_KEY) return json({ ok: false, error: 'not_configured' });
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
      if (used >= FREE_PER_DAY) return json({ ok: false, error: 'limit', remaining: 0 });
      if (!user) { ipUsed = parseInt(await kv.get('ai:' + today() + ':ip:' + ip), 10) || 0; if (ipUsed >= FREE_PER_DAY * 4) return json({ ok: false, error: 'limit', remaining: 0 }); }
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: env.AI_MODEL || MODEL, max_tokens: 1000, system: BASE + '\n' + MODES[mode] + '\nToday (Saudi time) is ' + today() + '.', messages: merged })
    });
    const d = await res.json().catch(() => null);
    if (!res.ok || !d || !d.content) return json({ ok: false, error: 'upstream' });
    const reply = d.content.filter(c => c.type === 'text').map(c => c.text).join('\n').trim();
    if (!reply) return json({ ok: false, error: 'empty' });

    if (!premium && kv) {
      await kv.put(limitKey, String(used + 1), { expirationTtl: 172800 });
      if (!user) await kv.put('ai:' + today() + ':ip:' + ip, String(ipUsed + 1), { expirationTtl: 172800 });
    }
    return json({ ok: true, reply, premium, remaining: premium ? null : Math.max(0, FREE_PER_DAY - used - 1) });
  } catch (err) {
    return json({ ok: false, error: 'server' });
  }
}
export async function onRequestOptions() { return new Response(null, { status: 204, headers: HEADERS }); }
