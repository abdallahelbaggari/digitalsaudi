// /staff — staff mode. A business owner creates a private staff link; a worker opens it on another phone and records
// sales that the owner's DigitalSaudi picks up automatically. The worker never signs in and never sees the owner's wallet.
//   Owner (Pi sign-in):  {a:'set', accessToken, cfg, renew?} → saves the shop's name, payment @username or address and products; returns the code
//                        {a:'off', accessToken}                → turns staff access off (the old link stops working)
//                        {a:'pull', accessToken, paid}         → staff sales of the last 14 days; `paid` lists sale numbers the owner has received
//   Staff (code only):   {a:'cfg', code}                       → shop name, payment target and products
//                        {a:'sale', code, sale}                → records one sale
//                        {a:'status', code, nos}               → which of these sale numbers are paid
import { json, H, me, DBB, rateOk } from './_lib/transfers.js';

const CODE_RE = /^[A-Z2-9]{20}$/, NO_RE = /^INV-S\d{1,3}-\d{4,6}$/, MAX_CFG = 120000, MAX_SALE = 6000;
let ready = false;
async function sdb(env) {
  const d = DBB(env); if (!d) return null;
  if (!ready) {
    await d.exec('CREATE TABLE IF NOT EXISTS staff (code TEXT PRIMARY KEY, uid TEXT, n INTEGER, cfg TEXT, ts INTEGER)');
    await d.exec('CREATE INDEX IF NOT EXISTS staff_uid ON staff (uid)');
    await d.exec('CREATE TABLE IF NOT EXISTS staff_sales (uid TEXT, no TEXT, code TEXT, ts INTEGER, data TEXT, paid INTEGER, PRIMARY KEY (uid, no))');
    await d.exec('CREATE INDEX IF NOT EXISTS staff_sales_ts ON staff_sales (uid, ts)');
    ready = true;
  }
  return d;
}
function newCode() { const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', u = crypto.getRandomValues(new Uint8Array(20)); let c = ''; for (const b of u) c += A[b % 32]; return c; }
const num = (v) => Math.round(Number(v) * 1e7) / 1e7;
function cleanCfg(c) {
  c = c && typeof c === 'object' ? c : {};
  const prods = (Array.isArray(c.prods) ? c.prods : []).slice(0, 500).map((q) => ({ id: String(q.id || '').slice(0, 24), n: String(q.n || '').slice(0, 60), p: num(q.p), sku: String(q.sku || '').slice(0, 40), stock: typeof q.stock === 'number' ? num(q.stock) : null })).filter((q) => q.id && q.n && q.p > 0);
  return { name: String(c.name || '').slice(0, 60), staff: String(c.staff || 'Staff').slice(0, 30), target: String(c.target || '').slice(0, 60), prods };
}

export async function onRequestOptions() { return new Response(null, { status: 204, headers: H }); }
export async function onRequestPost({ request, env }) {
  try {
    const b = await request.json().catch(() => ({}));
    const d = await sdb(env);
    if (!d) return json({ ok: false, unavailable: true, error: 'Staff mode is not available right now' });
    // staff side: the code is the key
    if (b.a === 'cfg' || b.a === 'sale' || b.a === 'status') {
      const code = String(b.code || '').toUpperCase();
      if (!CODE_RE.test(code)) return json({ ok: false, off: true, error: 'This staff link is not valid' });
      if (!(await rateOk(env, request, 'staff', 1200, code))) return json({ ok: false, error: 'Too many requests. Try again in a few minutes.' });
      const s = await d.prepare('SELECT uid, n, cfg FROM staff WHERE code = ?').bind(code).first();
      if (!s) return json({ ok: false, off: true, error: 'This staff link is no longer active. Ask the business for a new link.' });
      if (b.a === 'cfg') { let cfg = null; try { cfg = JSON.parse(s.cfg); } catch (e) {} const c = await d.prepare('SELECT COUNT(*) AS k FROM staff_sales WHERE uid = ? AND code = ?').bind(s.uid, code).first(); return json({ ok: true, n: s.n, cfg, count: (c && c.k) || 0 }); }
      if (b.a === 'sale') {
        const x = b.sale || {}, no = String(x.no || ''), ts = Number(x.ts), items = Array.isArray(x.items) ? x.items.slice(0, 13) : [];
        if (!NO_RE.test(no) || !no.startsWith('INV-S' + s.n + '-') || !(ts > Date.now() - 7 * 864e5 && ts < Date.now() + 864e5) || !items.length) return json({ ok: false, error: 'Sale details are not valid' });
        const sale = { no, ts: Math.round(ts), items: items.map((it) => ({ d: String(it.d || '').slice(0, 60), q: num(it.q), p: num(it.p), pid: String(it.pid || '').slice(0, 24), tip: it.tip ? 1 : 0 })).filter((it) => it.d && it.q > 0 && it.p >= 0), disc: Math.max(0, num(x.disc) || 0), total: num(x.total), note: String(x.note || '').slice(0, 40), staff: String(x.staff || '').slice(0, 30) };
        const str = JSON.stringify(sale); if (str.length > MAX_SALE || !(sale.total > 0)) return json({ ok: false, error: 'Sale details are not valid' });
        const today = await d.prepare('SELECT COUNT(*) AS k FROM staff_sales WHERE code = ? AND ts > ?').bind(code, Date.now() - 864e5).first();
        if (today && today.k >= 1000) return json({ ok: false, error: 'Daily sale limit reached for this staff link' });
        await d.prepare('INSERT OR IGNORE INTO staff_sales (uid, no, code, ts, data, paid) VALUES (?, ?, ?, ?, ?, 0)').bind(s.uid, no, code, sale.ts, str).run();
        return json({ ok: true });
      }
      // status: paid in DigitalSaudi (server record) or confirmed by the owner's DigitalSaudi
      const nos = (Array.isArray(b.nos) ? b.nos : []).map(String).filter((n) => NO_RE.test(n)).slice(0, 30); if (!nos.length) return json({ ok: true, paid: [] });
      const paid = new Set();
      const q1 = await d.prepare('SELECT no FROM staff_sales WHERE uid = ? AND paid = 1 AND no IN (' + nos.map(() => '?').join(',') + ')').bind(s.uid, ...nos).all();
      (q1.results || []).forEach((r) => paid.add(r.no));
      try {
        const q2 = await d.prepare("SELECT narr FROM transfers WHERE to_uid = ? AND status = 'paid' AND ts > ?").bind(s.uid, Date.now() - 3 * 864e5).all();
        (q2.results || []).forEach((r) => { const m = String(r.narr || '').toUpperCase().match(/INV-S\d{1,3}-\d{4,6}/g) || []; m.forEach((n) => { if (nos.includes(n)) paid.add(n); }); });
      } catch (e) {}
      return json({ ok: true, paid: [...paid] });
    }
    // owner side: Pi sign-in required
    if (!(await rateOk(env, request, 'staffo', 600, b.accessToken))) return json({ ok: false, error: 'Too many requests. Try again in a few minutes.' });
    const u = await me(b.accessToken);
    if (!u) return json({ ok: false, auth: true, error: 'Sign in with Pi again' });
    if (b.a === 'set') {
      const cfg = cleanCfg(b.cfg), s = JSON.stringify(cfg); if (s.length > MAX_CFG) return json({ ok: false, error: 'Too many products to share' });
      if (!cfg.target) return json({ ok: false, error: 'Add your Pi wallet address first' });
      const cur = await d.prepare('SELECT code, n FROM staff WHERE uid = ?').bind(u.uid).first(), live = cur && CODE_RE.test(cur.code);
      if (live && !b.renew) { await d.prepare('UPDATE staff SET cfg = ?, ts = ? WHERE code = ?').bind(s, Date.now(), cur.code).run(); return json({ ok: true, code: cur.code, n: cur.n }); }
      // every new link gets a new number, so sale numbers never repeat
      const n = cur ? (cur.n % 999) + 1 : 1, code = newCode();
      await d.batch([d.prepare('DELETE FROM staff WHERE uid = ?').bind(u.uid), d.prepare('INSERT INTO staff (code, uid, n, cfg, ts) VALUES (?, ?, ?, ?, ?)').bind(code, u.uid, n, s, Date.now())]);
      return json({ ok: true, code, n });
    }
    if (b.a === 'off') { await d.prepare("UPDATE staff SET code = 'off-' || uid, cfg = '{}' WHERE uid = ?").bind(u.uid).run(); return json({ ok: true }); }
    if (b.a === 'pull') {
      const paid = (Array.isArray(b.paid) ? b.paid : []).map(String).filter((n) => NO_RE.test(n)).slice(0, 200);
      for (let i = 0; i < paid.length; i += 50) { const p = paid.slice(i, i + 50); await d.prepare('UPDATE staff_sales SET paid = 1 WHERE uid = ? AND no IN (' + p.map(() => '?').join(',') + ')').bind(u.uid, ...p).run(); }
      const rs = await d.prepare('SELECT data FROM staff_sales WHERE uid = ? AND ts > ? ORDER BY ts DESC LIMIT 400').bind(u.uid, Date.now() - 14 * 864e5).all();
      const cur = await d.prepare('SELECT code, n FROM staff WHERE uid = ?').bind(u.uid).first(), live = cur && CODE_RE.test(cur.code);
      return json({ ok: true, items: (rs.results || []).map((r) => { try { return JSON.parse(r.data); } catch (e) { return null; } }).filter(Boolean), code: live ? cur.code : '', n: live ? cur.n : 0 });
    }
    return json({ ok: false, error: 'Unknown request' });
  } catch (e) {
    return json({ ok: false, error: 'Staff mode is not available right now. Please try again.' });
  }
}
