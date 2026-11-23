// /quran-audio?r=alafasy&s=1&a=3 — one recited verse, served through the app as a backup when a phone
// can't reach the public audio server directly. Cached close to the listener for 30 days.
// Source: everyayah.com recitation files.
const H = { 'Access-Control-Allow-Origin': '*' };
const RECITERS = {
  alafasy: 'Alafasy_128kbps', sudais: 'Abdurrahmaan_As-Sudais_192kbps', shuraym: 'Saood_ash-Shuraym_128kbps',
  husary: 'Husary_64kbps', minshawi: 'Minshawy_Murattal_128kbps', maher: 'Maher_AlMuaiqly_64kbps', basit: 'Abdul_Basit_Murattal_64kbps'
};
export async function onRequestGet({ request }) {
  const u = new URL(request.url);
  const s = parseInt(u.searchParams.get('s'), 10), a = parseInt(u.searchParams.get('a'), 10), r = RECITERS[u.searchParams.get('r') || 'alafasy'];
  if (!r || !(s >= 1 && s <= 114) || !(a >= 1 && a <= 286)) return new Response('bad request', { status: 400, headers: H });
  const pad = (x) => ('00' + x).slice(-3);
  const range = request.headers.get('Range');
  try {
    const res = await fetch('https://everyayah.com/data/' + r + '/' + pad(s) + pad(a) + '.mp3', { headers: range ? { Range: range } : {}, cf: { cacheTtl: 2592000, cacheEverything: true } });
    if (res.ok || res.status === 206) {
      const h = new Headers(res.headers);
      h.set('Access-Control-Allow-Origin', '*'); h.set('Cache-Control', 'public, max-age=2592000'); h.set('Content-Type', 'audio/mpeg');
      return new Response(res.body, { status: res.status, headers: h });
    }
  } catch (e) {}
  return new Response('audio unavailable', { status: 502, headers: H });
}
