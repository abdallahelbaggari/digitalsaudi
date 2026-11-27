// /history — the signed-in user's full payment history, kept safely on the server so it is never lost
// (new phone, cleared browser) and has no size limit on the phone.
//   POST {a:'push', accessToken, items:[receipt,…]}      → stores receipts not stored yet (max 200 per call)
//   POST {a:'pull', accessToken, before?, limit?}         → receipts newest first, older than `before` (ms), up to 500
//   POST {a:'count', accessToken}                         → how many receipts are stored for this user
//   POST {a:'bput', accessToken, ts, data}                → saves the user's business records (invoices, customers…)
//   POST {a:'bget', accessToken}                          → returns them ({ts, data} or null)
// Only the user (proved by their Pi sign-in) can read or add to their own history.
import { json, H, me, DBB, rateOk } from './_lib/transfers.js';

const MAX_ITEM = 6000, MAX_PUSH = 200, MAX_PULL = 500, MAX_BIZ = 1800000;
let ready = false;
async function hdb(env) {
  const d = DBB(env); if (!d) return null;
  if (!ready) {
    await d.exec('CREATE TABLE IF NOT EXISTS history (uid TEXT, k TEXT, ts INTEGER, data TEXT, saved INTEGER, PRIMARY KEY (uid, k))');
    await d.exec('CREATE INDEX IF NOT EXISTS history_uid_ts ON history (uid, ts)');
    await d.exec('CREATE TABLE IF NOT EXISTS bizdata (uid TEXT PRIMARY KEY, ts INTEGER, data TEXT, saved INTEGER)');
    ready = true;
  }
  return d;
}
function keyOf(r) {
  const t = String(r.txid || '').toLowerCase();
  if (/^[a-f0-9]{64}$/.test(t)) return 'tx:' + t + (r.kind === 'refund' ? ':r' : '') + (r.dir ? ':' + r.dir : '');
  const ref = String(r.ref || r.pid || '');
  return ref && ref.length <= 100 ? 'ref:' + ref : '';
}

export async function onRequestOptions() { return new Response(null, { status: 204, headers: H }); }
export async function onRequestPost({ request, env }) {
  try {
    const b = await request.json().catch(() => ({}));
    const d = await hdb(env);
    if (!d) return json({ ok: false, unavailable: true, error: 'History backup is not available right now' });
    if (!(await rateOk(env, request, 'hist', 900, b.accessToken))) return json({ ok: false, error: 'Too many requests. Try again in a few minutes.' });
    const u = await me(b.accessToken);
    if (!u) return json({ ok: false, auth: true, error: 'Sign in with Pi again' });
    if (b.a === 'push') {
      const items = Array.isArray(b.items) ? b.items.slice(0, MAX_PUSH) : [], now = Date.now(), st = [];
      for (const r of items) {
        if (!r || typeof r !== 'object') continue;
        const k = keyOf(r), ts = Number(r.ts), s = JSON.stringify(r);
        if (!k || !(ts > 1.5e12 && ts < now + 864e5) || s.length > MAX_ITEM) continue;
        st.push(d.prepare('INSERT OR IGNORE INTO history (uid, k, ts, data, saved) VALUES (?, ?, ?, ?, ?)').bind(u.uid, k, Math.round(ts), s, now));
      }
      for (let i = 0; i < st.length; i += 50) await d.batch(st.slice(i, i + 50));
      return json({ ok: true, stored: st.length });
    }
    if (b.a === 'pull') {
      const before = Number(b.before) > 0 ? Number(b.before) : 9e15, limit = Math.min(MAX_PULL, Math.max(1, Number(b.limit) || 200));
      const rs = await d.prepare('SELECT data FROM history WHERE uid = ? AND ts < ? ORDER BY ts DESC LIMIT ?').bind(u.uid, before, limit).all();
      const items = (rs.results || []).map((x) => { try { return JSON.parse(x.data); } catch (e) { return null; } }).filter(Boolean);
      return json({ ok: true, items, more: items.length === limit });
    }
    if (b.a === 'bput') {
      const ts = Number(b.ts), s = JSON.stringify(b.data || null);
      if (!b.data || typeof b.data !== 'object' || !(ts > 1.5e12 && ts < Date.now() + 864e5)) return json({ ok: false, error: 'Nothing to save' });
      if (s.length > MAX_BIZ) return json({ ok: false, error: 'Business records are too large to back up' });
      await d.prepare('INSERT INTO bizdata (uid, ts, data, saved) VALUES (?, ?, ?, ?) ON CONFLICT(uid) DO UPDATE SET ts = excluded.ts, data = excluded.data, saved = excluded.saved WHERE excluded.ts >= bizdata.ts').bind(u.uid, Math.round(ts), s, Date.now()).run();
      return json({ ok: true });
    }
    if (b.a === 'bget') {
      const r = await d.prepare('SELECT ts, data FROM bizdata WHERE uid = ?').bind(u.uid).first();
      let data = null; try { data = r ? JSON.parse(r.data) : null; } catch (e) {}
      return json({ ok: true, ts: r ? r.ts : 0, data });
    }
    if (b.a === 'count') {
      const c = await d.prepare('SELECT COUNT(*) AS n FROM history WHERE uid = ?').bind(u.uid).first();
      return json({ ok: true, count: (c && c.n) || 0 });
    }
    return json({ ok: false, error: 'Unknown request' });
  } catch (e) {
    return json({ ok: false, error: 'History is not available right now. Please try again.' });
  }
}
