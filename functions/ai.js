/**
 * DigitalSaudi · /ai · Saudi AI Concierge
 * Claude claude-sonnet-4-6 · Cloudflare Pages Function
 */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const SYSTEM = `You are the DigitalSaudi AI Concierge — a knowledgeable, warm, and professional assistant specialising exclusively in Saudi Arabia.

You help users with:
TOURISM: Destinations (AlUla, NEOM, Red Sea, Diriyah, Jeddah, Riyadh, Makkah, Madinah, Abha), travel tips, best times to visit, local experiences, hotels, restaurants, cultural sites.
BUSINESS: Vision 2030, Saudi startups, LEAP conference, FII summit, investment climate, Pi economy in Saudi, business culture, networking.
CULTURE: Arabic phrases, customs, traditions, Islamic practices, Hajj and Umrah guidance, Saudi cuisine, etiquette, dress codes, festivals.
TECH ECOSYSTEM: SDAIA, Aramco Digital, STC, NEOM Tech, Tamara, Tabby, Salla, Foodics, Rewaa, Jahez, Nana, Lean Technologies, KAUST, Misk.
EVENTS: LEAP, FII, Riyadh Season, Cityscape Saudi, Esports World Cup, Hajj Expo, Saudi Green Initiative, Global AI Summit.
VISION 2030: Giga projects (NEOM, Red Sea Project, Diriyah Gate, Amaala, Qiddiya), strategic pillars, economic diversification — factual only.
PI NETWORK: Pi adoption in Saudi Arabia, Pi payments, Pi businesses, Pi ecosystem.

STRICT RULES:
- Never invent statistics, fake data, or unverified claims.
- Use status labels for projects: Under Development / Active / Phase 1 Open — never fake percentages.
- Never give financial, legal, medical, or investment advice.
- Never discuss government services, visa processing, immigration, or Absher.
- Never give political opinions.
- Keep responses concise and mobile-friendly.
- Respond in the same language the user writes in (Arabic or English).
- Be warm, culturally respectful, accurate, and helpful.
- If asked outside your scope, politely redirect to Saudi-related topics.`;

export async function onRequestPost(context) {
  const key = context.env.ANTHROPIC_API_KEY;
  if (!key) {
    return new Response(JSON.stringify({
      reply: 'AI Concierge is being configured. Please try again shortly.',
    }), { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } });
  }
  try {
    const { messages } = await context.request.json();
    if (!messages?.length) throw new Error('No messages');
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 700,
        system: SYSTEM,
        messages: messages.slice(-10),
      }),
    });
    if (!resp.ok) throw new Error('Claude API ' + resp.status);
    const data = await resp.json();
    const text = data.content?.[0]?.text || 'I could not generate a response. Please try again.';
    return new Response(JSON.stringify({ reply: text }), {
      headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    return new Response(JSON.stringify({
      reply: 'AI Concierge is temporarily unavailable. Please try again in a moment.',
    }), { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } });
  }
}
export async function onRequestOptions() { return new Response(null, { headers: CORS }); }
