// DigitalSaudi — /approve  (Cloudflare Pages Function)
// Always returns HTTP 200: a non-200 here makes Pi show "Payment Expired".
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};
const json = (obj) => new Response(JSON.stringify(obj), { status: 200, headers: CORS });

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const paymentId = body.paymentId;
    const PAYLOAD = {};
    if (!paymentId) return json({ ok: false, error: 'Missing paymentId' });
    if (!context.env.PI_API_KEY) return json({ ok: false, error: 'PI_API_KEY not set' });

    const res = await fetch('https://api.minepi.com/v2/payments/' + paymentId + '/approve', {
      method: 'POST',
      headers: { 'Authorization': 'Key ' + String(context.env.PI_API_KEY).trim(), 'Content-Type': 'application/json' },
      body: JSON.stringify(PAYLOAD)
    });
    const data = await res.json().catch(() => ({}));
    return json({ ok: res.ok, status: res.status, data });
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err) });
  }
}

// Diagnostics: open /approve?check=1 in any browser.
// Cancel a stuck payment: /approve?cancel=PAYMENT_ID&token=YOUR_ADMIN_TOKEN
export async function onRequestGet(context) {
  const env = context.env, u = new URL(context.request.url);
  if (!u.searchParams.get('check') && !u.searchParams.get('cancel')) {
    return json({ ok: true, endpoint: '/approve', app: 'DigitalSaudi', time: new Date().toISOString() });
  }
  const key = env.PI_API_KEY ? String(env.PI_API_KEY).trim() : '';
  const report = { app: 'DigitalSaudi', PI_API_KEY_set: !!key, PI_API_KEY_length: key.length, PI_API_KEY_had_spaces: !!env.PI_API_KEY && /\s/.test(env.PI_API_KEY) };
  if (!key) return json({ ...report, verdict: 'PI_API_KEY is missing. Add it in Cloudflare and redeploy.' });
  try {
    const r = await fetch('https://api.minepi.com/v2/payments/digitalsaudi-key-check', { headers: { Authorization: 'Key ' + key } });
    report.pi_status = r.status; report.pi_reply = (await r.text()).slice(0, 200);
  } catch (e) { report.pi_error = String(e); }
  report.verdict = report.pi_status === 401 || report.pi_status === 403
    ? 'WRONG KEY: Pi rejected PI_API_KEY. Copy the API key from develop.pi > DigitalSaudi (MAINNET) > API Key, paste it as PI_API_KEY, redeploy.'
    : (report.pi_status === 404 || report.pi_status === 400)
      ? 'KEY OK: Pi accepted PI_API_KEY.'
      : 'Unexpected reply from Pi - see pi_status / pi_reply.';
  const cancel = u.searchParams.get('cancel');
  if (cancel) {
    if (!env.ADMIN_TOKEN || u.searchParams.get('token') !== env.ADMIN_TOKEN) report.cancel = 'Add &token=YOUR_ADMIN_TOKEN';
    else {
      try {
        const g = await fetch('https://api.minepi.com/v2/payments/' + encodeURIComponent(cancel), { headers: { Authorization: 'Key ' + key } });
        const pay = await g.json().catch(() => null);
        report.payment_status = pay && pay.status;
        const txid = pay && pay.transaction && pay.transaction.txid;
        const action = txid ? 'complete' : 'cancel';
        const r = await fetch('https://api.minepi.com/v2/payments/' + encodeURIComponent(cancel) + '/' + action, { method: 'POST', headers: { Authorization: 'Key ' + key, 'Content-Type': 'application/json' }, body: JSON.stringify(txid ? { txid } : {}) });
        report.cancel = { id: cancel, action, status: r.status, reply: (await r.text()).slice(0, 200) };
      } catch (e) { report.cancel = { id: cancel, error: String(e) }; }
    }
  }
  return json(report);
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}
