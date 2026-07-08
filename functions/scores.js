/**
 * DigitalSaudi · /scores · v6.0
 * Live scores + lineup + stadium + previous + table
 * Sources: football-data.org (FD) + ESPN public API
 */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const FD_MAP = {
  'eng.1': 'PL', 'esp.1': 'PD', 'ger.1': 'BL1',
  'ita.1': 'SA', 'fra.1': 'FL1', 'uefa.champions': 'CL',
};

async function fdMatches(league, fdKey, status) {
  const comp = FD_MAP[league];
  if (!comp || !fdKey) return [];
  try {
    const r = await fetch(
      `https://api.football-data.org/v4/competitions/${comp}/matches?status=${status}&limit=15`,
      { headers: { 'X-Auth-Token': fdKey }, signal: AbortSignal.timeout(8000) }
    );
    if (!r.ok) return [];
    const d = await r.json();
    return (d.matches || []).map(m => ({
      id: 'fd_' + m.id,
      source: 'fd',
      status: m.status,
      minute: m.minute || null,
      home: m.homeTeam?.shortName || m.homeTeam?.name || '?',
      away: m.awayTeam?.shortName || m.awayTeam?.name || '?',
      homeLogo: null, awayLogo: null,
      homeScore: m.score?.fullTime?.home ?? m.score?.halfTime?.home ?? null,
      awayScore: m.score?.fullTime?.away ?? m.score?.halfTime?.away ?? null,
      date: m.utcDate,
      competition: m.competition?.name || '',
      venue: m.venue || null,
    }));
  } catch(e) { return []; }
}

async function espnScoreboard(league) {
  try {
    const r = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/scoreboard`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!r.ok) return [];
    const d = await r.json();
    return (d.events || []).map(e => {
      const co = e.competitions?.[0] || {};
      const hm = co.competitors?.find(c => c.homeAway === 'home') || {};
      const aw = co.competitors?.find(c => c.homeAway === 'away') || {};
      const state = e.status?.type?.state || 'pre';
      const isLive = state === 'in';
      const isDone = state === 'post';
      /* Lineup from roster if available */
      const hmLineup = (hm.roster || []).slice(0, 11).map(p => p.athlete?.displayName || '').filter(Boolean);
      const awLineup = (aw.roster || []).slice(0, 11).map(p => p.athlete?.displayName || '').filter(Boolean);
      return {
        id: 'espn_' + e.id,
        source: 'espn',
        status: isLive ? 'LIVE' : isDone ? 'FINISHED' : 'SCHEDULED',
        minute: isLive ? (e.status?.displayClock || '') : null,
        home: hm.team?.shortDisplayName || hm.team?.displayName || '?',
        away: aw.team?.shortDisplayName || aw.team?.displayName || '?',
        homeLogo: hm.team?.logo || null,
        awayLogo: aw.team?.logo || null,
        homeScore: (isLive || isDone) ? (hm.score || '0') : null,
        awayScore: (isLive || isDone) ? (aw.score || '0') : null,
        date: e.date,
        competition: e.name || '',
        venue: co.venue?.fullName || co.venue?.shortName || null,
        city: co.venue?.address?.city || null,
        hmLineup,
        awLineup,
        timeLabel: e.status?.type?.shortDetail || '',
      };
    });
  } catch(e) { return []; }
}

async function espnTable(league) {
  try {
    const r = await fetch(
      `https://site.api.espn.com/apis/v2/sports/soccer/${league}/standings`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!r.ok) return [];
    const d = await r.json();
    const entries = d.standings?.[0]?.entries ||
                    d.children?.[0]?.standings?.entries || [];
    return entries.map((entry, i) => {
      const stats = {};
      (entry.stats || []).forEach(s => { stats[s.name] = s.value; });
      return {
        pos: i + 1,
        name: entry.team?.shortDisplayName || entry.team?.displayName || '—',
        logo: entry.team?.logos?.[0]?.href || null,
        played: stats.gamesPlayed || 0,
        won: stats.wins || 0,
        drawn: stats.ties || 0,
        lost: stats.losses || 0,
        gf: stats.pointsFor || 0,
        ga: stats.pointsAgainst || 0,
        gd: stats.pointDifferential || 0,
        points: stats.points || 0,
        form: (stats.form || '').split('').slice(-5),
      };
    });
  } catch(e) { return []; }
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const league = url.searchParams.get('league') || 'sau.1';
  const type = url.searchParams.get('type') || 'live'; /* live | previous | table */
  const fdKey = context.env.FD_API_KEY;

  try {
    if (type === 'table') {
      const table = await espnTable(league);
      return new Response(JSON.stringify({ table, league }),
        { headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public,max-age=300' } });
    }

    /* Live + scheduled */
    const [espn, fdLive] = await Promise.allSettled([
      espnScoreboard(league),
      type === 'previous'
        ? fdMatches(league, fdKey, 'FINISHED')
        : fdMatches(league, fdKey, 'LIVE,SCHEDULED,IN_PLAY'),
    ]);

    let matches = [];
    const espnData = espn.status === 'fulfilled' ? espn.value : [];
    const fdData = fdLive.status === 'fulfilled' ? fdLive.value : [];

    if (type === 'previous') {
      /* Prefer FD finished matches, fallback ESPN */
      matches = fdData.length ? fdData : espnData.filter(m => m.status === 'FINISHED');
    } else {
      /* Merge: ESPN is primary (has logos), FD supplements */
      matches = espnData.length ? espnData : fdData;
    }

    return new Response(JSON.stringify({ matches, league, count: matches.length }),
      { headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public,max-age=60' } });

  } catch(err) {
    return new Response(JSON.stringify({ matches: [], table: [], error: err.message }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}
