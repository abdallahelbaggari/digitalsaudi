// /match — live minute, goals, cards, substitutions and line-ups for one match.
// Data: API-Football (api-sports.io). The key stays secret in Cloudflare as API_FOOTBALL_KEY.
// The free API-Football plan allows 100 requests a day, so everything is cached and shared by
// all users: the day's fixture list for 3 hours, a live match for 60 seconds, a finished match
// for a day. Without the key the app simply hides this section.
//
//   /match?date=2026-10-18&home=Real%20Madrid%20CF&away=Sevilla%20FC&kick=2026-10-18T19:00:00Z

const API = 'https://v3.football.api-sports.io';
const H = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' };
const out = (o, age) => new Response(JSON.stringify(o), { status: 200, headers: { ...H, 'Cache-Control': 'public, max-age=' + (age || 30) } });
const LIVE = ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'LIVE', 'INT', 'SUSP'];
const DONE = ['FT', 'AET', 'PEN', 'AWD', 'WO', 'CANC', 'ABD', 'PST'];

const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/\b(fc|cf|ac|sc|afc|cd|ud|sd|rc|rcd|ss|ssc|as|sl|sv|vfb|vfl|tsg|1\.|club|de|calcio|futbol|football|the)\b/g, ' ')
  .replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
// strict: every word of the shorter name appears in the longer one ("Sevilla" ~ "Sevilla FC")
function same(a, b) {
  a = norm(a); b = norm(b);
  if (!a || !b) return false;
  if (a === b) return true;
  const [s, l] = a.length <= b.length ? [a, b] : [b, a];
  const L = new Set(l.split(' '));
  return s.split(' ').every(w => L.has(w));
}
// loose: share at least one distinctive word ("Bayern Munich" ~ "Bayern München") — only used with a close kick-off time
function near(a, b) {
  const A = new Set(norm(a).split(' ')), B = norm(b).split(' ');
  return B.some(w => w.length > 3 && A.has(w) && !['real', 'united', 'city', 'sporting', 'athletic', 'atletico', 'inter', 'racing', 'olympique'].includes(w));
}

async function api(env, path) {
  const r = await fetch(API + path, { headers: { 'x-apisports-key': env.API_FOOTBALL_KEY } });
  const d = await r.json().catch(() => null);
  if (!r.ok || !d) throw new Error('upstream ' + r.status);
  const errs = d.errors && (Array.isArray(d.errors) ? d.errors : Object.values(d.errors));
  if (errs && errs.length) throw new Error(String(errs[0]).slice(0, 120));
  return d.response || [];
}
async function cached(key, ttl, fn) {
  const req = new Request('https://cache.digitalsaudi.internal/match/' + encodeURIComponent(key));
  const hit = await caches.default.match(req);
  if (hit) return hit.json();
  const data = await fn();
  const t = typeof ttl === 'function' ? ttl(data) : ttl;
  await caches.default.put(req, new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=' + t } }));
  return data;
}

function shape(f) {
  const st = f.fixture.status || {};
  const side = id => (id === f.teams.home.id ? 'home' : 'away');
  return {
    ok: true,
    status: st.short, elapsed: st.elapsed, extra: st.extra || null, statusText: st.long,
    live: LIVE.includes(st.short), finished: DONE.includes(st.short),
    score: { home: f.goals.home, away: f.goals.away },
    events: (f.events || []).map(e => ({
      min: e.time && e.time.elapsed, plus: e.time && e.time.extra, side: side(e.team && e.team.id),
      type: e.type, detail: e.detail, player: e.player && e.player.name, assist: e.assist && e.assist.name
    })),
    lineups: (f.lineups || []).map(l => ({
      side: side(l.team && l.team.id), team: l.team && l.team.name, formation: l.formation,
      coach: l.coach && l.coach.name,
      start: (l.startXI || []).map(p => ({ n: p.player.number, name: p.player.name, pos: p.player.pos })),
      subs: (l.substitutes || []).map(p => ({ n: p.player.number, name: p.player.name, pos: p.player.pos }))
    })),
    source: 'API-Football', updated: new Date().toISOString()
  };
}

export async function onRequestGet({ request, env }) {
  if (!env.API_FOOTBALL_KEY) return out({ ok: false, reason: 'not_configured' }, 300);
  const u = new URL(request.url);
  const date = u.searchParams.get('date') || '', home = u.searchParams.get('home') || '', away = u.searchParams.get('away') || '';
  const kick = Date.parse(u.searchParams.get('kick') || '') || 0;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !home || !away) return out({ ok: false, reason: 'bad_request' }, 60);
  try {
    // 1) find the fixture id (the day's list rarely changes; 3 hours)
    const list = await cached('day:' + date, 10800, () => api(env, '/fixtures?date=' + date + '&timezone=UTC')
      .then(r => r.map(f => ({ id: f.fixture.id, t: Date.parse(f.fixture.date), h: f.teams.home.name, a: f.teams.away.name }))));
    const f = list.find(x => same(x.h, home) && same(x.a, away) && (!kick || Math.abs(x.t - kick) < 4 * 3600e3))
           || (kick && list.find(x => near(x.h, home) && near(x.a, away) && Math.abs(x.t - kick) < 3600e3));
    if (!f) return out({ ok: false, reason: 'not_found' }, 1800);
    // 2) the match itself, refreshed often only while it is being played
    const ttlFor = d => d.live ? 60 : d.finished ? 86400 : (f.t - Date.now() < 90 * 60e3 ? 600 : 3600);
    const data = await cached('fx:' + f.id, ttlFor, () => api(env, '/fixtures?id=' + f.id).then(r => r[0] ? shape(r[0]) : { ok: false, reason: 'not_found' }));
    return out(data, data.live ? 30 : 120);
  } catch (e) {
    return out({ ok: false, reason: 'unavailable', error: String(e.message || e).slice(0, 120) }, 60);
  }
}
