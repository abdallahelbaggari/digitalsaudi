/* =================================================================
   COPA.pi · functions/approve.js · Cloudflare Pages Function
   Route:  /approve
   MAINNET · sandbox:false

   DIAGNOSTIC VERSION — logs every step to Cloudflare Real-time Logs
   
   TO DEBUG:
   1. Deploy this file
   2. Go to Cloudflare Dashboard → copa-pi → Real-time Logs
   3. Open app in Pi Browser → tap Copa Pass
   4. Watch logs — you will see exactly where it fails
   
   TO CONFIRM PI_API_KEY IS SET:
   Visit: https://copa-pi.pages.dev/approve
   Must show: pi_api_key_present: true, pi_api_key_length: 64
================================================================= */

export async function onRequestGet(context) {
  const key = context.env.PI_API_KEY;
  return new Response(JSON.stringify({
    success:            true,
    status:             'approve.js is reachable',
    route:              '/approve',
    network:            'MAINNET · sandbox:false',
    pi_api_key_present: !!key,
    pi_api_key_length:  key ? key.length : 0,
    pi_api_key_prefix:  key ? key.substring(0, 8) + '...' : 'MISSING',
    instruction:        !key ? 'Go to Cloudflare Dashboard → copa-pi → Settings → Environment Variables → add PI_API_KEY' : 'Key is set',
  }), {
    status:  200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

export async function onRequestPost(context) {
  const cors = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type':                 'application/json',
  };

  /* ── STEP 1: Log that we were called ── */
  console.log('[Copa/approve] ===== POST RECEIVED =====');

  /* ── STEP 2: Parse body ── */
  let paymentId = null;
  try {
    const body = await context.request.json();
    paymentId  = body.paymentId || null;
    console.log('[Copa/approve] STEP 2 OK - paymentId:', paymentId);
  } catch (e) {
    console.error('[Copa/approve] STEP 2 FAIL - body parse error:', e.message);
    return new Response(
      JSON.stringify({ approved: true, step: 'body_parse_error' }),
      { status: 200, headers: cors }
    );
  }

  if (!paymentId) {
    console.error('[Copa/approve] STEP 2 FAIL - no paymentId in body');
    return new Response(
      JSON.stringify({ approved: true, step: 'no_payment_id' }),
      { status: 200, headers: cors }
    );
  }

  /* ── STEP 3: Check API key ── */
  const PI_API_KEY = context.env.PI_API_KEY;
  console.log('[Copa/approve] STEP 3 - PI_API_KEY present:', !!PI_API_KEY,
    '| length:', PI_API_KEY ? PI_API_KEY.length : 0);

  if (!PI_API_KEY) {
    console.error('[Copa/approve] STEP 3 FAIL - PI_API_KEY NOT SET IN CLOUDFLARE ENV VARS');
    console.error('[Copa/approve] FIX: Cloudflare Dashboard → copa-pi → Settings → Environment Variables → add PI_API_KEY');
    /* Return 200 so Pi SDK does not immediately fail */
    return new Response(
      JSON.stringify({ approved: true, step: 'no_api_key' }),
      { status: 200, headers: cors }
    );
  }

  /* ── STEP 4: Call Pi API to approve ── */
  console.log('[Copa/approve] STEP 4 - Calling api.minepi.com/v2/payments/' + paymentId + '/approve');
  try {
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
    const piRaw = await piRes.text();
    console.log('[Copa/approve] STEP 4 RESULT - Pi API status:', piRes.status);
    console.log('[Copa/approve] STEP 4 RESULT - Pi API response:', piRaw.substring(0, 300));

    if (piRes.status === 200) {
      console.log('[Copa/approve] SUCCESS - payment approved by Pi API');
    } else if (piRes.status === 401) {
      console.error('[Copa/approve] FAIL 401 - PI_API_KEY is WRONG - get correct key from develop.pi');
    } else if (piRes.status === 400) {
      console.error('[Copa/approve] FAIL 400 - Bad request - paymentId may be invalid:', piRaw);
    } else {
      console.error('[Copa/approve] FAIL', piRes.status, '-', piRaw);
    }

    /* ALWAYS return 200 to Pi SDK */
    return new Response(
      JSON.stringify({ approved: true, pi_status: piRes.status, pi_response: piRaw }),
      { status: 200, headers: cors }
    );

  } catch (err) {
    console.error('[Copa/approve] STEP 4 EXCEPTION:', err.message);
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
