// /poster-file — lets phones save a poster as a real file.
// Pi Browser (and many in-app browsers) ignore "download" links made in the page, so the app
// uploads the finished poster here and opens a normal web address that the phone's own browser
// can download. Files are kept for 24 hours only, then deleted automatically.
//
//   POST /poster-file   body = the PNG or PDF bytes, header Content-Type: image/png | application/pdf
//                       → { ok:true, url:"/poster-file?id=…&name=…" }
//   GET  /poster-file?id=…&name=accept-pi-cafe.png  → the file, as a download

const TYPES = { 'image/png': 'png', 'application/pdf': 'pdf' };
const MAX_BYTES = 12 * 1024 * 1024;         // 12 MB is far above a real poster
const PER_IP_PER_DAY = 40;
const TTL = 24 * 3600;

const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'Content-Type': 'application/json' } });

function safeName(n, ext) {
  let s = String(n || 'accept-pi-poster').toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
  if (!s) s = 'accept-pi-poster';
  if (!s.endsWith('.' + ext)) s = s.replace(/\.(png|pdf)$/, '') + '.' + ext;
  return s;
}

export async function onRequestPost({ request, env }) {
  if (!env.DS_KV) return json({ ok: false, error: 'storage not set up' }, 503);
  const type = (request.headers.get('Content-Type') || '').split(';')[0].trim();
  const ext = TYPES[type];
  if (!ext) return json({ ok: false, error: 'only PNG or PDF' }, 415);
  const len = +request.headers.get('Content-Length') || 0;
  if (len > MAX_BYTES) return json({ ok: false, error: 'file too large' }, 413);

  const ip = request.headers.get('CF-Connecting-IP') || 'x';
  const day = new Date().toISOString().slice(0, 10);
  const ck = 'posterN:' + day + ':' + ip;
  const n = parseInt(await env.DS_KV.get(ck) || '0', 10);
  if (n >= PER_IP_PER_DAY) return json({ ok: false, error: 'daily limit reached, try tomorrow' }, 429);

  const buf = await request.arrayBuffer();
  if (!buf.byteLength || buf.byteLength > MAX_BYTES) return json({ ok: false, error: 'empty or too large' }, 413);
  const b = new Uint8Array(buf, 0, 5);
  const isPng = b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4E && b[3] === 0x47;
  const isPdf = b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46;   // %PDF
  if ((ext === 'png' && !isPng) || (ext === 'pdf' && !isPdf)) return json({ ok: false, error: 'not a valid file' }, 415);

  const id = crypto.randomUUID().replace(/-/g, '');
  await env.DS_KV.put('poster:' + id, buf, { expirationTtl: TTL, metadata: { type } });
  await env.DS_KV.put(ck, String(n + 1), { expirationTtl: 90000 });
  const name = safeName(new URL(request.url).searchParams.get('name'), ext);
  return json({ ok: true, url: '/poster-file?id=' + id + '&name=' + encodeURIComponent(name) });
}

export async function onRequestGet({ request, env }) {
  const u = new URL(request.url);
  const id = u.searchParams.get('id') || '';
  if (!/^[a-f0-9]{32}$/.test(id) || !env.DS_KV) return new Response('Not found', { status: 404 });
  const r = await env.DS_KV.getWithMetadata('poster:' + id, 'arrayBuffer');
  if (!r || !r.value) return new Response('This poster link has expired. Make the poster again in DigitalSaudi.', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  const type = (r.metadata && r.metadata.type) || 'image/png';
  const name = safeName(u.searchParams.get('name'), TYPES[type] || 'png');
  return new Response(r.value, {
    headers: {
      'Content-Type': type,
      'Content-Disposition': 'attachment; filename="' + name + '"',
      'Cache-Control': 'private, max-age=3600',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}
