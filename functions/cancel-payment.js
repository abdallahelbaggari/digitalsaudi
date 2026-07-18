/* =================================================================
   DigitalSaudi · functions/clear-payment.js
   Route: /clear-payment

   AUTOMATIC — no payment ID needed
   GET /clear-payment → finds ALL pending payments and clears them
   Uses Pi API to list payments, then approves/completes each one
   MAINNET · sandbox:false
================================================================= */

const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function clearOnePayment(pid, PI_API_KEY) {
  const result = { paymentId: pid };

  /* GET payment state */
  try {
    const r = await fetch(`https://api.minepi.com/v2/payments/${pid}`, {
      headers: { 'Authorization': `Key ${PI_API_KEY}` }
    });
    const text = await r.text();
    result.get_status = r.status;
    try {
      const d = JSON.parse(text);
      result.status    = d.status;
      result.amount    = d.amount;
      result.memo      = d.memo;
      result.txid      = d.transaction?.txid || null;
    } catch(e) { result.raw = text.slice(0,100); }
  } catch(e) { result.get_error = e.message; }

  /* Complete if has txid */
  if (result.txid) {
    try {
      const r = await fetch(`https://api.minepi.com/v2/payments/${pid}/complete`, {
        method:  'POST',
        headers: { 'Authorization': `Key ${PI_API_KEY}`, 'Content-Type': 'application/json' },
        body:    JSON.stringify({ txid: result.txid }),
      });
      const text = await r.text();
      result.action        = 'completed';
      result.action_status = r.status;
      result.cleared       = r.ok;
      console.log('[DS] complete', pid, r.status, text.slice(0,100));
    } catch(e) { result.complete_error = e.message; }
  } else {
    /* Re-approve to unlock */
    try {
      const r = await fetch(`https://api.minepi.com/v2/payments/${pid}/approve`, {
        method:  'POST',
        headers: { 'Authorization': `Key ${PI_API_KEY}`, 'Content-Type': 'application/json' },
        body:    JSON.stringify({}),
      });
      const text = await r.text();
      result.action        = 'approved';
      result.action_status = r.status;
      /* 200 = newly approved, 400 = already approved — both mean unlocked */
      result.cleared       = (r.status === 200 || r.status === 400);
      console.log('[DS] approve', pid, r.status, text.slice(0,100));
    } catch(e) { result.approve_error = e.message; }
  }

  return result;
}

export async function onRequestGet(context) {
  const PI_API_KEY = context.env.PI_API_KEY;

  if (!PI_API_KEY) {
    return new Response(JSON.stringify({
      error: 'PI_API_KEY not set in Cloudflare Variables'
    }), { status: 200, headers: CORS });
  }

  /* If specific ID provided — clear just that one */
  const url = new URL(context.request.url);
  const pid = url.searchParams.get('id');

  if (pid) {
    console.log('[DS clear-payment] Clearing specific payment:', pid);
    const result = await clearOnePayment(pid, PI_API_KEY);
    result.message = result.cleared
      ? '✅ CLEARED — sign in to DigitalSaudi and try payment again'
      : '❌ Could not clear — check result below';
    return new Response(JSON.stringify(result, null, 2), { status: 200, headers: CORS });
  }

  /* No ID — fetch ALL pending payments automatically */
  console.log('[DS clear-payment] Fetching all pending payments...');

  const summary = {
    found: [],
    cleared: [],
    failed: [],
    message: '',
  };

  /* Pi API: list payments — try different status filters */
  const statuses = ['pending', 'approved'];
  const foundIds = new Set();

  for (const status of statuses) {
    try {
      const r = await fetch(
        `https://api.minepi.com/v2/payments?status=${status}`,
        { headers: { 'Authorization': `Key ${PI_API_KEY}` } }
      );
      const text = await r.text();
      console.log('[DS] list', status, r.status, text.slice(0,200));

      if (r.ok) {
        try {
          const data = JSON.parse(text);
          const payments = data.data || data.payments || (Array.isArray(data) ? data : []);
          payments.forEach(function(p) {
            if (p.identifier) foundIds.add(p.identifier);
          });
        } catch(e) {}
      }
    } catch(e) {
      console.warn('[DS] list error:', e.message);
    }
  }

  /* Also try without filter */
  try {
    const r = await fetch(
      `https://api.minepi.com/v2/payments`,
      { headers: { 'Authorization': `Key ${PI_API_KEY}` } }
    );
    const text = await r.text();
    console.log('[DS] list all:', r.status, text.slice(0,300));
    if (r.ok) {
      try {
        const data = JSON.parse(text);
        const payments = data.data || data.payments || (Array.isArray(data) ? data : []);
        payments.forEach(function(p) {
          if (p.identifier) foundIds.add(p.identifier);
        });
      } catch(e) {}
    }
  } catch(e) {}

  summary.found = Array.from(foundIds);
  console.log('[DS clear-payment] Found payment IDs:', summary.found);

  if (summary.found.length === 0) {
    summary.message = 'No pending payments found via API listing. Use /clear-payment?id=PAYMENT_ID with the ID from Cloudflare logs when you sign in.';
    summary.tip = 'Open Cloudflare Real-time Logs → Sign in to DigitalSaudi → Look for: [DS] onIncompletePayment pid: XXXXX → visit /clear-payment?id=XXXXX';
    return new Response(JSON.stringify(summary, null, 2), { status: 200, headers: CORS });
  }

  /* Clear each one */
  for (const paymentId of summary.found) {
    const result = await clearOnePayment(paymentId, PI_API_KEY);
    if (result.cleared) {
      summary.cleared.push(paymentId);
    } else {
      summary.failed.push({ id: paymentId, detail: result });
    }
  }

  summary.message = summary.cleared.length > 0
    ? `✅ Cleared ${summary.cleared.length} payment(s) — sign in to DigitalSaudi and try again`
    : '❌ Found payments but could not clear them — check failed array';

  return new Response(JSON.stringify(summary, null, 2), { status: 200, headers: CORS });
}

/* POST — called automatically by onIncompletePayment */
export async function onRequestPost(context) {
  const PI_API_KEY = context.env.PI_API_KEY;
  if (!PI_API_KEY) return new Response(JSON.stringify({ error: 'no key' }), { status: 200, headers: CORS });

  let pid, txid;
  try {
    const body = await context.request.json();
    pid  = body.paymentId;
    txid = body.txid || null;
  } catch(e) {
    return new Response(JSON.stringify({ error: 'bad body' }), { status: 200, headers: CORS });
  }

  console.log('[DS clear-payment POST] pid:', pid, 'txid:', txid || 'none');
  const result = await clearOnePayment(pid, PI_API_KEY);
  return new Response(JSON.stringify(result), { status: 200, headers: CORS });
}

export async function onRequestOptions() {
  return new Response(null, { status: 200, headers: CORS });
}
