/* =================================================================
   DigitalSaudi · functions/clear-payment.js
   Route: /clear-payment
   AUTO-CLEARS stuck pending payment on every GET request
   No ID needed — runs automatically
================================================================= */

const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestGet(context) {
  const PI_API_KEY = context.env.PI_API_KEY;
  if (!PI_API_KEY) {
    return new Response(JSON.stringify({ error: 'PI_API_KEY not set' }), { status: 200, headers: CORS });
  }

  const url = new URL(context.request.url);
  const pid = url.searchParams.get('id');

  /* ── If specific ID given, clear it ── */
  if (pid) {
    const r = await clearPayment(pid, PI_API_KEY);
    r.message = r.cleared ? '✅ Cleared — try payment again' : '❌ Could not clear';
    return new Response(JSON.stringify(r, null, 2), { status: 200, headers: CORS });
  }

  /* ── No ID — try to list ALL payments and clear pending ones ── */
  const log = [];
  let totalCleared = 0;

  /* Try multiple Pi API endpoints to find payments */
  const endpoints = [
    'https://api.minepi.com/v2/payments?status=pending',
    'https://api.minepi.com/v2/payments?status=approved',
    'https://api.minepi.com/v2/payments',
  ];

  const foundIds = new Set();

  for (const endpoint of endpoints) {
    try {
      const r = await fetch(endpoint, {
        headers: { 'Authorization': `Key ${PI_API_KEY}` }
      });
      const text = await r.text();
      log.push({ endpoint, status: r.status, preview: text.slice(0, 150) });

      if (r.ok) {
        try {
          const d = JSON.parse(text);
          const payments = d.data || d.payments || (Array.isArray(d) ? d : []);
          payments.forEach(p => { if (p.identifier) foundIds.add(p.identifier); });
        } catch(e) {}
      }
    } catch(e) {
      log.push({ endpoint, error: e.message });
    }
  }

  /* Clear each found payment */
  const results = [];
  for (const id of foundIds) {
    const r = await clearPayment(id, PI_API_KEY);
    results.push(r);
    if (r.cleared) totalCleared++;
  }

  return new Response(JSON.stringify({
    found: foundIds.size,
    cleared: totalCleared,
    results,
    api_log: log,
    tip: foundIds.size === 0
      ? 'Pi API did not return payment list. Open Cloudflare Real-time Logs → Sign in to DigitalSaudi → find [DS] onIncompletePayment pid: XXXXX → visit /clear-payment?id=XXXXX'
      : `Cleared ${totalCleared} of ${foundIds.size} payments`,
  }, null, 2), { status: 200, headers: CORS });
}

async function clearPayment(pid, PI_API_KEY) {
  const result = { paymentId: pid, cleared: false };

  /* GET payment state */
  try {
    const r = await fetch(`https://api.minepi.com/v2/payments/${pid}`, {
      headers: { 'Authorization': `Key ${PI_API_KEY}` }
    });
    const text = await r.text();
    result.get_status = r.status;
    try {
      const d = JSON.parse(text);
      result.payment_status = d.status;
      result.txid = d.transaction?.txid || null;
      result.amount = d.amount;
    } catch(e) { result.raw = text.slice(0, 100); }
  } catch(e) { result.get_error = e.message; return result; }

  /* Complete if has txid */
  if (result.txid) {
    try {
      const r = await fetch(`https://api.minepi.com/v2/payments/${pid}/complete`, {
        method: 'POST',
        headers: { 'Authorization': `Key ${PI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ txid: result.txid }),
      });
      const text = await r.text();
      result.action = 'complete';
      result.action_status = r.status;
      result.action_response = text.slice(0, 100);
      result.cleared = r.ok;
    } catch(e) { result.complete_error = e.message; }
  } else {
    /* Re-approve to unlock pending state */
    try {
      const r = await fetch(`https://api.minepi.com/v2/payments/${pid}/approve`, {
        method: 'POST',
        headers: { 'Authorization': `Key ${PI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const text = await r.text();
      result.action = 'approve';
      result.action_status = r.status;
      result.action_response = text.slice(0, 100);
      /* 200 = approved fresh, 400 = already approved — both unlock the payment */
      result.cleared = (r.status === 200 || r.status === 400);
    } catch(e) { result.approve_error = e.message; }
  }

  return result;
}

export async function onRequestPost(context) {
  const PI_API_KEY = context.env.PI_API_KEY;
  if (!PI_API_KEY) return new Response(JSON.stringify({ error: 'no key' }), { status: 200, headers: CORS });
  try {
    const body = await context.request.json();
    const r = await clearPayment(body.paymentId, PI_API_KEY);
    return new Response(JSON.stringify(r), { status: 200, headers: CORS });
  } catch(e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 200, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 200, headers: CORS });
}
