// DigitalSaudi — /approve  (Cloudflare Pages Function)
// Always returns HTTP 200: a non-200 here makes Pi show "Payment Expired".
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};
const json = (obj) => new Response(JSON.stringify(obj), { status: 200, headers: CORS });
const ID_RE = /^[A-Za-z0-9_-]{6,128}$/;


export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const paymentId = body.paymentId;
    const PAYLOAD = {};
    if (!paymentId) return json({ ok: false, error: 'Missing paymentId' });
    if (!ID_RE.test(String(paymentId))) return json({ ok: false, error: 'Invalid paymentId' });
    if (!context.env.PI_API_KEY) return json({ ok: false, error: 'PI_API_KEY not set' });

    // Check the payment with Pi before approving it: it must be a DigitalSaudi payment of a known
    // kind and a sensible amount (Premium must pay at least its price). The client is never trusted.
    const key = String(context.env.PI_API_KEY).trim();
    const look = await fetch('https://api.minepi.com/v2/payments/' + encodeURIComponent(paymentId), { headers: { 'Authorization': 'Key ' + key } });
    const p = await look.json().catch(() => null);
    if (!look.ok || !p) return json({ ok: false, status: look.status, error: 'Payment not found' });
    const meta = p.metadata || {}, amount = Number(p.amount);
    const PRICES = { monthly: 1, lifetime: 5 };
    let why = '';
    if (!(amount > 0) || amount > 10000) why = 'Invalid amount';
    else if (meta.app && meta.app !== 'DigitalSaudi') why = 'Not a DigitalSaudi payment';
    else if (meta.type !== 'premium' && meta.type !== 'support') why = 'Unknown payment type';
    else if (meta.type === 'premium' && amount < (PRICES[meta.tier] || PRICES.monthly)) why = 'Amount too low for this plan';
    if (why) return json({ ok: false, error: why });
    if (p.status && p.status.developer_approved) return json({ ok: true, status: 200, data: p, already: true });

    const res = await fetch('https://api.minepi.com/v2/payments/' + encodeURIComponent(paymentId) + '/approve', {
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

// Health check only. Key diagnostics live at /pi-check; stuck payments are cleared from /admin.html.
export async function onRequestGet() {
  return json({ ok: true, endpoint: '/approve', app: 'DigitalSaudi', time: new Date().toISOString() });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}
