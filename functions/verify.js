// /verify — checks a Pi payment on the Pi blockchain (Pi Horizon). Read-only: it never moves Pi.
//   ?tx=<64-hex hash>&net=main|test                         → that transaction and its payments
//   ?to=<G… address>&ref=HM-XXXXXX&amt=<π>&net=main|test    → finds a payment to that address with that memo
const H = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
const out = (o, age) => new Response(JSON.stringify(o), { status: 200, headers: { ...H, 'Cache-Control': 'public, max-age=' + (age || 0) } });
const HORIZON = { main: 'https://api.mainnet.minepi.com', test: 'https://api.testnet.minepi.com' };
const isHash = (x) => /^[a-f0-9]{64}$/i.test(x || '');
const isAddr = (x) => /^G[A-Z2-7]{55}$/.test(x || '');
const isRef = (x) => /^(HM|DS)-[A-Z0-9]{6}$/.test(x || '');

async function hz(base, path) {
  const r = await fetch(base + path, { headers: { Accept: 'application/json' }, cf: { cacheTtl: 5 } });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error('horizon ' + r.status);
  return r.json();
}
function pays(ops) {
  return (ops || []).filter((o) => (o.type === 'payment' && o.asset_type === 'native') || o.type === 'create_account')
    .map((o) => ({ from: o.from || o.funder || o.source_account, to: o.to || o.account, amount: o.amount || o.starting_balance }));
}

export async function onRequestGet({ request }) {
  const u = new URL(request.url), net = u.searchParams.get('net') === 'test' ? 'test' : 'main', base = HORIZON[net];
  try {
    const tx = u.searchParams.get('tx');
    if (tx) {
      if (!isHash(tx)) return out({ ok: false, error: 'That does not look like a Pi transaction ID.' });
      const t = await hz(base, '/transactions/' + tx.toLowerCase());
      if (!t) return out({ ok: false, error: 'This transaction was not found on the Pi ' + (net === 'main' ? 'Mainnet' : 'Testnet') + ' blockchain.' });
      const ops = await hz(base, '/transactions/' + tx.toLowerCase() + '/operations?limit=20');
      return out({ ok: true, net, tx: { hash: t.hash, ledger: t.ledger, at: t.created_at, memo: t.memo || '', ok: t.successful !== false, payments: pays(ops && ops._embedded && ops._embedded.records) } }, 60);
    }
    const to = u.searchParams.get('to'), ref = (u.searchParams.get('ref') || '').toUpperCase(), amt = parseFloat(u.searchParams.get('amt'));
    if (!isAddr(to) || !isRef(ref) || !(amt > 0)) return out({ ok: false, error: 'Missing or invalid details.' });
    const list = await hz(base, '/accounts/' + to + '/payments?order=desc&limit=40&join=transactions');
    const recs = (list && list._embedded && list._embedded.records) || [];
    for (const p of recs) {
      const pp = pays([p])[0]; if (!pp || pp.to !== to || parseFloat(pp.amount) + 1e-7 < amt) continue;
      let memo = p.transaction && p.transaction.memo;
      if (memo === undefined) { const t = await hz(base, '/transactions/' + p.transaction_hash); memo = t && t.memo; }
      if (String(memo || '').trim().toUpperCase() === ref) {
        return out({ ok: true, found: true, net, tx: { hash: p.transaction_hash, at: p.created_at, memo: ref, from: pp.from, to: pp.to, amount: pp.amount } }, 30);
      }
    }
    return out({ ok: true, found: false, net, account: !!list });
  } catch (e) {
    return out({ ok: false, error: 'The Pi blockchain could not be reached. Try again in a moment.' });
  }
}
