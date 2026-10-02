// DigitalSaudi — /pi-price  (Cloudflare Pages Function)
// Live Pi Network price (USD, SAR, NGN + 24h change + 7-day chart), cached 60 seconds.
// Sources, with automatic fallback:
//   1. OKX public market API (PI-USDT) — free, no key
//   2. CoinGecko — free; set COINGECKO_API_KEY (free "Demo" key) because CoinGecko
//      often blocks requests from cloud servers without a key
// If COINGECKO_API_KEY is set, CoinGecko is tried first.

const HEADERS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Content-Type': 'application/json' };
const json = (obj, maxAge) => new Response(JSON.stringify(obj), { status: 200, headers: { ...HEADERS, 'Cache-Control': 'public, max-age=' + (maxAge || 30) } });
const MEM = globalThis.__dsPiMem || (globalThis.__dsPiMem = {});
const UA = { 'Accept': 'application/json', 'User-Agent': 'DigitalSaudi/3.0 (Pi Network app)' };

async function cached(key, ttl, producer) {
  const now = Date.now(), m = MEM[key];
  if (m && now - m.t < ttl * 1000) return m.data;
  const req = new Request('https://cache.digitalsaudi.internal/pi/' + key);
  try { const hit = await caches.default.match(req); if (hit) { const data = await hit.json(); MEM[key] = { t: now, data }; return data; } } catch (e) {}
  try {
    const data = await producer();
    MEM[key] = { t: now, data };
    try { await caches.default.put(req, new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=' + ttl } })); } catch (e) {}
    return data;
  } catch (err) {
    if (m) return m.data;
    throw err;
  }
}

async function getJSON(url, headers) {
  const r = await fetch(url, { headers: { ...UA, ...(headers || {}) } });
  if (!r.ok) throw new Error(url.split('/')[2] + ' ' + r.status);
  return r.json();
}

// USD -> SAR / NGN rates (SAR is pegged at 3.75)
async function fxRates() {
  return cached('fx', 21600, async () => {
    const d = await getJSON('https://open.er-api.com/v6/latest/USD');
    return { SAR: (d.rates && d.rates.SAR) || 3.75, NGN: (d.rates && d.rates.NGN) || null };
  }).catch(() => ({ SAR: 3.75, NGN: null }));
}

async function fromOKX() {
  const d = await getJSON('https://www.okx.com/api/v5/market/ticker?instId=PI-USDT');
  const t = d && d.data && d.data[0];
  const last = t && parseFloat(t.last), open = t && parseFloat(t.open24h);
  if (!last) throw new Error('OKX no price');
  const fx = await fxRates();
  return { usd: last, sar: last * fx.SAR, ngn: fx.NGN ? last * fx.NGN : null, change24h: open ? (last - open) / open * 100 : 0, updated: new Date(+t.ts || Date.now()).toISOString(), source: 'OKX' };
}
async function sparkOKX() {
  const d = await getJSON('https://www.okx.com/api/v5/market/candles?instId=PI-USDT&bar=4H&limit=42');
  const rows = (d && d.data) || [];
  if (!rows.length) throw new Error('OKX no candles');
  return rows.map(r => +parseFloat(r[4]).toFixed(6)).reverse();   // close prices, oldest first
}

function cgHeaders(env) { return env.COINGECKO_API_KEY ? { 'x-cg-demo-api-key': env.COINGECKO_API_KEY } : {}; }
async function fromCoinGecko(env) {
  const d = await getJSON('https://api.coingecko.com/api/v3/simple/price?ids=pi-network&vs_currencies=usd,sar,ngn&include_24hr_change=true&include_last_updated_at=true', cgHeaders(env));
  const p = d['pi-network'];
  if (!p || !p.usd) throw new Error('CoinGecko no price');
  return { usd: p.usd, sar: p.sar || p.usd * 3.75, ngn: p.ngn || null, change24h: p.usd_24h_change || 0, updated: p.last_updated_at ? new Date(p.last_updated_at * 1000).toISOString() : new Date().toISOString(), source: 'CoinGecko' };
}
async function sparkCoinGecko(env) {
  const d = await getJSON('https://api.coingecko.com/api/v3/coins/pi-network/market_chart?vs_currency=usd&days=7', cgHeaders(env));
  const pts = (d.prices || []).map(p => p[1]);
  if (!pts.length) throw new Error('CoinGecko no chart');
  const step = Math.max(1, Math.floor(pts.length / 48));
  const out = pts.filter((_, i) => i % step === 0); out.push(pts[pts.length - 1]);
  return out.map(v => +v.toFixed(6));
}

async function firstOf(fns) {
  const errs = [];
  for (const fn of fns) { try { return await fn(); } catch (e) { errs.push(String(e && e.message || e)); } }
  throw new Error(errs.join(' | '));
}

export async function onRequestGet(context) {
  const env = context.env;
  const cgFirst = !!env.COINGECKO_API_KEY;
  try {
    const price = await cached('price', 60, () => firstOf(cgFirst ? [() => fromCoinGecko(env), fromOKX] : [fromOKX, () => fromCoinGecko(env)]));
    let spark = [];
    try { spark = await cached('spark', 1800, () => firstOf(cgFirst ? [() => sparkCoinGecko(env), sparkOKX] : [sparkOKX, () => sparkCoinGecko(env)])); } catch (e) {}
    return json({ ok: true, ...price, spark }, 30);
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err) }, 10);
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: HEADERS });
}
