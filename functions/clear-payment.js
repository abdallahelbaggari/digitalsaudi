/* =================================================================
   DigitalSaudi · functions/clear-payment.js
   Route: /clear-payment
   TEMPORARY TOOL — finds and cancels stuck pending payment
   DELETE THIS FILE after payment is cleared
================================================================= */

export async function onRequestGet(context) {
  const PI_API_KEY = context.env.PI_API_KEY;
  const cors = { 'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*' };

  if (!PI_API_KEY) {
    return new Response(JSON.stringify({ error:'PI_API_KEY not set' }), { status:200, headers:cors });
  }

  const paymentId = new URL(context.request.url).searchParams.get('id');

  if (!paymentId) {
    return new Response(JSON.stringify({
      usage: 'Add ?id=PAYMENT_ID to the URL',
      instructions: [
        '1. Open Cloudflare Real-time Logs',
        '2. Open DigitalSaudi in Pi Browser and Sign In',
        '3. Look for: [DS] onIncompletePayment pid: XXXXXXX',
        '4. Copy that ID and visit: /clear-payment?id=XXXXXXX',
      ]
    }), { status:200, headers:cors });
  }

  const results = {};

  /* Step 1: GET payment state */
  try {
    const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}`, {
      method: 'GET',
      headers: { 'Authorization': `Key ${PI_API_KEY}` }
    });
    const text = await r.text();
    results.get_status = r.status;
    try { results.payment = JSON.parse(text); } catch(e) { results.payment_raw = text; }
  } catch(e) {
    results.get_error = e.message;
  }

  /* Step 2: Try to complete if has txid */
  const txid = results.payment?.transaction?.txid;
  if (txid) {
    try {
      const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
        method: 'POST',
        headers: { 'Authorization': `Key ${PI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ txid })
      });
      const text = await r.text();
      results.complete_status = r.status;
      results.complete_response = text.slice(0, 300);
      results.action = 'completed';
    } catch(e) {
      results.complete_error = e.message;
    }
  } else {
    /* Step 3: Try re-approve to reset pending state */
    try {
      const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
        method: 'POST',
        headers: { 'Authorization': `Key ${PI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const text = await r.text();
      results.approve_status = r.status;
      results.approve_response = text.slice(0, 300);
      results.action = r.ok ? 'approved_cleared' : 'approve_failed';
    } catch(e) {
      results.approve_error = e.message;
    }
  }

  results.cleared = results.action === 'completed' || results.action === 'approved_cleared';
  results.message = results.cleared
    ? '✅ Payment cleared — try making payment again'
    : '❌ Could not auto-clear — check payment state below';

  return new Response(JSON.stringify(results, null, 2), { status:200, headers:cors });
}

export async function onRequestOptions() {
  return new Response(null, { status:200, headers:{
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET, OPTIONS',
    'Access-Control-Allow-Headers':'Content-Type',
  }});
}
