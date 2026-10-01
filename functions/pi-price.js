// DigitalSaudi — /pi-price  (Cloudflare Pages Function)
// Live Pi Network price from CoinGecko (USD, SAR, NGN + 24h change + 7-day chart).
// Cached 60 seconds so every user shares one upstream call. Optional: set COINGECKO_API_KEY
// (a free CoinGecko "Demo" key) for more reliable rate limits.

const COIN = 'pi-network';
const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json'
};
const json = (obj, maxAge) => new Response(JSON.stringify(obj), { status: 200, headers: { ...HEADERS, 'Cache-Control': 'public, max-age=' + (maxAge || 30) } });
const MEM = globalThis.__dsPiMem || (globalThis.__dsPiMem = {});

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

async function cg(path, env) {
  const headers = { 'Accept': 'application/json' };
  if (env.COINGECKO_API_KEY) headers['x-cg-demo-api-key'] = env.COINGECKO_API_KEY;
  const res = await fetch('https://api.coingecko.com/api/v3' + path, { headers });
  if (!res.ok) throw new Error('CoinGecko ' + res.status);
  return res.json();
}

export async function onRequestGet(context) {
  const env = context.env;
  try {
    const price = await cached('price', 60, async () => {
      const d = await cg('/simple/price?ids=' + COIN + '&vs_currencies=usd,sar,ngn&include_24hr_change=true&include_last_updated_at=true', env);
      const p = d[COIN];
      if (!p || !p.usd) throw new Error('Pi not found on CoinGecko');
      return { usd: p.usd, sar: p.sar || p.usd * 3.75, ngn: p.ngn || null, change24h: p.usd_24h_change || 0, updated: p.last_updated_at ? new Date(p.last_updated_at * 1000).toISOString() : new Date().toISOString() };
    });
    let spark = [];
    try {
      spark = await cached('spark', 1800, async () => {
        const d = await cg('/coins/' + COIN + '/market_chart?vs_currency=usd&days=7', env);
        const pts = (d.prices || []).map(p => p[1]);
        const step = Math.max(1, Math.floor(pts.length / 48));
        const out = pts.filter((_, i) => i % step === 0);
        if (pts.length) out.push(pts[pts.length - 1]);
        return out.map(v => +v.toFixed(6));
      });
    } catch (e) {}
    return json({ ok: true, ...price, spark, source: 'CoinGecko' }, 30);
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err) }, 10);
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: HEADERS });
}
