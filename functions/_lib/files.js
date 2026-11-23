// Receipts, statements and exports that the user chooses to save or share.
// The Pi Browser cannot save files made inside the page or share them as files, so DigitalSaudi keeps a copy for
// 30 days at a private, unguessable link: saving downloads it from that link, and sharing sends the link,
// which opens (and previews in chat apps) as the full receipt image. Stored in the app's D1 database.
import { DBB } from './transfers.js';

export const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'application/pdf': 'pdf', 'text/csv': 'csv' };
export const MAX_BYTES = 12 * 1024 * 1024;
export const KEEP_DAYS = 30;
const CHUNK = 1500000; // D1 keeps each value under 2 MB, so larger files are stored in parts
export const ID_RE = /^[A-Za-z0-9_-]{22}$/;

export async function filesDb(env) {
  const d = DBB(env); if (!d) return null;
  await d.exec('CREATE TABLE IF NOT EXISTS files (id TEXT PRIMARY KEY, type TEXT, name TEXT, size INTEGER, parts INTEGER, ts INTEGER)');
  await d.exec('CREATE TABLE IF NOT EXISTS file_parts (id TEXT, n INTEGER, data BLOB, PRIMARY KEY (id, n))');
  return d;
}
export function newId() {
  const b = crypto.getRandomValues(new Uint8Array(16));
  return btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
export function cleanName(name, type) {
  const ext = TYPES[type];
  let n = String(name || 'DigitalSaudi').replace(/\.[A-Za-z0-9]{2,4}$/, '').replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^[-.]+|[-.]+$/g, '').slice(0, 70) || 'DigitalSaudi';
  return n + '.' + ext;
}
export async function putFile(d, type, name, bytes) {
  const id = newId(), parts = Math.max(1, Math.ceil(bytes.length / CHUNK)), st = [];
  for (let i = 0; i < parts; i++) st.push(d.prepare('INSERT INTO file_parts (id, n, data) VALUES (?, ?, ?)').bind(id, i, bytes.slice(i * CHUNK, (i + 1) * CHUNK)));
  st.push(d.prepare('INSERT INTO files (id, type, name, size, parts, ts) VALUES (?, ?, ?, ?, ?, ?)').bind(id, type, name, bytes.length, parts, Date.now()));
  await d.batch(st);
  return id;
}
export async function getFile(d, id) {
  const f = await d.prepare('SELECT id, type, name, size, parts, ts FROM files WHERE id = ?').bind(id).first();
  if (!f || f.ts < Date.now() - KEEP_DAYS * 864e5) return null;
  const rs = await d.prepare('SELECT data FROM file_parts WHERE id = ? ORDER BY n').bind(id).all();
  const out = new Uint8Array(f.size); let o = 0;
  for (const r of rs.results || []) { const b = r.data instanceof ArrayBuffer ? new Uint8Array(r.data) : new Uint8Array(r.data); out.set(b, o); o += b.length; }
  if (o !== f.size) return null;
  f.bytes = out; return f;
}
export async function cleanup(d) {
  const old = Date.now() - KEEP_DAYS * 864e5;
  await d.batch([d.prepare('DELETE FROM file_parts WHERE id IN (SELECT id FROM files WHERE ts < ?)').bind(old), d.prepare('DELETE FROM files WHERE ts < ?').bind(old)]);
}
