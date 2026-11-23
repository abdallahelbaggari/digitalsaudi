// GET /r/<id> → a clean page for a shared receipt or statement. Chat apps show the receipt image as the link preview,
// and opening the link shows the full receipt image with a Save button.
import { filesDb, ID_RE } from '../_lib/files.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function onRequestGet({ request, params, env }) {
  const id = String(params.id || ''), origin = new URL(request.url).origin;
  let f = null;
  if (ID_RE.test(id)) { try { const d = await filesDb(env); f = d && (await d.prepare('SELECT type, name, ts FROM files WHERE id = ?').bind(id).first()); if (f && f.ts < Date.now() - 30 * 864e5) f = null; } catch (e) {} }
  const img = f && /^image\//.test(f.type), pdf = f && f.type === 'application/pdf';
  const title = !f ? 'Link expired · DigitalSaudi' : img ? 'DigitalSaudi receipt' : pdf ? 'DigitalSaudi statement' : 'DigitalSaudi file';
  const file = f ? origin + '/f/' + id : '';
  const body = !f
    ? '<div class="box"><h1>This link has expired</h1><p>Shared receipts and statements are available for 30 days.</p></div>'
    : img
      ? '<img src="' + esc(file) + '" alt="DigitalSaudi receipt"><a class="btn" href="' + esc(file) + '?dl=1" download="' + esc(f.name) + '">Save image</a>'
      : '<div class="box"><div class="doc">PDF</div><h1>' + esc(title) + '</h1><p>' + esc(f.name) + '</p></div><a class="btn" href="' + esc(file) + '?dl=1" download="' + esc(f.name) + '">Download ' + (pdf ? 'PDF' : 'file') + '</a>';
  const html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="robots" content="noindex"><meta name="referrer" content="no-referrer"><title>' + esc(title) + '</title>' +
    '<meta property="og:title" content="' + esc(title) + '"><meta property="og:site_name" content="DigitalSaudi">' +
    (img ? '<meta property="og:image" content="' + esc(file) + '"><meta property="og:image:type" content="' + esc(f.type) + '"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="' + esc(file) + '">' : '') +
    '<link rel="icon" href="/favicon-32.png"><style>body{margin:0;background:#EEF3EF;font:16px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0F172A}' +
    'main{max-width:560px;margin:0 auto;padding:16px 16px 32px}img{display:block;width:100%;height:auto;border-radius:18px;box-shadow:0 10px 30px -12px rgba(6,78,59,.35);background:#fff}' +
    '.btn{display:block;margin-top:14px;padding:15px;border-radius:14px;background:#0B7A4B;color:#fff;text-align:center;font-weight:700;text-decoration:none}' +
    '.box{background:#fff;border-radius:18px;padding:28px 20px;text-align:center}.box h1{font-size:20px;margin:10px 0 4px}.box p{margin:0;color:#64748B;word-break:break-all}' +
    '.doc{display:inline-block;padding:14px 16px;border-radius:12px;background:#D1FAE5;color:#0B7A4B;font-weight:800}.top{display:flex;align-items:center;gap:10px;margin:4px 2px 14px;font-weight:800;font-size:18px}.back{display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:13px;background:#fff;color:#064E3B;font-size:28px;line-height:1;text-decoration:none;box-shadow:0 2px 8px rgba(6,78,59,.12);margin-right:4px}.btn.ghost{background:#fff;color:#064E3B;border:1.5px solid #CBD5E1}.top img{width:30px;height:30px;box-shadow:none;border-radius:8px}</style></head>' +
    '<body><main><div class="top"><a class="back" href="/#piWallet" aria-label="Back to DigitalSaudi">‹</a><img src="/icon-192.png" alt="">DigitalSaudi</div>' + body + '<a class="btn ghost" href="/#piWallet">‹ Back to DigitalSaudi</a></main></body></html>';
  return new Response(html, { status: f ? 200 : 404, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, max-age=300', 'X-Robots-Tag': 'noindex', 'Referrer-Policy': 'no-referrer' } });
}
