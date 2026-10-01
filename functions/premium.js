// DigitalSaudi — /premium  (Cloudflare Pages Function)
// Stores Premium on the server, linked to the Pi account (user_uid), so it survives
// phone changes and cleared browsers. Needs a KV namespace bound as DS_KV.
//   GET  /premium?uid=<pi uid>          -> { ok, premium: { tier, expires } | null }
//   POST /premium { paymentId }         -> verifies the payment with the Pi API, then saves Premium
// Always returns HTTP 200.

const TIERS = { monthly: { price: 1, days: 30 }, lifetime: { price: 5, days: null } };
const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};
const json = (obj) => new Response(JSON.stringify(obj), { status: 200, headers: { ...HEADERS, 'Cache-Control': 'no-store' } });

function active(p) { return !!(p && (p.tier === 'lifetime' || (p.expires && p.expires > Date.now()))); }

export async function onRequestGet(context) {
  const kv = context.env.DS_KV;
  if (!kv) return json({ ok: false, error: 'DS_KV not bound' });
  const uid = new URL(context.request.url).searchParams.get('uid');
  if (!uid) return json({ ok: false, error: 'Missing uid' });
  const raw = await kv.get('premium:' + uid);
  const premium = raw ? JSON.parse(raw) : null;
  return json({ ok: true, premium, active: active(premium) });
}

export async function onRequestPost(context) {
  try {
    const kv = context.env.DS_KV;
    if (!kv) return json({ ok: false, error: 'DS_KV not bound' });
    if (!context.env.PI_API_KEY) return json({ ok: false, error: 'PI_API_KEY not set' });
    const body = await context.request.json();
    const paymentId = body.paymentId;
    if (!paymentId) return json({ ok: false, error: 'Missing paymentId' });

    // Verify the payment directly with Pi — never trust the client.
    const res = await fetch('https://api.minepi.com/v2/payments/' + paymentId, { headers: { 'Authorization': 'Key ' + context.env.PI_API_KEY } });
    const p = await res.json().catch(() => null);
    if (!res.ok || !p) return json({ ok: false, error: 'Payment not found' });
    const st = p.status || {};
    if (!st.developer_completed || !st.transaction_verified || st.cancelled || st.user_cancelled) return json({ ok: false, error: 'Payment not completed' });
    const meta = p.metadata || {};
    if (meta.type !== 'premium') return json({ ok: false, error: 'Not a premium payment' });
    const tierName = meta.tier === 'lifetime' ? 'lifetime' : 'monthly';
    if (Number(p.amount) < TIERS[tierName].price) return json({ ok: false, error: 'Amount too low for tier' });

    const uid = p.user_uid;
    const key = 'premium:' + uid;
    const cur = JSON.parse((await kv.get(key)) || 'null');

    // Idempotent: the same payment is only counted once.
    if (await kv.get('pay:' + paymentId)) return json({ ok: true, premium: cur, active: active(cur) });

    let next;
    if (tierName === 'lifetime' || (cur && cur.tier === 'lifetime')) {
      next = { tier: 'lifetime', since: (cur && cur.since) || Date.now() };
    } else {
      const base = cur && cur.expires && cur.expires > Date.now() ? cur.expires : Date.now();
      next = { tier: 'monthly', expires: base + TIERS.monthly.days * 86400000, since: (cur && cur.since) || Date.now() };
    }
    next.lastPayment = paymentId;
    await kv.put(key, JSON.stringify(next));
    await kv.put('pay:' + paymentId, JSON.stringify({ uid, tier: tierName, amount: p.amount, at: Date.now(), txid: p.transaction && p.transaction.txid }));
    return json({ ok: true, premium: next, active: active(next) });
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err) });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: HEADERS });
}
