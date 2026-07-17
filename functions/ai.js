/* DigitalSaudi · /ai · v10.1 · Gemini with retry */
const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};
const SYS = `You are the DigitalSaudi AI Concierge — a knowledgeable Saudi Arabia expert.
Help with: tourism (AlUla, NEOM, Red Sea, Diriyah, Abha, Jeddah, Riyadh), Vision 2030, startups (Tamara, Tabby, Salla, Foodics, Lean), culture, Arabic phrases, Pi economy, LEAP, FII, Saudi food.
Rules: short mobile-friendly answers (3-5 sentences max). No fake stats. Reply in user language (Arabic or English).`;

const MODELS = [
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash',
  'gemini-1.5-flash-latest',
];

async function callGemini(key, model, contents) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYS }] },
      contents,
      generationConfig: { maxOutputTokens: 350, temperature: 0.7 },
    }),
    signal: AbortSignal.timeout(18000),
  });
  return { status: resp.status, data: await resp.json() };
}

export async function onRequestGet(context) {
  const key = context.env.GEMINI_API_KEY;
  return new Response(JSON.stringify({
    status: 'ok', service: 'DigitalSaudi AI',
    key_present: !!key, key_length: key ? key.length : 0,
    models: MODELS,
  }), { status: 200, headers: CORS });
}

export async function onRequestPost(context) {
  const key = context.env.GEMINI_API_KEY;
  if (!key) return new Response(JSON.stringify({ reply: 'Add GEMINI_API_KEY to Cloudflare Environment Variables.' }), { status: 200, headers: CORS });

  let messages;
  try {
    const b = await context.request.json();
    messages = b.messages || [];
  } catch(e) {
    return new Response(JSON.stringify({ reply: 'Request error. Try again.' }), { status: 200, headers: CORS });
  }
  if (!messages.length) return new Response(JSON.stringify({ reply: 'No message.' }), { status: 200, headers: CORS });

  /* Build contents — remove consecutive same-role */
  let contents = messages.slice(-10).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(m.content || '').trim() }]
  })).filter(m => m.parts[0].text);
  while (contents.length && contents[0].role === 'model') contents.shift();
  const deduped = [];
  for (const c of contents) {
    if (deduped.length && deduped[deduped.length-1].role === c.role) continue;
    deduped.push(c);
  }
  if (!deduped.length) return new Response(JSON.stringify({ reply: 'Please send a message.' }), { status: 200, headers: CORS });

  /* Try each model in order — skip on 429/404 */
  for (const model of MODELS) {
    try {
      console.log(`[DS/ai] trying ${model}`);
      const { status, data } = await callGemini(key, model, deduped);
      console.log(`[DS/ai] ${model} status: ${status}`);
      if (status === 429) { console.log(`[DS/ai] ${model} rate limited, trying next`); continue; }
      if (status === 404) { console.log(`[DS/ai] ${model} not found, trying next`); continue; }
      if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const reason = data?.candidates?.[0]?.finishReason || JSON.stringify(data).slice(0,100);
        console.log(`[DS/ai] ${model} no text: ${reason}`);
        continue;
      }
      const text = data.candidates[0].content.parts[0].text;
      return new Response(JSON.stringify({ reply: text, model }), { headers: { ...CORS, 'Cache-Control': 'no-store' } });
    } catch(err) {
      console.error(`[DS/ai] ${model} error:`, err.message);
      continue;
    }
  }

  return new Response(JSON.stringify({ reply: 'AI is temporarily busy. Please try again in a moment.' }), { status: 200, headers: CORS });
}

export async function onRequestOptions() {
  return new Response(null, { status: 200, headers: CORS });
}
