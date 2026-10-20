// DigitalSaudi — /referral  (Cloudflare Pages Function, needs DS_KV)
// Counts friends who joined through an invite link. Every call is checked with Pi
// using the person's own sign-in token, so only real Pi accounts count, each one once.
//   POST /referral { accessToken, action:'claim', ref:'<inviter username>' }
//        -> { ok, counted }   (the new user is credited to the inviter, once ever)
//   POST /referral { accessToken, action:'mine' }
//        -> { ok, count, recent:[usernames] }
// Always returns HTTP 200.

const H = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
const json = (o) => new Response(JSON.stringify(o), { status: 200, headers: H });
const USER = /^[A-Za-z0-9_.-]{2,40}$/;

async function piUser(token) {
  if (!token || typeof token !== 'string' || token.length > 4096) return null;
  try { const r = await fetch('https://api.minepi.com/v2/me', { headers: { Authorization: 'Bearer ' + token } }); if (!r.ok) return null; const u = await r.json(); return u && u.uid && u.username ? u : null; } catch (e) { return null; }
}

export async function onRequestPost(context) {
  try {
    const kv = context.env.DS_KV;
    if (!kv) return json({ ok: false, error: 'storage not available' });
    const b = await context.request.json().catch(() => ({}));
    const me = await piUser(b.accessToken);
    if (!me) return json({ ok: false, error: 'sign in with Pi' });
    const myName = String(me.username).toLowerCase();

    if (b.action === 'mine') {
      const raw = await kv.get('refs:' + myName);
      const list = raw ? JSON.parse(raw) : [];
      return json({ ok: true, count: list.length, recent: list.slice(-5).reverse().map((x) => x.n) });
    }

    if (b.action === 'claim') {
      const ref = String(b.ref || '').replace(/^@/, '').trim().toLowerCase();
      if (!USER.test(ref)) return json({ ok: false, error: 'invalid invite' });
      if (ref === myName) return json({ ok: true, counted: false, reason: 'self' });
      // a Pi account can be credited once, ever — and only if it was not already using the app
      const seen = await kv.get('refby:' + me.uid);
      if (seen) return json({ ok: true, counted: false, reason: 'already' });
      const known = await kv.get('premium:' + me.uid);
      if (known) { await kv.put('refby:' + me.uid, '-'); return json({ ok: true, counted: false, reason: 'existing' }); }
      await kv.put('refby:' + me.uid, ref);
      const raw = await kv.get('refs:' + ref);
      const list = raw ? JSON.parse(raw) : [];
      if (!list.some((x) => x.u === me.uid)) list.push({ u: me.uid, n: me.username, t: Date.now() });
      await kv.put('refs:' + ref, JSON.stringify(list.slice(-500)));
      return json({ ok: true, counted: true });
    }
    return json({ ok: false, error: 'unknown action' });
  } catch (err) {
    return json({ ok: false, error: String((err && err.message) || err) });
  }
}

export async function onRequestOptions() { return new Response(null, { status: 204, headers: H }); }
