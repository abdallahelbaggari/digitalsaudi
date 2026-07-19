/* =================================================================
   DigitalSaudi · functions/payment-recovery.js
   Route: /payment-recovery
   MAINNET · sandbox:false

   Single unified recovery endpoint — replaces cancel-payment.js
   and clear-payment.js entirely.

   Called automatically by onIncompletePayment(payment) in frontend.
   Also callable manually: GET /payment-recovery?id=PAYMENT_ID

   Recovery logic:
   1. GET current payment state from Pi API
   2. If status = COMPLETE → already done, return success
   3. If transaction.txid exists → call /complete
   4. If status = pending (not yet approved) → approve it
   5. If status = approved (no txid yet) → re-approve to unlock
   6. Never blindly re-approve without checking state first
================================================================= */
const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type':                 'application/json',
};
const PI_TIMEOUT_MS = 15000;

function piHeaders(key) {
  return { 'Authorization': `Key ${key}`, 'Content-Type': 'application/json' };
}

async function piFetch(url, opts, label) {
  const ctrl  = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), PI_TIMEOUT_MS);
  try {
    const r    = await fetch(url, { ...opts, signal: ctrl.signal });
    clearTimeout(timer);
    const text = await r.text();
    console.log(`[DS/recovery] ${label}:`, r.status, text.slice(0,200));
    return { ok: r.ok, status: r.status, text };
  } catch(e) {
    clearTimeout(timer);
    const msg = e.name === 'AbortError' ? `timeout after ${PI_TIMEOUT_MS}ms` : e.message;
    console.error(`[DS/recovery] ${label} error:`, msg);
    return { ok: false, status: 0, text: '', error: msg };
  }
}

async function recoverPayment(paymentId, PI_API_KEY) {
  const result = { paymentId, steps: [], cleared: false };
  console.log('[DS/recovery] ── Recovery Started ──', paymentId);

  /* Step 1: GET current payment state */
  const getRes = await piFetch(
    `https://api.minepi.com/v2/payments/${paymentId}`,
    { method: 'GET', headers: piHeaders(PI_API_KEY) },
    'GET payment state'
  );
  result.steps.push({ step: 'get_state', status: getRes.status });

  let piStatus = null;
  let txid     = null;

  if (getRes.ok) {
    try {
      const d  = JSON.parse(getRes.text);
      piStatus = d.status || null;
      txid     = d.transaction?.txid || null;
      result.payment_status = piStatus;
      result.txid           = txid;
      console.log('[DS/recovery] Payment status:', piStatus, '| txid:', txid||'none');
    } catch(e) {
      console.warn('[DS/recovery] Could not parse payment state');
    }
  }

  /* Step 2: Already completed — nothing to do */
  if (piStatus === 'COMPLETE' || piStatus === 'completed') {
    console.log('[DS/recovery] ✅ Payment already complete');
    result.cleared = true;
    result.action  = 'already_complete';
    result.message = '✅ Payment already completed';
    return result;
  }

  /* Step 3: Has txid — complete it */
  if (txid) {
    console.log('[DS/recovery] Has txid — completing payment');
    const completeRes = await piFetch(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      { method: 'POST', headers: piHeaders(PI_API_KEY), body: JSON.stringify({ txid }) },
      'Complete payment'
    );
    result.steps.push({ step: 'complete', status: completeRes.status });
    result.action  = 'completed';
    result.cleared = completeRes.ok;
    result.message = completeRes.ok
      ? '✅ Payment Completed'
      : `❌ Complete failed (${completeRes.status})`;
    console.log('[DS/recovery] ── Recovery Finished ──', result.message);
    return result;
  }

  /* Step 4: No txid — check state before approving */
  /* Only re-approve if payment is in a recoverable state */
  const recoverableStates = ['pending', 'approved', null];
  if (!recoverableStates.includes(piStatus)) {
    console.warn('[DS/recovery] Payment in unrecoverable state:', piStatus);
    result.action  = 'unrecoverable';
    result.cleared = false;
    result.message = `❌ Payment in state "${piStatus}" — cannot recover automatically`;
    return result;
  }

  /* Step 5: Re-approve to unlock pending state */
  console.log('[DS/recovery] No txid, state:', piStatus, '— re-approving to unlock');
  const approveRes = await piFetch(
    `https://api.minepi.com/v2/payments/${paymentId}/approve`,
    { method: 'POST', headers: piHeaders(PI_API_KEY), body: JSON.stringify({}) },
    'Re-approve to unlock'
  );
  result.steps.push({ step: 're_approve', status: approveRes.status });
  result.action = 're_approved';
  /* 200 = fresh approve, 400 = already approved → both states unlock the pending dialog */
  result.cleared = (approveRes.status === 200 || approveRes.status === 400);
  result.message = result.cleared
    ? '✅ Payment unlocked — pending dialog will clear on next Sign In'
    : `❌ Re-approve failed (${approveRes.status})`;

  console.log('[DS/recovery] ── Recovery Finished ──', result.message);
  return result;
}

/* GET — manual diagnostic and recovery by payment ID */
export async function onRequestGet(context) {
  const PI_API_KEY = context.env.PI_API_KEY;
  if (!PI_API_KEY) {
    return new Response(JSON.stringify({ error: 'PI_API_KEY not set in Cloudflare Variables' }), { status:200, headers:CORS });
  }

  const paymentId = new URL(context.request.url).searchParams.get('id');
  if (!paymentId) {
    return new Response(JSON.stringify({
      status: 'ready',
      route:  '/payment-recovery',
      usage:  'GET /payment-recovery?id=PAYMENT_ID',
      note:   'Payment ID appears in Cloudflare Logs when you Sign In: [DS/recovery] paymentId: XXXXX',
      pi_api_key_present: true,
    }), { status:200, headers:CORS });
  }

  console.log('[DS/recovery] Manual recovery requested for:', paymentId);
  const result = await recoverPayment(paymentId, PI_API_KEY);
  return new Response(JSON.stringify(result, null, 2), { status:200, headers:CORS });
}

/* POST — called automatically by onIncompletePayment in frontend */
export async function onRequestPost(context) {
  const PI_API_KEY = context.env.PI_API_KEY;
  if (!PI_API_KEY) {
    return new Response(JSON.stringify({ cleared:false, error:'PI_API_KEY not set' }), { status:200, headers:CORS });
  }

  let paymentId;
  try {
    const body = await context.request.json();
    paymentId  = body.paymentId || null;
    console.log('[DS/recovery] POST called | paymentId:', paymentId);
  } catch(e) {
    return new Response(JSON.stringify({ cleared:false, error:'bad_request_body' }), { status:200, headers:CORS });
  }

  if (!paymentId) {
    return new Response(JSON.stringify({ cleared:false, error:'missing_payment_id' }), { status:200, headers:CORS });
  }

  const result = await recoverPayment(paymentId, PI_API_KEY);
  return new Response(JSON.stringify(result), { status:200, headers:CORS });
}

export async function onRequestOptions() {
  return new Response(null, { status:200, headers:CORS });
}
