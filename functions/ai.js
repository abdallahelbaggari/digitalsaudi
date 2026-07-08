/**
 * DigitalSaudi · /ai · v6.0
 * Google Gemini 1.5 Flash — FIXED
 * Correct API format, proper error handling
 */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const SYSTEM = `You are the DigitalSaudi AI Concierge — a warm, knowledgeable assistant for Saudi Arabia.

You help with:
- TOURISM: AlUla, NEOM, Red Sea, Diriyah, Jeddah, Riyadh, Makkah, Madinah, Abha
- BUSINESS: Vision 2030, Saudi startups, LEAP, FII, Pi economy in Saudi Arabia
- CULTURE: Arabic phrases, customs, Hajj, Umrah, Saudi cuisine, traditions, etiquette
- TECH: SDAIA, Aramco Digital, STC, Tamara, Tabby, Salla, Foodics, Lean Technologies
- EVENTS: LEAP, FII, Riyadh Season, Esports World Cup, Hajj Expo
- VISION 2030: Giga projects — factual, status labels only, no fake percentages
- PI NETWORK: Pi in Saudi Arabia, Pi payments, Pi ecosystem

STRICT RULES:
- Keep responses short and mobile-friendly (3-5 sentences max)
- Never invent statistics or fake data
- Never give financial, legal, or political advice
- Respond in the same language the user writes in
- Be warm, accurate, culturally respectful`;

export async function onRequestGet() {
  return new Response(
    JSON.stringify({ status: 'ok', service: 'DigitalSaudi AI', model: 'gemini-1.5-flash' }),
    { headers: { ...CORS, 'Content-Type': 'application/json' } }
  );
}

export async function onRequestPost(context) {
  const key = context.env.GEMINI_API_KEY;

  if (!key) {
    console.error('[ai] GEMINI_API_KEY not set');
    return new Response(
      JSON.stringify({ reply: '⚠️ AI Concierge setup needed. Add GEMINI_API_KEY to Cloudflare Environment Variables.' }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }

  let body;
  try {
    body = await context.request.json();
  } catch (e) {
    return new Response(
      JSON.stringify({ reply: 'Invalid request. Please try again.' }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (!messages.length) {
    return new Response(
      JSON.stringify({ reply: 'No message received. Please type something.' }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }

  /* Build Gemini contents — must start with user role */
  let contents = messages.slice(-10).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(m.content || '').trim() }],
  })).filter(m => m.parts[0].text);

  /* Ensure first message is user */
  while (contents.length && contents[0].role === 'model') {
    contents.shift();
  }

  if (!contents.length) {
    return new Response(
      JSON.stringify({ reply: 'Please send a message.' }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
    const payload = {
      system_instruction: {
        parts: [{ text: SYSTEM }]
      },
      contents,
      generationConfig: {
        maxOutputTokens: 400,
        temperature: 0.7,
        topP: 0.9,
      },
    };

    console.log('[ai] Calling Gemini, messages:', contents.length);

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20000),
    });

    const raw = await resp.text();
    console.log('[ai] Gemini status:', resp.status, 'body preview:', raw.slice(0, 200));

    if (!resp.ok) {
      return new Response(
        JSON.stringify({ reply: 'AI temporarily unavailable ('+resp.status+'). Please try again in a moment.' }),
        { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
      );
    }

    let data;
    try { data = JSON.parse(raw); } catch(e) {
      return new Response(
        JSON.stringify({ reply: 'AI response parse error. Please try again.' }),
        { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
      );
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      const reason = data?.candidates?.[0]?.finishReason || 'unknown';
      console.error('[ai] No text, finishReason:', reason, 'full:', JSON.stringify(data).slice(0,300));
      return new Response(
        JSON.stringify({ reply: 'AI could not generate a response ('+reason+'). Please rephrase your question.' }),
        { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ reply: text }),
      { headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
    );

  } catch (err) {
    console.error('[ai] Error:', err.message);
    return new Response(
      JSON.stringify({ reply: 'Connection error. Please check your internet and try again.' }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}
