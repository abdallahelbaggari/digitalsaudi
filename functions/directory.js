// DigitalSaudi — /directory  (Cloudflare Pages Function)
// Business directory & Pi merchants, stored in Cloudflare D1 (binding: DS_DB).
// New listings are saved as "pending" and only appear after approval in /admin.html.
//   GET  /directory?pi=1&cat=Café&city=Riyadh&id=12&limit=50   -> approved listings only
//   POST /directory  { name, category, city, description, ..., accessToken }  -> pending listing
// The Pi access token is verified with the Pi API so only real Pi users can submit.

const HEADERS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Content-Type': 'application/json' };
const json = (o, age) => new Response(JSON.stringify(o), { status: 200, headers: { ...HEADERS, 'Cache-Control': age ? 'public, max-age=' + age : 'no-store' } });
const CATS = ['Restaurant','Café','Hotel','Shop','Services','Freelancer','Startup','Health','Education','Transport','Travel agency','Other'];
const PUBLIC = 'id, name, category, city, description, address, phone, whatsapp, website, lat, lng, accepts_pi, pi_username, created_at';

async function ensureSchema(db) {
  await db.prepare(`CREATE TABLE IF NOT EXISTS listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, category TEXT, city TEXT, description TEXT, address TEXT,
    phone TEXT, whatsapp TEXT, website TEXT, lat REAL, lng REAL, accepts_pi INTEGER DEFAULT 0, pi_username TEXT,
    status TEXT DEFAULT 'pending', uid TEXT, username TEXT, created_at INTEGER, reviewed_at INTEGER, note TEXT)`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status, city, category)`).run();
}

function str(v, max) { return String(v == null ? '' : v).replace(/[<>]/g, '').trim().slice(0, max); }

async function verifyPi(token) {
  if (!token) return null;
  try {
    const r = await fetch('https://api.minepi.com/v2/me', { headers: { Authorization: 'Bearer ' + token } });
    if (!r.ok) return null;
    const u = await r.json();
    return u && u.uid ? u : null;
  } catch (e) { return null; }
}

export async function onRequestGet(context) {
  const db = context.env.DS_DB;
  if (!db) return json({ ok: false, error: 'DS_DB not bound', items: [] });
  try {
    await ensureSchema(db);
    const u = new URL(context.request.url);
    const where = ["status = 'approved'"], args = [];
    if (u.searchParams.get('id')) { where.push('id = ?'); args.push(parseInt(u.searchParams.get('id'), 10) || 0); }
    if (u.searchParams.get('pi') === '1') where.push('accepts_pi = 1');
    if (u.searchParams.get('cat')) { where.push('category = ?'); args.push(str(u.searchParams.get('cat'), 40)); }
    if (u.searchParams.get('city')) { where.push('city = ?'); args.push(str(u.searchParams.get('city'), 40)); }
    const limit = Math.min(200, parseInt(u.searchParams.get('limit'), 10) || 100);
    const r = await db.prepare(`SELECT ${PUBLIC} FROM listings WHERE ${where.join(' AND ')} ORDER BY accepts_pi DESC, reviewed_at DESC LIMIT ${limit}`).bind(...args).all();
    return json({ ok: true, items: r.results || [] }, 60);
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err), items: [] });
  }
}

export async function onRequestPost(context) {
  const db = context.env.DS_DB;
  if (!db) return json({ ok: false, error: 'Directory is not set up yet' });
  try {
    await ensureSchema(db);
    const b = await context.request.json();
    const user = await verifyPi(b.accessToken);
    if (!user) return json({ ok: false, error: 'Please sign in with Pi again and retry' });

    const name = str(b.name, 80), description = str(b.description, 500), category = CATS.includes(b.category) ? b.category : 'Other';
    if (name.length < 2 || description.length < 10) return json({ ok: false, error: 'Please add a name and a description of at least 10 characters' });
    let website = str(b.website, 200); if (website && !/^https?:\/\//i.test(website)) website = 'https://' + website;
    const lat = parseFloat(b.lat), lng = parseFloat(b.lng);

    const recent = await db.prepare(`SELECT COUNT(*) AS n FROM listings WHERE uid = ? AND created_at > ?`).bind(user.uid, Date.now() - 86400000).first();
    if (recent && recent.n >= 3) return json({ ok: false, error: 'You can submit up to 3 listings a day' });

    await db.prepare(`INSERT INTO listings (name, category, city, description, address, phone, whatsapp, website, lat, lng, accepts_pi, pi_username, status, uid, username, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?)`).bind(
      name, category, str(b.city, 40), description, str(b.address, 160), str(b.phone, 30), str(b.whatsapp, 30), website,
      isFinite(lat) ? lat : null, isFinite(lng) ? lng : null, b.accepts_pi ? 1 : 0, b.accepts_pi ? str(b.pi_username, 60).replace(/^@/, '') : '',
      user.uid, user.username || '', Date.now()).run();
    return json({ ok: true, status: 'pending' });
  } catch (err) {
    return json({ ok: false, error: 'Could not save — please try again' });
  }
}
export async function onRequestOptions() { return new Response(null, { status: 204, headers: HEADERS }); }
