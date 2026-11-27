// /transfer — in-app transfers between DigitalSaudi users.
//   GET  ?a=check-setup                     → setup self-test (yes/no only), shown on /setup.html
//   GET  ?a=status                          → { enabled, max, fee, payments } (are transfers / payments switched on?)
//   POST {a:'payout', paymentId}            → pays the recipient for a completed transfer (idempotent; also run by /complete)
//   POST {a:'list', accessToken}            → the signed-in user's sent and received transfers
//   POST {a:'check', accessToken, to, amt}  → would this transfer be accepted? (limits, holds, first-time payee) before the Pi pop-up opens
import { keypairFromSeed } from './_lib/stellar.js';
import { H, json, me, db, payout, pub, enabled, maxTransfer, FEE, isTest, limits, rateOk, checkTransferPayment, checkLimits, userByName, paidBefore, USER_RE, DBB, setup, usernames, walletSeed, seedName, walletReady } from './_lib/transfers.js';
export async function onRequestGet({ request, env }) {
  const q = new URL(request.url).searchParams;
  if (q.get('a') === 'check-setup') {
    // Setup self-test for the developer: yes/no answers only, never any secret or balance.
    if (!(await rateOk(env, request, 'setup', 30))) return json({ ok: false, error: 'Too many checks. Wait a few minutes.' });
    const s = setup(env), net = isTest(request) ? 'Pi Testnet' : 'Pi Mainnet', horizon = isTest(request) ? 'https://api.testnet.minepi.com' : 'https://api.mainnet.minepi.com', r = { net, ...s };
    r.seed_raw_present = !!String(env.APP_WALLET_SEED || '').trim() || !!seedName(env);
    r.seed_variable = seedName(env);
    r.variable_names = Object.keys(env).filter((k) => typeof env[k] === 'string' && /^[A-Z0-9_]{2,64}$/i.test(k)).sort();
    r.seed_looks_like_address = /^G[A-Z2-7]{55}$/.test(String(env.APP_WALLET_SEED || '').trim());
    if (s.database) { try { await (await db(env)).prepare('SELECT 1 AS x').first(); r.database_works = true; } catch (e) { r.database_works = false; } }
    if (s.pi_api_key) { try { const t = await fetch('https://api.minepi.com/v2/payments/incomplete_server_payments', { headers: { Authorization: 'Key ' + String(env.PI_API_KEY).trim() } }); r.pi_api_key_accepted = t.ok; r.pi_api_key_status = t.status; } catch (e) { r.pi_api_key_accepted = false; } }
    if (s.app_wallet_seed) { try { const kp = await keypairFromSeed(walletSeed(env)); const h = await fetch(horizon + '/accounts/' + kp.address); r.app_wallet_found = h.ok; r.app_wallet_address = kp.address; } catch (e) { r.app_wallet_found = false; } }
    r.ready = enabled(env) && r.pi_api_key_accepted !== false && r.app_wallet_found !== false;
    return json({ ok: true, check: r });
  }
  const live = enabled(env) && (await walletReady(env, request)).ok;
  return json({ ok: true, payments: setup(env).pi_api_key, setup: setup(env), enabled: live, addresses: live, usernames: live && usernames(env), max: maxTransfer(env), daily: limits(env).day, fee: FEE, net: isTest(request) ? 'Pi Testnet' : 'Pi Mainnet' });
}
export async function onRequestPost({ request, env }) {
  const b = await request.json().catch(() => ({}));
  if (b.a === 'payout') {
    if (!(await rateOk(env, request, 'payout', 900))) return json({ ok: false, retry: true, error: 'Busy, trying again shortly' });
    return json(await payout(env, request, String(b.paymentId || '')));
  }
  if (b.a === 'check') {
    if (!(await rateOk(env, request, 'check', 240, b.accessToken))) return json({ ok: false, error: 'Too many attempts. Please wait a while and try again.' });
    if (!enabled(env)) return json({ ok: false, error: 'Sending Pi is not available right now' });
    const u = await me(b.accessToken); if (!u) return json({ ok: false, error: 'Sign in with Pi first' });
    const amt = Math.round(Number(b.amt) * 1e7) / 1e7, addr = String(b.addr || '').trim().toUpperCase(), to = String(b.to || '').replace(/^@/, '');
    if (!(amt > 0) || (!addr && !USER_RE.test(to))) return json({ ok: false, error: 'Check the recipient and amount' });
    const pay = { identifier: '', user_uid: u.uid, network: isTest(request) ? 'Pi Testnet' : 'Pi Network', amount: Math.round((amt + FEE) * 1e7) / 1e7, metadata: addr ? { type: 'transfer', addr, amt } : { type: 'transfer', to, amt } };
    const why = (await checkTransferPayment(env, pay, request)) || (await checkLimits(env, pay));
    if (why) return json({ ok: false, error: why });
    if (addr) return json({ ok: true, addr, first: !(await paidBefore(env, u.uid, '', addr)) });
    const r = await userByName(await db(env), to);
    return json({ ok: true, to: r.username, first: !(await paidBefore(env, u.uid, r.uid)) });
  }
  if (b.a === 'list') {
    if (!(await rateOk(env, request, 'list', 1500, b.accessToken))) return json({ ok: false, error: 'Busy' });
    if (!DBB(env)) return json({ ok: false, setup: true });
    const u = await me(b.accessToken); if (!u) return json({ ok: false, error: 'Sign in with Pi first' });
    const d = await db(env), net = { name: isTest(request) ? 'Pi Testnet' : 'Pi Mainnet' };
    const r = await d.prepare('SELECT * FROM transfers WHERE from_uid = ? OR to_uid = ? ORDER BY ts DESC LIMIT 60').bind(u.uid, u.uid).all();
    return json({ ok: true, me: u.username, items: (r.results || []).map((x) => Object.assign(pub(x, net), { dir: x.to_uid === u.uid ? 'in' : 'out' })) });
  }
  return json({ ok: false, error: 'Unknown action' });
}
export async function onRequestOptions() { return new Response(null, { status: 204, headers: H }); }
