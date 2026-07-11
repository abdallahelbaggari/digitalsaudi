/**
 * DigitalSaudi · /ai · v7.0
 * Google Gemini 1.5 Flash — FULLY DEBUGGED
 */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const SYSTEM = `You are the DigitalSaudi AI Concierge — a warm, knowledgeable assistant for Saudi Arabia.

Help with: Saudi tourism, startups, Vision 2030, culture, events, Pi economy, food, travel tips.
Keep responses short and mobile-friendly (3-5 sentences).
Never give financial, legal, or political advice.
Respond in the same language the user writes in (Arabic or English).`;

export async function onRequestGet(context) {
  const key = context.env.GEMINI_API_KEY;
  return new Response(JSON.stringify({
    status: 'ok',
    service: 'DigitalSaudi AI Concierge',
    model: 'gemini-1.5-flash',
    key_present: !!key,
    key_length: key ? key.length : 0,
  }), { status: 200, headers: CORS });
}

export async function onRequestPost(context) {
  console.log('[DS/ai] POST received');
  const key = context.env.GEMINI_API_KEY;

  if (!key) {
    console.error('[DS/ai] GEMINI_API_KEY not set in Cloudflare env vars');
    return new Response(JSON.stringify({
      reply: '⚠️ AI setup needed. Add GEMINI_API_KEY to Cloudflare Environment Variables (Settings → Variables and secrets).'
    }), { status: 200, headers: CORS });
  }

  let messages;
  try {
    const body = await context.request.json();
    messages = body.messages || [];
    console.log('[DS/ai] messages count:', messages.length);
  } catch (e) {
    console.error('[DS/ai] body parse error:', e.message);
    return new Response(JSON.stringify({ reply: 'Request error. Please try again.' }),
      { status: 200, headers: CORS });
  }

  if (!messages.length) {
    return new Response(JSON.stringify({ reply: 'No message received.' }),
      { status: 200, headers: CORS });
  }

  /* Build contents — Gemini requires alternating user/model, starting with user */
  let contents = [];
  for (const m of messages.slice(-10)) {
    const role = m.role === 'assistant' ? 'model' : 'user';
    const text = String(m.content || '').trim();
    if (!text) continue;
    /* Avoid consecutive same-role messages */
    if (contents.length && contents[contents.length-1].role === role) continue;
    contents.push({ role, parts: [{ text }] });
  }
  /* Must start with user */
  while (contents.length && contents[0].role === 'model') contents.shift();
  if (!contents.length) {
    return new Response(JSON.stringify({ reply: 'Please send a message.' }),
      { status: 200, headers: CORS });
  }

  const payload = {
    system_instruction: { parts: [{ text: SYSTEM }] },
    contents,
    generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
  };

  console.log('[DS/ai] calling Gemini, contents:', contents.length);

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20000),
      }
    );

    const raw = await resp.text();
    console.log('[DS/ai] Gemini status:', resp.status);
    console.log('[DS/ai] Gemini raw:', raw.slice(0, 300));

    if (!resp.ok) {
      console.error('[DS/ai] Gemini error:', resp.status, raw.slice(0, 200));
      return new Response(JSON.stringify({
        reply: 'AI temporarily unavailable (' + resp.status + '). Try again in a moment.'
      }), { status: 200, headers: CORS });
    }

    let data;
    try { data = JSON.parse(raw); } catch (e) {
      console.error('[DS/ai] JSON parse error:', e.message);
      return new Response(JSON.stringify({ reply: 'AI response error. Please try again.' }),
        { status: 200, headers: CORS });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      const reason = data?.candidates?.[0]?.finishReason || 'unknown';
      const blocked = data?.promptFeedback?.blockReason;
      console.error('[DS/ai] no text, finishReason:', reason, 'blockReason:', blocked);
      return new Response(JSON.stringify({
        reply: 'AI could not respond (' + (blocked || reason) + '). Please rephrase.'
      }), { status: 200, headers: CORS });
    }

    console.log('[DS/ai] success, reply length:', text.length);
    return new Response(JSON.stringify({ reply: text }),
      { headers: { ...CORS, 'Cache-Control': 'no-store' } });

  } catch (err) {
    console.error('[DS/ai] fetch error:', err.message);
    return new Response(JSON.stringify({
      reply: 'Connection error. Check your internet and try again.'
    }), { status: 200, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 200, headers: CORS });
}
