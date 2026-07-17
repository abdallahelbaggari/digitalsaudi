/* DigitalSaudi · /ai · v8.0 · Gemini 1.5 Flash */
const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};
const SYS = `You are the DigitalSaudi AI Concierge — a warm, knowledgeable Saudi Arabia expert.
Help with: tourism (AlUla, NEOM, Red Sea, Diriyah, Abha, Jeddah, Riyadh), Vision 2030, startups (Tamara, Tabby, Salla, Foodics, Lean), culture, Arabic phrases, Pi economy, LEAP, FII, Saudi food, events.
Rules: short mobile-friendly answers (3-5 sentences). Never fake stats. No financial/legal/political advice. Reply in user's language (Arabic or English).`;

export async function onRequestGet(context) {
  const key = context.env.GEMINI_API_KEY;
  return new Response(JSON.stringify({
    status:'ok', service:'DigitalSaudi AI', model:'gemini-2.0-flash-lite',
    key_present:!!key, key_length:key?key.length:0
  }), { status:200, headers:CORS });
}

export async function onRequestPost(context) {
  console.log('[DS/ai] POST received');
  const key = context.env.GEMINI_API_KEY;
  if (!key) {
    console.error('[DS/ai] GEMINI_API_KEY not set');
    return new Response(JSON.stringify({ reply:'⚠️ Add GEMINI_API_KEY to Cloudflare Environment Variables.' }), { status:200, headers:CORS });
  }
  let messages;
  try {
    const b = await context.request.json();
    messages = b.messages || [];
  } catch(e) {
    return new Response(JSON.stringify({ reply:'Request error. Try again.' }), { status:200, headers:CORS });
  }
  if (!messages.length) return new Response(JSON.stringify({ reply:'No message.' }), { status:200, headers:CORS });

  let contents = messages.slice(-10).map(m=>({
    role: m.role==='assistant'?'model':'user',
    parts:[{text:String(m.content||'').trim()}]
  })).filter(m=>m.parts[0].text);
  while(contents.length && contents[0].role==='model') contents.shift();
  /* Remove consecutive same-role */
  const deduped = [];
  for(const c of contents){
    if(deduped.length && deduped[deduped.length-1].role===c.role) continue;
    deduped.push(c);
  }
  if(!deduped.length) return new Response(JSON.stringify({ reply:'Please send a message.' }), { status:200, headers:CORS });

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${key}`;
    console.log('[DS/ai] calling Gemini, msgs:', deduped.length);
    const resp = await fetch(url, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        system_instruction:{parts:[{text:SYS}]},
        contents:deduped,
        generationConfig:{maxOutputTokens:400,temperature:0.7},
      }),
      signal:AbortSignal.timeout(20000),
    });
    const raw = await resp.text();
    console.log('[DS/ai] Gemini status:', resp.status, 'preview:', raw.slice(0,200));
    if(!resp.ok) return new Response(JSON.stringify({ reply:'AI temporarily unavailable ('+resp.status+'). Try again.' }), { status:200, headers:CORS });
    const data = JSON.parse(raw);
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if(!text){
      const reason = data?.candidates?.[0]?.finishReason||'unknown';
      console.error('[DS/ai] no text, reason:', reason);
      return new Response(JSON.stringify({ reply:'AI could not respond ('+reason+'). Rephrase your question.' }), { status:200, headers:CORS });
    }
    return new Response(JSON.stringify({ reply:text }), { headers:{...CORS,'Cache-Control':'no-store'} });
  } catch(err) {
    console.error('[DS/ai] error:', err.message);
    return new Response(JSON.stringify({ reply:'Connection error. Check internet and try again.' }), { status:200, headers:CORS });
  }
}
export async function onRequestOptions() {
  return new Response(null, { status:200, headers:CORS });
}
