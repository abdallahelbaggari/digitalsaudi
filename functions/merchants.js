// /merchants — DigitalSaudi Merchant Directory: businesses that accept Pi, listed by their owners.
//   GET  ?q=&cat=&page=                            → listings (newest first, 30 per page)
//   POST {a:'mine', accessToken}                    → the signed-in owner's listing
//   POST {a:'set', accessToken, listing}            → creates or updates the owner's listing (one per Pi account)
//   POST {a:'off', accessToken}                     → removes it
//   POST {a:'report', accessToken, id}              → reports a listing; hidden after 50 different Pioneers report it
import { json, H, me, DBB, rateOk } from './_lib/transfers.js';

export const CATS = ['food', 'grocery', 'fashion', 'electronics', 'services', 'transport', 'beauty', 'education', 'travel', 'online', 'other'];
const PAGE = 30, MAX_LOGO = 60000;
let ready = false;
async function ddb(env) {
  const d = DBB(env); if (!d) return null;
  if (!ready) {
    await d.exec('CREATE TABLE IF NOT EXISTS dir (id TEXT PRIMARY KEY, uid TEXT UNIQUE, name TEXT, cat TEXT, city TEXT, country TEXT, about TEXT, target TEXT, logo TEXT, ts INTEGER, hidden INTEGER DEFAULT 0)');
    await d.exec('CREATE TABLE IF NOT EXISTS dir_reports (id TEXT, uid TEXT, ts INTEGER, PRIMARY KEY (id, uid))');
    ready = true;
  }
  return d;
}
const clip = (v, n) => String(v == null ? '' : v).replace(/<[^>]*>/g, '').replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, n);
function newId() { const A = 'abcdefghjkmnpqrstuvwxyz23456789', u = crypto.getRandomValues(new Uint8Array(10)); let c = ''; for (const b of u) c += A[b % 31]; return c; }
const pub = (r) => ({ id: r.id, name: r.name, cat: r.cat, city: r.city, country: r.country, about: r.about, target: r.target, logo: r.logo || '', ts: r.ts });

export async function onRequestOptions() { return new Response(null, { status: 204, headers: H }); }
export async function onRequestGet({ request, env }) {
  try {
    const d = await ddb(env); if (!d) return json({ ok: true, items: [] });
    if (!(await rateOk(env, request, 'dirg', 1200))) return json({ ok: false, error: 'Too many requests. Try again in a few minutes.' });
    const u = new URL(request.url), q = clip(u.searchParams.get('q'), 40).toLowerCase(), cat = CATS.includes(u.searchParams.get('cat')) ? u.searchParams.get('cat') : '', page = Math.max(0, Math.min(50, Number(u.searchParams.get('page')) || 0));
    let sql = 'SELECT * FROM dir WHERE hidden = 0', args = [];
    if (cat) { sql += ' AND cat = ?'; args.push(cat); }
    if (q) { sql += ' AND (lower(name) LIKE ? OR lower(city) LIKE ? OR lower(country) LIKE ? OR lower(about) LIKE ?)'; const l = '%' + q.replace(/[%_]/g, '') + '%'; args.push(l, l, l, l); }
    sql += ' ORDER BY ts DESC LIMIT ? OFFSET ?'; args.push(PAGE + 1, page * PAGE);
    const rs = await d.prepare(sql).bind(...args).all(), L = rs.results || [];
    return json({ ok: true, items: L.slice(0, PAGE).map(pub), more: L.length > PAGE });
  } catch (e) { return json({ ok: false, error: 'The directory is not available right now.' }); }
}
export async function onRequestPost({ request, env }) {
  try {
    const b = await request.json().catch(() => ({}));
    const d = await ddb(env); if (!d) return json({ ok: false, error: 'The directory is not available right now' });
    if (!(await rateOk(env, request, 'dirp', 120, b.accessToken))) return json({ ok: false, error: 'Too many requests. Try again later.' });
    const u = await me(b.accessToken); if (!u) return json({ ok: false, auth: true, error: 'Sign in with Pi again' });
    if (b.a === 'mine') { const r = await d.prepare('SELECT * FROM dir WHERE uid = ?').bind(u.uid).first(); return json({ ok: true, item: r ? { ...pub(r), hidden: !!r.hidden } : null }); }
    if (b.a === 'off') { await d.prepare('DELETE FROM dir WHERE uid = ?').bind(u.uid).run(); return json({ ok: true }); }
    if (b.a === 'report') {
      const id = clip(b.id, 20), r = await d.prepare('SELECT uid FROM dir WHERE id = ?').bind(id).first(); if (!r) return json({ ok: false, error: 'Listing not found' });
      if (r.uid === u.uid) return json({ ok: false, error: 'You cannot report your own listing' });
      await d.prepare('INSERT OR IGNORE INTO dir_reports (id, uid, ts) VALUES (?, ?, ?)').bind(id, u.uid, Date.now()).run();
      const c = await d.prepare('SELECT COUNT(*) AS n FROM dir_reports WHERE id = ?').bind(id).first();
      if (c && c.n >= 50) await d.prepare('UPDATE dir SET hidden = 1 WHERE id = ?').bind(id).run();
      return json({ ok: true });
    }
    if (b.a === 'set') {
      const L = b.listing || {}, name = clip(L.name, 60), cat = CATS.includes(L.cat) ? L.cat : 'other', city = clip(L.city, 40), country = clip(L.country, 40), about = clip(L.about, 200);
      let target = clip(L.target, 60).replace(/^@/, ''); const logo = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(L.logo || '') && L.logo.length <= MAX_LOGO ? L.logo : '';
      if (!name || !city || !country) return json({ ok: false, error: 'Enter the business name, city and country' });
      // payments go to the owner: their own @username or a wallet address they chose
      if (!/^G[A-Z2-7]{55}$/.test(target) && target.toLowerCase() !== u.username.toLowerCase()) target = u.username;
      const cur = await d.prepare('SELECT id, hidden FROM dir WHERE uid = ?').bind(u.uid).first(), id = cur ? cur.id : newId();
      await d.prepare('INSERT INTO dir (id, uid, name, cat, city, country, about, target, logo, ts, hidden) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0) ON CONFLICT(uid) DO UPDATE SET name = excluded.name, cat = excluded.cat, city = excluded.city, country = excluded.country, about = excluded.about, target = excluded.target, logo = excluded.logo, ts = excluded.ts')
        .bind(id, u.uid, name, cat, city, country, about, target, logo, Date.now()).run();
      return json({ ok: true, id, hidden: !!(cur && cur.hidden) });
    }
    return json({ ok: false, error: 'Unknown request' });
  } catch (e) { return json({ ok: false, error: 'The directory is not available right now. Please try again.' }); }
}
