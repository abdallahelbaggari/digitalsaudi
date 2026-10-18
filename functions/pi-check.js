// DigitalSaudi — /pi-check  (Cloudflare Pages Function) — payment setup check.
// Open https://digitalsaudi.pages.dev/pi-check in any browser: it says whether PI_API_KEY is
// present and accepted by Pi (the #1 cause of "Payment expired" / "Pending payment found").
// Details (Pi's raw reply) are shown only with the X-Admin-Token header.
// Stuck payments are cleared from /admin.html → Payments (never through a URL token).

const H = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
const out = o => new Response(JSON.stringify(o, null, 2), { status: 200, headers: H });

function authorised(context) {
  const t = context.env.ADMIN_TOKEN, got = context.request.headers.get('X-Admin-Token') || '';
  if (!t || t.length < 12 || got.length !== t.length) return false;
  let diff = 0; for (let i = 0; i < t.length; i++) diff |= t.charCodeAt(i) ^ got.charCodeAt(i);
  return diff === 0;
}

export async function onRequestGet(context) {
  const env = context.env, key = env.PI_API_KEY ? String(env.PI_API_KEY).trim() : '';
  const report = { app: 'DigitalSaudi', time: new Date().toISOString(), PI_API_KEY_set: !!key };
  if (!key) return out({ ...report, verdict: '❌ PI_API_KEY is missing. Add it in Cloudflare → Settings → Variables and secrets, then redeploy.' });

  // A lookup of a payment that doesn't exist: 404/400 = key accepted, 401/403 = wrong key for this app.
  let status = 0, body = '';
  try {
    const r = await fetch('https://api.minepi.com/v2/payments/digitalsaudi-key-check', { headers: { Authorization: 'Key ' + key } });
    status = r.status; body = (await r.text()).slice(0, 300);
  } catch (e) { body = String(e); }
  report.verdict = status === 401 || status === 403
    ? '❌ Pi rejected PI_API_KEY. Copy the API key from develop.pi → DigitalSaudi (MAINNET app) → API Key, save it again as the PI_API_KEY secret, then redeploy.'
    : status === 404 || status === 400
      ? '✅ PI_API_KEY is accepted by Pi. If payments still expire, check develop.pi: App URL = https://digitalsaudi.pages.dev, domain verified, and the app wallet is set up.'
      : '⚠️ Unexpected reply from Pi. Ask the admin to open this page with the admin token for details.';
  if (authorised(context)) { report.pi_api_status = status; report.pi_api_reply = body; }
  return out(report);
}
