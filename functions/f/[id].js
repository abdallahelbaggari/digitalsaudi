// GET /f/<id>        → the saved receipt image, statement PDF or export, shown in the page
// GET /f/<id>?dl=1   → the same file as a download (saved to the phone's Downloads; images also appear in the Gallery)
import { filesDb, getFile, ID_RE } from '../_lib/files.js';

export async function onRequestGet({ request, params, env }) {
  const id = String(params.id || '');
  if (!ID_RE.test(id)) return new Response('Not found', { status: 404 });
  const d = await filesDb(env).catch(() => null);
  const f = d && (await getFile(d, id).catch(() => null));
  if (!f) return new Response('This file has expired or does not exist.', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  const dl = new URL(request.url).searchParams.get('dl') === '1' || f.type === 'text/csv';
  const h = {
    'Content-Type': f.type,
    'Content-Length': String(f.bytes.length),
    'Content-Disposition': (dl ? 'attachment' : 'inline') + '; filename="' + f.name + '"',
    'Cache-Control': 'private, max-age=86400',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'X-Robots-Tag': 'noindex'
  };
  // PDF viewers need to run; everything else is shown with scripts switched off.
  if (f.type !== 'application/pdf') h['Content-Security-Policy'] = "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; sandbox";
  return new Response(f.bytes, { headers: h });
}
