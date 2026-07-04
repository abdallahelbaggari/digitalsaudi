/**
 * DigitalSaudi · /ai · Saudi AI Concierge
 * Google Gemini 1.5 Flash — FREE tier
 * 1500 requests/day · No cost
 */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
const SYSTEM = `You are the DigitalSaudi AI Concierge — a knowledgeable, warm, professional assistant specialising in Saudi Arabia.

Topics you cover:
TOURISM: AlUla, NEOM, Red Sea, Diriyah, Jeddah, Riyadh, Makkah, Madinah, Abha — travel tips, experiences, best times to visit
BUSINESS: Vision 2030, Saudi startups, LEAP, FII, Pi economy in Saudi Arabia
CULTURE: Arabic phrases, customs, traditions, Islamic practices, Hajj, Umrah, Saudi cuisine, etiquette
TECH: SDAIA, Aramco Digital, STC, NEOM Tech, Tamara, Tabby, Salla, Foodics, Rewaa, Jahez, Nana, Lean Technologies, KAUST, Misk
EVENTS: LEAP, FII, Riyadh Season, Cityscape, Esports World Cup, Hajj Expo, Saudi Green Initiative
VISION 2030: Giga projects, strategic pillars, economic diversification — factual only
PI NETWORK: Pi adoption in Saudi Arabia, Pi payments, Pi businesses, Pi ecosystem

STRICT RULES:
- Never invent statistics or fake data
- Use status labels only: Under Development / Active / Phase 1 Open — never fake percentages
- Never give financial, legal, medical or investment advice
- Never discuss government services or immigration
- Never give political opinions
- Keep responses concise and mobile-friendly — short paragraphs
- Respond in the same language the user writes in
- Be warm, accurate, culturally respectful`;

export async function onRequestPost(context) {
  const key = context.env.GEMINI_API_KEY;
  if (!key) {
    return new Response(JSON.stringify({ reply: 'AI Concierge is being set up. Please try again shortly.' }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } });
  }
  try {
    const { messages } = await context.request.json();
    if (!messages?.length) throw new Error('No messages');
    const contents = messages.slice(-10).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM }] },
          contents,
          generationConfig: { maxOutputTokens: 600, temperature: 0.7 },
        }),
      }
    );
    if (!resp.ok) throw new Error('Gemini ' + resp.status);
    const data = await resp.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Please try again.';
    return new Response(JSON.stringify({ reply: text }),
      { headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  } catch (err) {
    return new Response(JSON.stringify({ reply: 'AI temporarily unavailable. Please try again.' }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } });
  }
}
export async function onRequestOptions() { return new Response(null, { headers: CORS }); }
