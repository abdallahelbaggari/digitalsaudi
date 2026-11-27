// /hadith-audio?n=1 — the Arabic reading of one hadith of the Forty Hadith of an-Nawawi (1–42),
// streamed through the app (works in the Pi Browser) and cached close to the listener for 30 days.
// Recordings: Internet Archive item "40Hadith_Nawawi" (one file per hadith).
const ITEM = '40Hadith_Nawawi';
const H = { 'Access-Control-Allow-Origin': '*' };

async function fileFor(n) {
  const r = await fetch('https://archive.org/metadata/' + ITEM + '/files', { cf: { cacheTtl: 86400, cacheEverything: true } });
  if (!r.ok) return null;
  const d = await r.json(), list = (d && (d.result || d.files)) || [];
  const re = /^(\d{2})\.\s*Hadith\s+(\d{1,2})\s*-.*\.mp3$/i;
  const hits = list.map((f) => f && f.name).filter((nm) => { const m = re.exec(nm || ''); return m && +m[2] === n; }).sort();
  return hits[0] || null;
}

export async function onRequestGet({ request }) {
  const u = new URL(request.url), n = parseInt(u.searchParams.get('n'), 10);
  if (!(n >= 1 && n <= 42)) return new Response('bad request', { status: 400, headers: H });
  try {
    const name = await fileFor(n);
    if (!name) return new Response('audio unavailable', { status: 404, headers: H });
    const range = request.headers.get('Range');
    const res = await fetch('https://archive.org/download/' + ITEM + '/' + encodeURIComponent(name), { headers: range ? { Range: range } : {}, redirect: 'follow', cf: { cacheTtl: 2592000, cacheEverything: true } });
    if (res.ok || res.status === 206) {
      const h = new Headers();
      ['Content-Length', 'Content-Range', 'Accept-Ranges', 'ETag', 'Last-Modified'].forEach((k) => { const v = res.headers.get(k); if (v) h.set(k, v); });
      if (!h.get('Accept-Ranges')) h.set('Accept-Ranges', 'bytes');
      h.set('Access-Control-Allow-Origin', '*'); h.set('Cache-Control', 'public, max-age=2592000'); h.set('Content-Type', 'audio/mpeg');
      return new Response(res.body, { status: res.status, headers: h });
    }
  } catch (e) {}
  return new Response('audio unavailable', { status: 502, headers: H });
}
