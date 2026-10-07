// DigitalSaudi — /admin-api  (Cloudflare Pages Function) — used by /admin.html only.
// Protected by the ADMIN_TOKEN secret (set it in Cloudflare; use 16+ random characters).
//   GET  /admin-api?view=pending|approved|rejected|events
//   POST /admin-api { action: approve|reject|delete|addEvent|deleteEvent, id, event, note }

const HEADERS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token', 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
const json = o => new Response(JSON.stringify(o), { status: 200, headers: HEADERS });
// --- Pi payment helpers (same logic as /cancel-payment) ---
const PI = 'https://api.minepi.com/v2/payments/';

async function pi(key, path, method, body) {
  const r = await fetch(PI + path, { method: method || 'GET', headers: { Authorization: 'Key ' + key, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const text = await r.text(); let data = null; try { data = JSON.parse(text); } catch (e) {}
  return { ok: r.ok, status: r.status, data, text: text.slice(0, 300) };
}

async function clearPayment(key, paymentId, txidHint) {
  const look = await pi(key, encodeURIComponent(paymentId));
  if (!look.ok) return { ok: false, action: 'lookup', status: look.status, detail: (look.data && (look.data.error_message || look.data.error)) || look.text };
  const p = look.data || {}, st = p.status || {};
  const txid = (p.transaction && p.transaction.txid) || txidHint || '';
  if (st.developer_completed) return { ok: true, action: 'none', detail: 'Payment was already completed', payment: { amount: p.amount, memo: p.memo, txid } };
  if (st.cancelled || st.user_cancelled) return { ok: true, action: 'none', detail: 'Payment was already cancelled' };
  if (txid) {
    const r = await pi(key, encodeURIComponent(paymentId) + '/complete', 'POST', { txid });
    return { ok: r.ok, action: 'complete', status: r.status, detail: r.ok ? 'Payment completed' : ((r.data && (r.data.error_message || r.data.error)) || r.text), payment: { amount: p.amount, memo: p.memo, txid, metadata: p.metadata } };
  }
  const r = await pi(key, encodeURIComponent(paymentId) + '/cancel', 'POST', {});
  return { ok: r.ok, action: 'cancel', status: r.status, detail: r.ok ? 'Payment cancelled' : ((r.data && (r.data.error_message || r.data.error)) || r.text) };
}


const EV_CATS = ['religious','national','sports','culture','concerts','family','exhibitions','conferences','seasons'];

async function schema(db) {
  await db.prepare(`CREATE TABLE IF NOT EXISTS listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, category TEXT, city TEXT, description TEXT, address TEXT,
    phone TEXT, whatsapp TEXT, website TEXT, lat REAL, lng REAL, accepts_pi INTEGER DEFAULT 0, pi_username TEXT,
    status TEXT DEFAULT 'pending', uid TEXT, username TEXT, created_at INTEGER, reviewed_at INTEGER, note TEXT)`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, city TEXT, category TEXT, start TEXT, "end" TEXT,
    venue TEXT, description TEXT, url TEXT, image TEXT, status TEXT DEFAULT 'published', created_at INTEGER)`).run();
}
function authorised(context) {
  const t = context.env.ADMIN_TOKEN, got = context.request.headers.get('X-Admin-Token') || '';
  if (!t || t.length < 12 || got.length !== t.length) return false;
  let diff = 0; for (let i = 0; i < t.length; i++) diff |= t.charCodeAt(i) ^ got.charCodeAt(i);
  return diff === 0;
}
const s = (v, n) => String(v == null ? '' : v).replace(/[<>]/g, '').trim().slice(0, n);

export async function onRequestGet(context) {
  if (!authorised(context)) return json({ ok: false, error: 'unauthorised' });
  const db = context.env.DS_DB; if (!db) return json({ ok: false, error: 'DS_DB not bound' });
  await schema(db);
  const view = new URL(context.request.url).searchParams.get('view') || 'pending';
  if (view === 'events') {
    const r = await db.prepare(`SELECT id, title, city, category, start, "end" AS "end", venue, description, url, image FROM events ORDER BY start DESC LIMIT 300`).all();
    return json({ ok: true, events: r.results || [] });
  }
  const st = ['pending', 'approved', 'rejected'].includes(view) ? view : 'pending';
  const r = await db.prepare(`SELECT * FROM listings WHERE status = ? ORDER BY created_at DESC LIMIT 300`).bind(st).all();
  const counts = await db.prepare(`SELECT status, COUNT(*) AS n FROM listings GROUP BY status`).all();
  return json({ ok: true, items: r.results || [], counts: Object.fromEntries((counts.results || []).map(c => [c.status, c.n])) });
}

export async function onRequestPost(context) {
  if (!authorised(context)) return json({ ok: false, error: 'unauthorised' });
  const db = context.env.DS_DB; if (!db) return json({ ok: false, error: 'DS_DB not bound' });
  await schema(db);
  const b = await context.request.json().catch(() => ({}));
  const id = parseInt(b.id, 10) || 0;
  switch (b.action) {
    case 'approve':
    case 'reject':
      await db.prepare(`UPDATE listings SET status = ?, reviewed_at = ?, note = ? WHERE id = ?`).bind(b.action === 'approve' ? 'approved' : 'rejected', Date.now(), s(b.note, 200), id).run();
      return json({ ok: true });
    case 'delete':
      await db.prepare(`DELETE FROM listings WHERE id = ?`).bind(id).run();
      return json({ ok: true });
    case 'addEvent': {
      const e = b.event || {};
      if (!s(e.title, 120) || !/^\d{4}-\d{2}-\d{2}/.test(e.start || '')) return json({ ok: false, error: 'Title and start date are required' });
      let url = s(e.url, 300); if (url && !/^https?:\/\//i.test(url)) url = 'https://' + url;
      let image = s(e.image, 300); if (image && !/^https:\/\//i.test(image)) image = '';
      await db.prepare(`INSERT INTO events (title, city, category, start, "end", venue, description, url, image, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?)`)
        .bind(s(e.title, 120), s(e.city, 40) || 'Riyadh', EV_CATS.includes(e.category) ? e.category : 'culture', s(e.start, 16), s(e.end, 16), s(e.venue, 120), s(e.description, 800), url, image, Date.now()).run();
      return json({ ok: true });
    }
    case 'clearPayment': {
      const key = context.env.PI_API_KEY ? String(context.env.PI_API_KEY).trim() : '';
      if (!key) return json({ ok: false, error: 'PI_API_KEY not set' });
      const pid = s(b.paymentId, 120);
      if (!pid) return json({ ok: false, error: 'Enter a payment ID' });
      return json({ ...(await clearPayment(key, pid)), paymentId: pid });
    }
    case 'deleteEvent':
      await db.prepare(`DELETE FROM events WHERE id = ?`).bind(id).run();
      return json({ ok: true });
    default:
      return json({ ok: false, error: 'Unknown action' });
  }
}
export async function onRequestOptions() { return new Response(null, { status: 204, headers: HEADERS }); }
