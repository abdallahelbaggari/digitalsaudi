// DigitalSaudi — /pi-check  (Cloudflare Pages Function) — payment setup diagnostics.
// Open https://digitalsaudi.pages.dev/pi-check in any browser. It tells you whether PI_API_KEY
// belongs to this app (the #1 cause of "Payment expired" / "Pending payment found").
// Cancel a stuck payment: /pi-check?cancel=PAYMENT_ID&token=YOUR_ADMIN_TOKEN (ID is in the app's payment history).

const H = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
const out = o => new Response(JSON.stringify(o, null, 2), { status: 200, headers: H });

export async function onRequestGet(context) {
  const env = context.env, u = new URL(context.request.url);
  const key = env.PI_API_KEY;
  const report = { app: 'DigitalSaudi', time: new Date().toISOString(), PI_API_KEY_set: !!key, PI_API_KEY_length: key ? key.length : 0, PI_API_KEY_has_spaces: key ? /\s/.test(key) : false };
  if (!key) return out({ ...report, verdict: '❌ PI_API_KEY is missing. Add it in Cloudflare → Settings → Variables and secrets, then redeploy.' });

  // A lookup of a payment that doesn't exist: 404 = key accepted, 401/403 = wrong key for this app.
  let status = 0, body = '';
  try {
    const r = await fetch('https://api.minepi.com/v2/payments/digitalsaudi-key-check', { headers: { Authorization: 'Key ' + key.trim() } });
    status = r.status; body = (await r.text()).slice(0, 300);
  } catch (e) { body = String(e); }
  report.pi_api_status = status; report.pi_api_reply = body;
  report.verdict = status === 401 || status === 403
    ? '❌ Pi rejected PI_API_KEY. Copy the API key from develop.pi → DigitalSaudi (MAINNET app, not the testnet one) → API Key, paste it again as the PI_API_KEY secret (no spaces), then redeploy.'
    : status === 404 || status === 400
      ? '✅ PI_API_KEY is accepted by Pi. If payments still expire, check develop.pi: App URL = https://digitalsaudi.pages.dev, domain verified, and the app wallet is set up.'
      : '⚠️ Unexpected reply from Pi — see pi_api_status / pi_api_reply.';

  const cancel = u.searchParams.get('cancel');
  if (cancel && (!env.ADMIN_TOKEN || u.searchParams.get('token') !== env.ADMIN_TOKEN)) { report.cancel = { error: 'Add &token=YOUR_ADMIN_TOKEN to cancel a payment' }; }
  else if (cancel) {
    try {
      const r = await fetch('https://api.minepi.com/v2/payments/' + encodeURIComponent(cancel) + '/cancel', { method: 'POST', headers: { Authorization: 'Key ' + key.trim(), 'Content-Type': 'application/json' } });
      report.cancel = { id: cancel, status: r.status, reply: (await r.text()).slice(0, 300) };
    } catch (e) { report.cancel = { id: cancel, error: String(e) }; }
  }
  return out(report);
}
