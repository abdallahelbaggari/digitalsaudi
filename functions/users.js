// /users — lets DigitalSaudi users receive in-app transfers.
//   POST {accessToken}  → registers the signed-in Pi user (checked with Pi), so others can send to their @username
//   GET  ?u=<username>  → { ok, exists } (never returns ids)
import { H, json, me, db, userByName, USER_RE, rateOk, DBB, setup } from './_lib/transfers.js';
export async function onRequestPost({ request, env }) {
  if (!DBB(env)) return json({ ok: false, setup: true });
  if (!(await rateOk(env, request, 'reg', 30))) return json({ ok: false, error: 'Busy' });
  const b = await request.json().catch(() => ({}));
  const u = await me(b.accessToken); if (!u) return json({ ok: false, error: 'Sign in with Pi first' });
  const d = await db(env);
  await d.prepare('DELETE FROM users WHERE username = ? COLLATE NOCASE AND uid <> ?').bind(u.username, u.uid).run();
  await d.prepare('INSERT INTO users (uid, username, ts) VALUES (?, ?, ?) ON CONFLICT(uid) DO UPDATE SET username = excluded.username, ts = excluded.ts').bind(u.uid, u.username, Date.now()).run();
  return json({ ok: true, username: u.username });
}
export async function onRequestGet({ request, env }) {
  if (!DBB(env)) return json({ ok: false, setup: true });
  const name = (new URL(request.url).searchParams.get('u') || '').replace(/^@/, '');
  if (!USER_RE.test(name)) return json({ ok: true, exists: false });
  if (!(await rateOk(env, request, 'lookup', 150))) return json({ ok: false, error: 'Too many lookups. Please wait a while.' });
  const r = await userByName(await db(env), name);
  return json({ ok: true, exists: !!r, username: r ? r.username : '' });
}
export async function onRequestOptions() { return new Response(null, { status: 204, headers: H }); }
