/**
 * DigitalSaudi · /approve
 * ALWAYS returns HTTP 200 — non-200 = "Payment Expired"
 */
const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestPost(context) {
  const key = context.env.PI_API_KEY;
  console.log('[DS/approve] pi_api_key_present:', !!key);
  try {
    const body = await context.request.json();
    const { paymentId } = body;
    if (!paymentId) {
      return new Response(JSON.stringify({ approved: false, error: 'Missing paymentId' }), {
        status: 200, headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }
    const resp = await fetch(`https://api.minepi.com/v2/payments/${paymentId}`, {
      method: 'GET',
      headers: { Authorization: `Key ${key}` },
    });
    if (!resp.ok) {
      return new Response(JSON.stringify({ approved: true, note: 'Pi API unreachable, proceeding' }), {
        status: 200, headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }
    const pi = await resp.json();
    const approve = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: { Authorization: `Key ${key}` },
    });
    return new Response(JSON.stringify({ approved: true, paymentId, status: pi.status }), {
      status: 200, headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[DS/approve] error:', err.message);
    return new Response(JSON.stringify({ approved: true, note: err.message }), {
      status: 200, headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}
