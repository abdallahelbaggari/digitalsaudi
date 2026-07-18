/* =================================================================
   DigitalSaudi · functions/cancel-payment.js
   Route: /cancel-payment
   MAINNET · sandbox:false
   
   Smart handler: checks payment status first
   - If approved + has txid → complete it
   - If approved + no txid  → re-approve to allow retry
   - If anything else       → re-approve
================================================================= */

export async function onRequestGet(context) {
  return new Response(JSON.stringify({
    success: true, route: '/cancel-payment', network: 'MAINNET · sandbox:false'
  }), { status:200, headers:{ 'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*' }});
}

export async function onRequestPost(context) {
  const cors = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const body      = await context.request.json();
    const paymentId = body.paymentId;

    console.log('[DS MAINNET] /cancel-payment POST paymentId:', paymentId);

    if (!paymentId) {
      return new Response(JSON.stringify({ success:false, error:'missing paymentId' }), { status:200, headers:cors });
    }

    const PI_API_KEY = context.env.PI_API_KEY;
    if (!PI_API_KEY) {
      return new Response(JSON.stringify({ success:false, error:'PI_API_KEY not set' }), { status:200, headers:cors });
    }

    /* Step 1: GET payment status */
    let paymentData = null;
    try {
      const getRes = await fetch(
        `https://api.minepi.com/v2/payments/${paymentId}`,
        { method:'GET', headers:{ 'Authorization': `Key ${PI_API_KEY}` } }
      );
      const getText = await getRes.text();
      console.log('[DS MAINNET] Payment GET status:', getRes.status, getText.slice(0,200));
      try { paymentData = JSON.parse(getText); } catch(e) {}
    } catch(e) {
      console.warn('[DS MAINNET] GET payment error:', e.message);
    }

    /* Step 2: If payment has txid → complete it */
    const txid = paymentData?.transaction?.txid || null;
    if (txid) {
      console.log('[DS MAINNET] Payment has txid — completing:', txid);
      const completeRes = await fetch(
        `https://api.minepi.com/v2/payments/${paymentId}/complete`,
        {
          method:  'POST',
          headers: { 'Authorization': `Key ${PI_API_KEY}`, 'Content-Type': 'application/json' },
          body:    JSON.stringify({ txid }),
        }
      );
      const completeText = await completeRes.text();
      console.log('[DS MAINNET] Complete response:', completeRes.status, completeText.slice(0,200));
      return new Response(JSON.stringify({ success:true, action:'completed', pi_status:completeRes.status }), { status:200, headers:cors });
    }

    /* Step 3: No txid — re-approve to clear pending state */
    console.log('[DS MAINNET] No txid — re-approving to clear pending');
    const approveRes = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {
        method:  'POST',
        headers: { 'Authorization': `Key ${PI_API_KEY}`, 'Content-Type': 'application/json' },
        body:    JSON.stringify({}),
      }
    );
    const approveText = await approveRes.text();
    console.log('[DS MAINNET] Re-approve response:', approveRes.status, approveText.slice(0,200));

    return new Response(JSON.stringify({ success:true, action:'re-approved', pi_status:approveRes.status }), { status:200, headers:cors });

  } catch(err) {
    console.error('[DS MAINNET] cancel-payment error:', err.message);
    return new Response(JSON.stringify({ success:false, error:err.message }), { status:200, headers:cors });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status:200, headers:{
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }});
}
