/* DIGITALSAUDI · /recover — finishes a payment that was interrupted (app closed, connection lost), for Pi's onIncompletePayment.
   Signed on the blockchain → complete it (and deliver a transfer). Never signed and older than 2 minutes → cancel it. */
import { payout, piApi, rateOk, piKey } from './_lib/transfers.js';
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
const out = (o) => new Response(JSON.stringify(o), { status: 200, headers: cors });
export async function onRequestPost({ request, env }) {
  const b = await request.json().catch(() => ({}));
  const pid = String(b.paymentId || '');
  if (!/^[A-Za-z0-9_-]{6,80}$/.test(pid)) return out({ ok: false, error: 'Invalid payment id' });
  if (!piKey(env)) return out({ ok: false, error: 'Payments are not switched on yet' });
  if (!(await rateOk(env, request, 'recover', 60))) return out({ ok: false, error: 'Busy' });
  try {
    const g = await piApi(env, '/payments/' + encodeURIComponent(pid));
    if (!g.ok || !g.d) return out({ ok: false, error: 'Payment not found' });
    const p = g.d, st = p.status || {}, tx = p.transaction && p.transaction.txid, isTransfer = p.metadata && p.metadata.type === 'transfer';
    if (st.cancelled || st.user_cancelled) return out({ ok: true, action: 'none' });
    if (!st.developer_completed && tx) {
      const r = await piApi(env, '/payments/' + encodeURIComponent(pid) + '/complete', 'POST', { txid: tx });
      if (!r.ok) return out({ ok: false, action: 'complete', error: 'Pi could not complete it yet' });
    }
    if (st.developer_completed || tx) return out({ ok: true, action: 'complete', transfer: isTransfer ? await payout(env, request, pid) : null });
    const created = Date.parse(p.created_at || '') || 0;
    if (created && Date.now() - created < 120000) return out({ ok: false, action: 'wait' });
    await piApi(env, '/payments/' + encodeURIComponent(pid) + '/cancel', 'POST', {});
    return out({ ok: true, action: 'cancel' });
  } catch (e) { return out({ ok: false, error: 'Try again shortly' }); }
}
export async function onRequestOptions() { return new Response(null, { status: 204, headers: cors }); }
