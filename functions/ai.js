/**
 * DigitalSaudi · /ai · Saudi AI Concierge
 * Google Gemini 1.5 Flash — FREE (1500 req/day)
 * FIXED: proper request format + error handling
 */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const SYSTEM = `You are the DigitalSaudi AI Concierge — a knowledgeable, warm assistant specialising in Saudi Arabia.

You help with:
- TOURISM: AlUla, NEOM, Red Sea, Diriyah, Jeddah, Riyadh, Makkah, Madinah, Abha
- BUSINESS: Vision 2030, Saudi startups, LEAP, FII, Pi economy
- CULTURE: Arabic phrases, customs, Hajj, Umrah, Saudi cuisine, traditions
- TECH: SDAIA, Aramco Digital, STC, Tamara, Tabby, Salla, Foodics, Lean Technologies
- EVENTS: LEAP, FII, Riyadh Season, Esports World Cup, Hajj Expo
- VISION 2030: Giga projects (factual only — status labels, no fake percentages)
- PI NETWORK: Pi in Saudi Arabia, Pi businesses, Pi ecosystem

RULES:
- Always respond concisely and mobile-friendly
- Never invent statistics
- Never give financial, legal, or political advice
- Respond in the same language the user writes in (Arabic or English)
- Be warm, accurate, and culturally respectful`;

export async function onRequestPost(context) {
  const key = context.env.GEMINI_API_KEY;

  /* Health check — confirm key is set */
  if (!key) {
    return new Response(
      JSON.stringify({ reply: 'AI Concierge is starting up. Add GEMINI_API_KEY to Cloudflare environment variables.' }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }

  let body;
  try {
    body = await context.request.json();
  } catch(e) {
    return new Response(
      JSON.stringify({ reply: 'Invalid request format.' }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }

  const messages = body.messages || [];
  if (!messages.length) {
    return new Response(
      JSON.stringify({ reply: 'No message received.' }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }

  /* Build Gemini contents */
  const contents = messages.slice(-10).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(m.content || '') }],
  }));

  /* Ensure first message is from user */
  if (contents[0]?.role === 'model') contents.shift();

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM }] },
          contents,
          generationConfig: {
            maxOutputTokens: 512,
            temperature: 0.75,
            topP: 0.95,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          ],
        }),
        signal: AbortSignal.timeout(15000),
      }
    );

    if (!resp.ok) {
      const errText = await resp.text();
      console.error('[ai] Gemini error:', resp.status, errText);
      return new Response(
        JSON.stringify({ reply: 'AI is temporarily busy. Please try again in a moment.' }),
        { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
      );
    }

    const data = await resp.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('[ai] No text in response:', JSON.stringify(data));
      return new Response(
        JSON.stringify({ reply: 'AI could not generate a response. Please try again.' }),
        { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ reply: text }),
      { headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
    );

  } catch(err) {
    console.error('[ai] Fetch error:', err.message);
    return new Response(
      JSON.stringify({ reply: 'Connection error. Please check your internet and try again.' }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }
}

export async function onRequestGet() {
  return new Response(
    JSON.stringify({ status: 'ok', service: 'DigitalSaudi AI Concierge', model: 'gemini-1.5-flash' }),
    { headers: { ...CORS, 'Content-Type': 'application/json' } }
  );
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}
