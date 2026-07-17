/* =================================================================
   DigitalSaudi · functions/approve.js · Cloudflare Pages Function
   Route: /approve
   MAINNET · sandbox:false
   Copied exactly from Copa proven working pattern
================================================================= */

export async function onRequestGet(context) {
  const key = context.env.PI_API_KEY;
  return new Response(JSON.stringify({
    success:            true,
    message:            'DigitalSaudi approve.js working',
    route:              '/approve',
    network:            'MAINNET · sandbox:false',
    pi_api_key_present: !!key,
    pi_api_key_length:  key ? key.length : 0,
    pi_api_key_prefix:  key ? key.substring(0,8)+'...' : 'MISSING — set in Cloudflare Dashboard',
  }), {
    status:  200,
    headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*' },
  });
}

export async function onRequestPost(context) {
  const cors = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type':                 'application/json',
  };

  console.log('[DS MAINNET] /approve POST called');

  try {
    /* ── Parse body ── */
    let paymentId = null;
    try {
      const body = await context.request.json();
      paymentId  = body.paymentId || null;
    } catch(e) {
      console.error('[DS] Body parse error:', e.message);
      return new Response(
        JSON.stringify({ approved: true, step: 'body_parse_error' }),
        { status: 200, headers: cors }
      );
    }

    console.log('[DS MAINNET] paymentId:', paymentId);

    if (!paymentId) {
      return new Response(
        JSON.stringify({ approved: true, step: 'no_payment_id' }),
        { status: 200, headers: cors }
      );
    }

    /* ── Get API key ── */
    const PI_API_KEY = context.env.PI_API_KEY;
    console.log('[DS MAINNET] PI_API_KEY present:', !!PI_API_KEY,
      '| length:', PI_API_KEY ? PI_API_KEY.length : 0);

    if (!PI_API_KEY) {
      console.error('[DS MAINNET] PI_API_KEY MISSING — add in Cloudflare Dashboard');
      return new Response(
        JSON.stringify({ approved: true, step: 'no_api_key',
          error: 'PI_API_KEY not set in Cloudflare env vars' }),
        { status: 200, headers: cors }
      );
    }

    /* ── GET payment state first (for logging) ── */
    try {
      const getRes = await fetch(
        `https://api.minepi.com/v2/payments/${paymentId}`,
        { method: 'GET', headers: { 'Authorization': `Key ${PI_API_KEY}` } }
      );
      const getRaw = await getRes.text();
      console.log('[DS MAINNET] Payment state:', getRes.status,
        getRaw.substring(0, 200));
    } catch(e) {
      console.warn('[DS MAINNET] GET state error (non-fatal):', e.message);
    }

    /* ── POST approve ── */
    console.log('[DS MAINNET] Calling Pi approve API...');
    const piRes = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {
        method:  'POST',
        headers: {
          'Authorization': `Key ${PI_API_KEY}`,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify({}),
      }
    );

    const piStatus = piRes.status;
    const piRaw    = await piRes.text();
    console.log('[DS MAINNET] Pi approve response:', piStatus,
      piRaw.substring(0, 300));

    /* ALWAYS HTTP 200 back to Pi SDK */
    return new Response(
      JSON.stringify({ approved: true, pi_status: piStatus }),
      { status: 200, headers: cors }
    );

  } catch(err) {
    console.error('[DS MAINNET] approve error:', err.message);
    /* ALWAYS HTTP 200 — never let this return non-200 */
    return new Response(
      JSON.stringify({ approved: true, error: err.message }),
      { status: 200, headers: cors }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin':  '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
