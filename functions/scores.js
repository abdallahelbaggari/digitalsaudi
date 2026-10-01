// DigitalSaudi — /scores  (Cloudflare Pages Function)
// Proxies football-data.org v4. The API token stays secret in env.FOOTBALL_API_KEY.
// Responses are cached so many users share a few upstream calls (free plan: ~10 requests/minute).
//   /scores?type=window                 matches yesterday..tomorrow, all competitions (live + today)
//   /scores?type=upcoming&comp=PL       next 10 days
//   /scores?type=results&comp=PL        last 10 days
//   /scores?type=standings&comp=PL      league table
//   /scores?type=team&id=57             one team's recent + next matches

const COMPS = ['PL','CL','PD','SA','BL1','FL1','DED','PPL','ELC','BSA','WC','EC'];
const API = 'https://api.football-data.org/v4';
const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};
const json = (obj, maxAge) => new Response(JSON.stringify(obj), {
  status: 200,
  headers: { ...HEADERS, 'Cache-Control': 'public, max-age=' + (maxAge || 30) }
});

const MEM = globalThis.__dsScoresMem || (globalThis.__dsScoresMem = new Map());

async function cached(key, ttl, producer) {
  const now = Date.now();
  const m = MEM.get(key);
  if (m && now - m.t < ttl * 1000) return m.data;
  const req = new Request('https://cache.digitalsaudi.internal/scores/' + encodeURIComponent(key));
  try {
    const hit = await caches.default.match(req);
    if (hit) { const data = await hit.json(); MEM.set(key, { t: now, data }); return data; }
  } catch (e) {}
  try {
    const data = await producer();
    MEM.set(key, { t: now, data });
    try {
      await caches.default.put(req, new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=' + ttl } }));
    } catch (e) {}
    return data;
  } catch (err) {
    if (m) return { ...m.data, stale: true };   // serve old data if upstream fails / rate-limited
    throw err;
  }
}

function day(offset) {
  const d = new Date(Date.now() + offset * 86400000);
  return d.toISOString().slice(0, 10);
}

const STAGES = {
  GROUP_STAGE: 'Group stage', LEAGUE_STAGE: 'League phase', PLAYOFFS: 'Play-offs', LAST_32: 'Round of 32', LAST_16: 'Round of 16',
  QUARTER_FINALS: 'Quarter-finals', SEMI_FINALS: 'Semi-finals', FINAL: 'Final', THIRD_PLACE: 'Third place'
};

function trimMatch(m) {
  const ft = (m.score && m.score.fullTime) || {};
  const ht = (m.score && m.score.halfTime) || {};
  const team = (t, s) => ({ id: t.id, name: t.shortName || t.name || 'TBD', crest: t.crest || '', score: s == null ? null : s });
  return {
    id: m.id,
    utc: m.utcDate,
    status: m.status,
    minute: m.minute || null,
    comp: m.competition ? m.competition.code : '',
    compName: m.competition ? m.competition.name : '',
    stage: STAGES[m.stage] || '',
    matchday: m.matchday || null,
    venue: m.venue || '',
    home: team(m.homeTeam || {}, ft.home),
    away: team(m.awayTeam || {}, ft.away),
    ht: { home: ht.home == null ? null : ht.home, away: ht.away == null ? null : ht.away }
  };
}

async function fd(path, key) {
  const res = await fetch(API + path, { headers: { 'X-Auth-Token': key } });
  if (!res.ok) throw new Error('football-data ' + res.status);
  return res.json();
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const type = url.searchParams.get('type') || 'window';
  const comp = (url.searchParams.get('comp') || 'PL').toUpperCase();
  const key = context.env.FOOTBALL_API_KEY;

  if (!key) return json({ ok: false, error: 'FOOTBALL_API_KEY not set' });
  if (type !== 'window' && type !== 'team' && COMPS.indexOf(comp) < 0) return json({ ok: false, error: 'Unknown competition' });

  try {
    if (type === 'window') {
      const data = await cached('window', 60, async () => {
        const d = await fd('/matches?competitions=' + COMPS.join(',') + '&dateFrom=' + day(-1) + '&dateTo=' + day(1), key);
        return { ok: true, matches: (d.matches || []).map(trimMatch).sort((a, b) => a.utc < b.utc ? -1 : 1), updated: new Date().toISOString() };
      });
      return json(data, 30);
    }

    if (type === 'upcoming' || type === 'results') {
      const up = type === 'upcoming';
      const data = await cached(type + ':' + comp, up ? 1800 : 900, async () => {
        const d = await fd('/competitions/' + comp + '/matches?dateFrom=' + (up ? day(0) : day(-10)) + '&dateTo=' + (up ? day(10) : day(0)), key);
        const ok = up ? ['SCHEDULED', 'TIMED', 'POSTPONED'] : ['FINISHED'];
        return { ok: true, matches: (d.matches || []).filter(m => ok.indexOf(m.status) >= 0).map(trimMatch).sort((a, b) => a.utc < b.utc ? -1 : 1), updated: new Date().toISOString() };
      });
      return json(data, 300);
    }

    if (type === 'standings') {
      const data = await cached('standings:' + comp, 3600, async () => {
        const d = await fd('/competitions/' + comp + '/standings', key);
        const standings = (d.standings || []).filter(s => s.type === 'TOTAL').map(s => ({
          group: s.group || '',
          table: (s.table || []).map(r => ({ pos: r.position, id: r.team.id, name: r.team.shortName || r.team.name, crest: r.team.crest || '', p: r.playedGames, gd: r.goalDifference, pts: r.points }))
        }));
        return { ok: true, standings, updated: new Date().toISOString() };
      });
      return json(data, 600);
    }

    if (type === 'team') {
      const id = parseInt(url.searchParams.get('id'), 10);
      if (!id) return json({ ok: false, error: 'Missing team id' });
      const data = await cached('team:' + id, 600, async () => {
        const d = await fd('/teams/' + id + '/matches?dateFrom=' + day(-14) + '&dateTo=' + day(14), key);
        return { ok: true, matches: (d.matches || []).map(trimMatch).sort((a, b) => a.utc < b.utc ? -1 : 1) };
      });
      return json(data, 120);
    }

    return json({ ok: false, error: 'Unknown type' });
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err) }, 10);
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: HEADERS });
}
