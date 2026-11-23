// DigitalSaudi — /complete  (Cloudflare Pages Function)
// Always returns HTTP 200: a non-200 here makes Pi show "Payment Expired".
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};
const json = (obj) => new Response(JSON.stringify(obj), { status: 200, headers: CORS });
import { payout, piApi } from './_lib/transfers.js';
const ID_RE = /^[A-Za-z0-9_-]{6,128}$/;

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const paymentId = body.paymentId;
    const txid = body.txid;
    if (!txid) return json({ ok: false, error: 'Missing txid' });
    const PAYLOAD = { txid };
    if (!paymentId) return json({ ok: false, error: 'Missing paymentId' });
    if (!ID_RE.test(String(paymentId)) || !/^[A-Za-z0-9]{16,128}$/.test(String(txid))) return json({ ok: false, error: 'Invalid paymentId or txid' });
    if (!context.env.PI_API_KEY) return json({ ok: false, error: 'PI_API_KEY not set' });

    const res = await fetch('https://api.minepi.com/v2/payments/' + encodeURIComponent(paymentId) + '/complete', {
      method: 'POST',
      headers: { 'Authorization': 'Key ' + String(context.env.PI_API_KEY).trim(), 'Content-Type': 'application/json' },
      body: JSON.stringify(PAYLOAD)
    });
    const data = await res.json().catch(() => ({}));
    // In-app transfer: once the sender's payment is completed, pay the recipient at once (or refund automatically).
    let transfer = null;
    try {
      const g = await piApi(context.env, '/payments/' + encodeURIComponent(paymentId));
      const done = res.ok || (g.ok && g.d && g.d.status && g.d.status.developer_completed);
      if (done && g.d && g.d.metadata && g.d.metadata.type === 'transfer') transfer = await payout(context.env, context.request, paymentId);
    } catch (e) { transfer = { ok: false, retry: true, error: 'Delivery will be retried automatically' }; }
    return json({ ok: res.ok, status: res.status, data, transfer });
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err) });
  }
}

export async function onRequestGet() {
  return json({ ok: true, endpoint: '/complete', app: 'DigitalSaudi', time: new Date().toISOString() });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}
