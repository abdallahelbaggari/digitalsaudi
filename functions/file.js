// POST /file?type=image/jpeg&name=DigitalSaudi-receipt  (body: the file bytes)
// Keeps a copy of a receipt, statement or export for 30 days and returns its private links:
//   file: /f/<id>   (the file itself; add ?dl=1 to download)   page: /r/<id>   (a page showing it, for sharing)
import { json, H, rateOk } from './_lib/transfers.js';
import { filesDb, putFile, cleanup, cleanName, TYPES, MAX_BYTES } from './_lib/files.js';

export async function onRequestOptions() { return new Response(null, { status: 204, headers: H }); }
export async function onRequestGet({ env }) { return json({ ok: true, available: !!(env.DS_DB || env.DB) }); }

export async function onRequestPost({ request, env }) {
  try {
    const u = new URL(request.url), type = String(u.searchParams.get('type') || '').toLowerCase();
    if (!TYPES[type]) return json({ ok: false, error: 'This kind of file cannot be saved' });
    const len = Number(request.headers.get('content-length') || 0);
    if (len > MAX_BYTES) return json({ ok: false, error: 'This file is too large' });
    const d = await filesDb(env);
    if (!d) return json({ ok: false, unavailable: true, error: 'Saving is not available right now' });
    if (!(await rateOk(env, request, 'file', 120))) return json({ ok: false, error: 'Too many files at once. Try again in a few minutes.' });
    const bytes = new Uint8Array(await request.arrayBuffer());
    if (!bytes.length || bytes.length > MAX_BYTES) return json({ ok: false, error: 'This file is empty or too large' });
    const sig = { 'image/jpeg': [0xff, 0xd8], 'image/png': [0x89, 0x50], 'application/pdf': [0x25, 0x50] }[type];
    if (sig && (bytes[0] !== sig[0] || bytes[1] !== sig[1])) return json({ ok: false, error: 'This file is not valid' });
    const name = cleanName(u.searchParams.get('name'), type);
    const id = await putFile(d, type, name, bytes);
    if (Math.random() < 0.05) cleanup(d).catch(() => {});
    return json({ ok: true, id, name, file: '/f/' + id, page: '/r/' + id });
  } catch (e) {
    return json({ ok: false, error: 'Could not save the file. Please try again.' });
  }
}
