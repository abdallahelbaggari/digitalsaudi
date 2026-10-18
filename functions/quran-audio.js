// /quran-audio?s=1&a=3 — one verse of Mishary Alafasy's recitation, served through DigitalSaudi.
// Backup for phones or networks that can't reach the public Quran audio servers directly.
// Cloudflare keeps a copy close to the listener for 30 days, so repeat plays start instantly.
// Source: everyayah.com (Alafasy 128 kbps).

const H = { 'Access-Control-Allow-Origin': '*' };

export async function onRequestGet({ request }) {
  const u = new URL(request.url);
  const s = parseInt(u.searchParams.get('s'), 10), a = parseInt(u.searchParams.get('a'), 10);
  if (!(s >= 1 && s <= 114) || !(a >= 1 && a <= 286)) return new Response('bad verse', { status: 400, headers: H });
  const pad = x => ('00' + x).slice(-3);
  const urls = ['https://everyayah.com/data/Alafasy_128kbps/' + pad(s) + pad(a) + '.mp3'];
  const range = request.headers.get('Range');
  for (const src of urls) {
    try {
      const r = await fetch(src, { headers: range ? { Range: range } : {}, cf: { cacheTtl: 2592000, cacheEverything: true } });
      if (r.ok || r.status === 206) {
        const h = new Headers(r.headers);
        h.set('Access-Control-Allow-Origin', '*');
        h.set('Cache-Control', 'public, max-age=2592000');
        h.set('Content-Type', 'audio/mpeg');
        return new Response(r.body, { status: r.status, headers: h });
      }
    } catch (e) {}
  }
  return new Response('audio unavailable', { status: 502, headers: H });
}
