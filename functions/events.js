// DigitalSaudi — /events  (Cloudflare Pages Function)
// Events you add in /admin.html (stored in D1, binding DS_DB). National days and
// Islamic dates are added automatically inside the app.
//   GET /events  -> upcoming published events

const HEADERS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Content-Type': 'application/json' };
const json = (o, age) => new Response(JSON.stringify(o), { status: 200, headers: { ...HEADERS, 'Cache-Control': 'public, max-age=' + (age || 120) } });

async function ensureEvents(db) {
  await db.prepare(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, city TEXT, category TEXT, start TEXT, "end" TEXT,
    venue TEXT, description TEXT, url TEXT, image TEXT, status TEXT DEFAULT 'published', created_at INTEGER)`).run();
}

export async function onRequestGet(context) {
  const db = context.env.DS_DB;
  if (!db) return json({ ok: true, events: [], note: 'DS_DB not bound' }, 60);
  try {
    await ensureEvents(db);
    const since = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const r = await db.prepare(`SELECT id, title, city, category, start, "end" AS "end", venue, description, url, image FROM events
      WHERE status = 'published' AND (COALESCE(NULLIF("end", ''), start) >= ?) ORDER BY start ASC LIMIT 300`).bind(since).all();
    const events = (r.results || []).map(e => ({ ...e, id: 'e' + e.id, end: e.end || '' }));
    return json({ ok: true, events });
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err), events: [] }, 10);
  }
}
export async function onRequestOptions() { return new Response(null, { status: 204, headers: HEADERS }); }
