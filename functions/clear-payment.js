/* =================================================================
   DigitalSaudi · functions/clear-payment.js
   SELF-CLEARING: When called with no ID, it reads the payment ID
   directly from Pi SDK incomplete payment endpoint
   Then clears it automatically
================================================================= */
const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function clearOne(pid, key) {
  const res = { id: pid };
  try {
    /* GET current state */
    const g = await fetch(`https://api.minepi.com/v2/payments/${pid}`, {
      headers: { 'Authorization': `Key ${key}` }
    });
    const gt = await g.text();
    res.get = g.status;
    let txid = null;
    try { txid = JSON.parse(gt)?.transaction?.txid || null; } catch(e){}
    res.txid = txid;

    if (txid) {
      /* Has txid — complete it */
      const c = await fetch(`https://api.minepi.com/v2/payments/${pid}/complete`, {
        method: 'POST',
        headers: { 'Authorization': `Key ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ txid })
      });
      const ct = await c.text();
      res.action = 'complete'; res.status = c.status; res.response = ct.slice(0,100);
      res.cleared = c.ok;
    } else {
      /* No txid — approve to unlock */
      const a = await fetch(`https://api.minepi.com/v2/payments/${pid}/approve`, {
        method: 'POST',
        headers: { 'Authorization': `Key ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const at = await a.text();
      res.action = 'approve'; res.status = a.status; res.response = at.slice(0,100);
      res.cleared = a.status === 200 || a.status === 400;
    }
  } catch(e) { res.error = e.message; }
  return res;
}

export async function onRequestGet(context) {
  const key = context.env.PI_API_KEY;
  if (!key) return new Response(JSON.stringify({ error: 'PI_API_KEY missing' }), { status:200, headers:CORS });

  const id = new URL(context.request.url).searchParams.get('id');
  if (id) {
    const r = await clearOne(id, key);
    r.message = r.cleared ? '✅ Cleared — sign in and try payment again' : '❌ Not cleared — check response';
    return new Response(JSON.stringify(r, null, 2), { status:200, headers:CORS });
  }

  /* No ID — try Pi API payment list */
  const found = [];
  const log = {};

  for (const endpoint of [
    'https://api.minepi.com/v2/payments?status=pending',
    'https://api.minepi.com/v2/payments?status=approved',
    'https://api.minepi.com/v2/payments',
  ]) {
    try {
      const r = await fetch(endpoint, { headers: { 'Authorization': `Key ${key}` } });
      const t = await r.text();
      log[endpoint] = { status: r.status, body: t.slice(0,200) };
      if (r.ok) {
        try {
          const d = JSON.parse(t);
          const list = d.data || d.payments || (Array.isArray(d) ? d : []);
          list.forEach(p => { if (p.identifier && !found.includes(p.identifier)) found.push(p.identifier); });
        } catch(e) {}
      }
    } catch(e) { log[endpoint] = { error: e.message }; }
  }

  if (found.length === 0) {
    return new Response(JSON.stringify({
      found: 0,
      cleared: 0,
      api_log: log,
      NEXT_STEP: 'Pi API does not expose payment list. You need the payment ID.',
      HOW_TO_GET_ID: [
        '1. On computer: go to dash.cloudflare.com → digitalsaudi → Real-time Logs → click BEGIN LOG STREAM',
        '2. On phone: open DigitalSaudi in Pi Browser → tap Sign In',
        '3. On computer: look for line:  [DS] onIncompletePayment pid: XXXXX',
        '4. Copy that ID → visit: digitalsaudi.pages.dev/clear-payment?id=XXXXX',
      ]
    }, null, 2), { status:200, headers:CORS });
  }

  const results = [];
  for (const pid of found) {
    results.push(await clearOne(pid, key));
  }
  const cleared = results.filter(r => r.cleared).length;

  return new Response(JSON.stringify({
    found: found.length, cleared,
    message: cleared > 0 ? `✅ Cleared ${cleared} payment(s) — sign in and try again` : '❌ Found but could not clear',
    results,
  }, null, 2), { status:200, headers:CORS });
}

export async function onRequestPost(context) {
  const key = context.env.PI_API_KEY;
  if (!key) return new Response(JSON.stringify({ error: 'no key' }), { status:200, headers:CORS });
  try {
    const { paymentId, txid } = await context.request.json();
    const r = await clearOne(paymentId, key);
    return new Response(JSON.stringify(r), { status:200, headers:CORS });
  } catch(e) {
    return new Response(JSON.stringify({ error: e.message }), { status:200, headers:CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status:200, headers:CORS });
}
