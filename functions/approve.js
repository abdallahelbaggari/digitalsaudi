/* =================================================================
   DigitalSaudi · functions/approve.js · Cloudflare Pages Function
   Route:  /approve
   Test:   https://digitalsaudi.pages.dev/approve  (GET → JSON)
   Pi Network Mainnet · sandbox:false
   PI_API_KEY → Cloudflare Dashboard → Settings → Environment Variables → Secret
   Copied exactly from WorldCup proven working pattern
================================================================= */

export async function onRequestGet(context) {
  const key = context.env.PI_API_KEY;
  return new Response(
    JSON.stringify({
      success:            true,
      message:            "approve.js is working",
      app:                "digitalsaudi.pages.dev",
      route:              "/approve",
      network:            "MAINNET · sandbox:false",
      pi_api_key_present: !!key,
      pi_api_key_length:  key ? key.length : 0,
      pi_api_key_prefix:  key ? key.substring(0, 8) + "..." : "MISSING — set in Cloudflare Dashboard → Settings → Variables"
    }),
    {
      status:  200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    }
  );
}

export async function onRequestPost(context) {
  const cors = {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type":                 "application/json"
  };

  console.log("[DS] /approve POST called");

  try {
    /* ── Parse body ── */
    let paymentId      = null;
    let expectedAmount = null;
    try {
      const body     = await context.request.json();
      paymentId      = body.paymentId      || null;
      expectedAmount = body.expectedAmount || null;
    } catch (e) {
      console.error("[DS] Body parse error:", e.message);
      /* Still return 200 — Pi SDK must not get non-200 */
      return new Response(
        JSON.stringify({ approved: true, step: "body_parse_error" }),
        { status: 200, headers: cors }
      );
    }

    console.log("[DS] paymentId:", paymentId);

    if (!paymentId) {
      return new Response(
        JSON.stringify({ approved: true, step: "no_payment_id" }),
        { status: 200, headers: cors }
      );
    }

    /* ── Get API key ── */
    const PI_API_KEY = context.env.PI_API_KEY;
    console.log("[DS] PI_API_KEY present:", !!PI_API_KEY, "| length:", PI_API_KEY ? PI_API_KEY.length : 0);

    if (!PI_API_KEY) {
      console.error("[DS] PI_API_KEY MISSING — add in Cloudflare Dashboard → Settings → Environment Variables");
      return new Response(
        JSON.stringify({ approved: true, step: "no_api_key", error: "PI_API_KEY not set" }),
        { status: 200, headers: cors }
      );
    }

    /* ── GET payment state (log only) ── */
    try {
      const getRes = await fetch(`https://api.minepi.com/v2/payments/${paymentId}`, {
        method:  "GET",
        headers: { "Authorization": `Key ${PI_API_KEY}` }
      });
      const getRaw = await getRes.text();
      console.log("[DS] GET payment state:", getRes.status, getRaw.substring(0, 200));
    } catch (e) {
      console.error("[DS] GET payment state error:", e.message);
    }

    /* ── POST approve ── */
    console.log("[DS] POSTing approve to Pi API...");
    const piRes = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {
        method:  "POST",
        headers: {
          "Authorization": `Key ${PI_API_KEY}`,
          "Content-Type":  "application/json"
        },
        body: JSON.stringify({})
      }
    );

    const piStatus = piRes.status;
    const piRaw    = await piRes.text();
    console.log("[DS] Pi approve response:", piStatus, piRaw.substring(0, 200));

    /* CRITICAL: Always return HTTP 200 to Pi SDK
       Non-200 = Pi SDK shows "Payment Expired"         */
    return new Response(
      JSON.stringify({ approved: true, pi_status: piStatus, pi_response: piRaw }),
      { status: 200, headers: cors }
    );

  } catch (err) {
    console.error("[DS] approve.js error:", err.message);
    /* Always 200 even on error */
    return new Response(
      JSON.stringify({ approved: true, error: err.message }),
      { status: 200, headers: cors }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status:  200,
    headers: {
      "Access-Control-Allow-Origin":  "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
