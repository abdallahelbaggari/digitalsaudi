// /fx — exchange rates against the Saudi riyal (SAR), refreshed every 6 hours and cached.
// Source: open.er-api.com (free, no key). If the source is down, the last good rates are served (marked stale).
const H = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
const json = (o, age) => new Response(JSON.stringify(o), { status: 200, headers: { ...H, 'Cache-Control': 'public, max-age=' + age } });
export async function onRequestGet() {
  const ck = new Request('https://cache.digitalsaudi.internal/fx/v1'), last = new Request('https://cache.digitalsaudi.internal/fx/last');
  try { const hit = await caches.default.match(ck); if (hit) return hit; } catch (e) {}
  try {
    const r = await fetch('https://open.er-api.com/v6/latest/SAR', { cf: { cacheTtl: 21600, cacheEverything: true } });
    const d = await r.json();
    if (!d || d.result !== 'success' || !d.rates) throw new Error('bad');
    const body = { ok: true, base: 'SAR', rates: d.rates, updated: d.time_last_update_utc || new Date().toUTCString() };
    const res = json(body, 21600);
    try { await caches.default.put(ck, res.clone()); await caches.default.put(last, new Response(JSON.stringify(body), { headers: { 'Cache-Control': 'public, max-age=2592000' } })); } catch (e) {}
    return res;
  } catch (e) {
    try { const h = await caches.default.match(last); if (h) { const b = await h.json(); return json({ ...b, stale: true }, 600); } } catch (x) {}
    return json({ ok: false }, 60);
  }
}
