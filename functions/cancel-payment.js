// DigitalSaudi — /cancel-payment  (Cloudflare Pages Function)
// Clears an unfinished ("pending") Pi payment so the user can pay again.
// It first asks Pi for the payment's real state, then:
//   • already on the blockchain (has txid)  → completes it (user paid, so we finish it)
//   • not paid yet                          → cancels it
//   • already completed / cancelled         → nothing to do
// Always returns HTTP 200 with { ok, action, detail } so the app can show the exact reason.

const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
const json = (obj) => new Response(JSON.stringify(obj), { status: 200, headers: CORS });
const PI = 'https://api.minepi.com/v2/payments/';

async function pi(key, path, method, body) {
  const r = await fetch(PI + path, { method: method || 'GET', headers: { Authorization: 'Key ' + key, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const text = await r.text(); let data = null; try { data = JSON.parse(text); } catch (e) {}
  return { ok: r.ok, status: r.status, data, text: text.slice(0, 300) };
}

// v6.8: only the payment's owner may CANCEL an unpaid payment (checked with Pi using their sign-in token).
// Completing a payment that is already on the blockchain needs no sign-in: it only finishes what the user paid.
async function piUid(token) {
  if (!token || typeof token !== 'string' || token.length > 4096) return '';
  try { const r = await fetch('https://api.minepi.com/v2/me', { headers: { Authorization: 'Bearer ' + token } }); if (!r.ok) return ''; const u = await r.json(); return (u && u.uid) || ''; } catch (e) { return ''; }
}

async function clearPayment(key, paymentId, txidHint, accessToken) {
  const look = await pi(key, encodeURIComponent(paymentId));
  if (!look.ok) return { ok: false, action: 'lookup', status: look.status, detail: (look.data && (look.data.error_message || look.data.error)) || look.text };
  const p = look.data || {}, st = p.status || {};
  const txid = (p.transaction && p.transaction.txid) || (/^[A-Za-z0-9]{16,128}$/.test(String(txidHint || '')) ? String(txidHint) : '');
  if (st.developer_completed) return { ok: true, action: 'none', detail: 'Payment was already completed', payment: { amount: p.amount, memo: p.memo, txid } };
  if (st.cancelled || st.user_cancelled) return { ok: true, action: 'none', detail: 'Payment was already cancelled' };
  if (txid) {
    const r = await pi(key, encodeURIComponent(paymentId) + '/complete', 'POST', { txid });
    return { ok: r.ok, action: 'complete', status: r.status, detail: r.ok ? 'Payment completed' : ((r.data && (r.data.error_message || r.data.error)) || r.text), payment: { amount: p.amount, memo: p.memo, txid, metadata: p.metadata } };
  }
  const uid = await piUid(accessToken);
  if (!uid) return { ok: false, action: 'auth', detail: 'Sign in with Pi to clear this payment' };
  if (!p.user_uid || p.user_uid !== uid) return { ok: false, action: 'auth', detail: 'This payment belongs to another Pi account' };
  const r = await pi(key, encodeURIComponent(paymentId) + '/cancel', 'POST', {});
  return { ok: r.ok, action: 'cancel', status: r.status, detail: r.ok ? 'Payment cancelled' : ((r.data && (r.data.error_message || r.data.error)) || r.text) };
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => ({}));
    const paymentId = body.paymentId;
    if (!paymentId) return json({ ok: false, error: 'Missing paymentId' });
    if (!/^[A-Za-z0-9_-]{6,128}$/.test(String(paymentId))) return json({ ok: false, error: 'Invalid paymentId' });
    const key = context.env.PI_API_KEY ? String(context.env.PI_API_KEY).trim() : '';
    if (!key) return json({ ok: false, error: 'PI_API_KEY not set' });
    const res = await clearPayment(key, paymentId, body.txid, body.accessToken);
    return json({ ...res, paymentId });
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err) });
  }
}

export async function onRequestGet() {
  return json({ ok: true, endpoint: '/cancel-payment', app: 'DigitalSaudi', time: new Date().toISOString() });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}
