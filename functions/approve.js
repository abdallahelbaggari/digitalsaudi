/* =================================================================
   DigitalSaudi · functions/approve.js · Route: /approve
   MAINNET · sandbox:false · Pi SDK compliant
   - Always HTTP 200 (non-200 = "Payment Expired" in Pi SDK)
   - Full logging · Timeout protection · Clean validation
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

export async function onRequestGet(context) {
  const key = context.env.PI_API_KEY;
  return new Response(JSON.stringify({
    status: 'ok', route: '/approve', network: 'MAINNET · sandbox:false',
    pi_api_key_present: !!key, pi_api_key_length: key ? key.length : 0,
  }), { status: 200, headers: CORS });
}

export async function onRequestPost(context) {
  console.log('[DS/approve] ── Payment Approve Started ──');

  /* 1. Parse body */
  let paymentId;
  try {
    const body = await context.request.json();
    paymentId  = body.paymentId || null;
    console.log('[DS/approve] paymentId:', paymentId);
  } catch(e) {
    console.error('[DS/approve] Body parse error:', e.message);
    return new Response(JSON.stringify({ approved:true, warning:'body_parse_error' }), { status:200, headers:CORS });
  }

  if (!paymentId) {
    console.error('[DS/approve] Missing paymentId');
    return new Response(JSON.stringify({ approved:true, warning:'missing_payment_id' }), { status:200, headers:CORS });
  }

  /* 2. Validate API key */
  const PI_API_KEY = context.env.PI_API_KEY;
  if (!PI_API_KEY) {
    console.error('[DS/approve] PI_API_KEY not configured');
    return new Response(JSON.stringify({ approved:true, warning:'missing_api_key' }), { status:200, headers:CORS });
  }

  /* 3. GET payment state for logging */
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), PI_TIMEOUT_MS);
    const getRes = await fetch(`https://api.minepi.com/v2/payments/${paymentId}`, {
      method: 'GET', headers: piHeaders(PI_API_KEY), signal: ctrl.signal,
    });
    clearTimeout(timer);
    const text = await getRes.text();
    console.log('[DS/approve] Payment state:', getRes.status, text.slice(0,200));
  } catch(e) {
    console.warn('[DS/approve] GET state failed (non-fatal):', e.message);
  }

  /* 4. Approve payment */
  try {
    console.log('[DS/approve] Calling Pi approve API...');
    const ctrl  = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), PI_TIMEOUT_MS);
    const piRes = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST', headers: piHeaders(PI_API_KEY),
      body: JSON.stringify({}), signal: ctrl.signal,
    });
    clearTimeout(timer);
    const piText = await piRes.text();
    console.log('[DS/approve] Pi response:', piRes.status, piText.slice(0,300));

    if (piRes.ok) {
      console.log('[DS/approve] ✅ Payment Approved');
    } else {
      console.warn('[DS/approve] ⚠️ Pi returned', piRes.status, '— still returning HTTP 200 to SDK');
    }

    return new Response(JSON.stringify({
      approved: true, pi_status: piRes.status, pi_ok: piRes.ok,
    }), { status:200, headers:CORS });

  } catch(err) {
    if (err.name === 'AbortError') {
      console.error('[DS/approve] ❌ Pi API timeout after', PI_TIMEOUT_MS, 'ms');
      return new Response(JSON.stringify({ approved:true, warning:'pi_api_timeout' }), { status:200, headers:CORS });
    }
    console.error('[DS/approve] ❌ Error:', err.message);
    return new Response(JSON.stringify({ approved:true, error:err.message }), { status:200, headers:CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status:200, headers:CORS });
}
