// /report — community scam reports for Pi addresses and @usernames.
//   GET  ?k=<G… address or username>               → how many different Pioneers reported it, and whether it is flagged
//   POST {a:'report', accessToken, k, reason}       → one report per Pioneer per address (signed in with Pi)
// A target is flagged once 50 different Pioneers report it. Reports are counted, never shown with names.
import { json, H, me, DBB, rateOk } from './_lib/transfers.js';

const REASONS = ['scam', 'fake', 'nodelivery', 'impersonation', 'other'], FLAG = 50;
let ready = false;
async function rdb(env) {
  const d = DBB(env); if (!d) return null;
  if (!ready) { await d.exec('CREATE TABLE IF NOT EXISTS reports (k TEXT, uid TEXT, reason TEXT, ts INTEGER, PRIMARY KEY (k, uid))'); ready = true; }
  return d;
}
function key(k) {
  k = String(k || '').trim().replace(/^@/, '');
  if (/^G[A-Z2-7]{55}$/.test(k.toUpperCase()) && k.length === 56) return 'a:' + k.toUpperCase();
  if (/^[A-Za-z0-9_.-]{2,40}$/.test(k)) return 'u:' + k.toLowerCase();
  return '';
}
async function count(d, k) {
  const r = await d.prepare('SELECT COUNT(*) AS n FROM reports WHERE k = ?').bind(k).first();
  const t = await d.prepare('SELECT reason, COUNT(*) AS n FROM reports WHERE k = ? GROUP BY reason ORDER BY n DESC LIMIT 3').bind(k).all();
  const n = (r && r.n) || 0;
  return { n, flagged: n >= FLAG, reasons: (t.results || []).map((x) => x.reason) };
}
export async function onRequestOptions() { return new Response(null, { status: 204, headers: H }); }
export async function onRequestGet({ request, env }) {
  try {
    const d = await rdb(env); if (!d) return json({ ok: true, n: 0, flagged: false, reasons: [] });
    if (!(await rateOk(env, request, 'rchk', 900))) return json({ ok: false, error: 'Too many checks. Try again in a few minutes.' });
    const k = key(new URL(request.url).searchParams.get('k')); if (!k) return json({ ok: false, error: 'Enter a Pi address or @username' });
    return json({ ok: true, ...(await count(d, k)) });
  } catch (e) { return json({ ok: false, error: 'Could not check right now.' }); }
}
export async function onRequestPost({ request, env }) {
  try {
    const b = await request.json().catch(() => ({}));
    const d = await rdb(env); if (!d) return json({ ok: false, error: 'Reports are not available right now' });
    if (!(await rateOk(env, request, 'rrep', 30, b.accessToken))) return json({ ok: false, error: 'Too many reports. Try again later.' });
    const u = await me(b.accessToken); if (!u) return json({ ok: false, auth: true, error: 'Sign in with Pi to report' });
    const k = key(b.k); if (!k) return json({ ok: false, error: 'Enter a Pi address or @username' });
    if (k === 'u:' + u.username.toLowerCase()) return json({ ok: false, error: 'You cannot report yourself' });
    const reason = REASONS.includes(b.reason) ? b.reason : 'other';
    await d.prepare('INSERT INTO reports (k, uid, reason, ts) VALUES (?, ?, ?, ?) ON CONFLICT(k, uid) DO UPDATE SET reason = excluded.reason, ts = excluded.ts').bind(k, u.uid, reason, Date.now()).run();
    return json({ ok: true, ...(await count(d, k)) });
  } catch (e) { return json({ ok: false, error: 'Could not send the report. Try again.' }); }
}
