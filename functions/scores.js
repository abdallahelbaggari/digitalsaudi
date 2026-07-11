/**
 * DigitalSaudi · /scores · v7.0
 * ESPN public API (no key) + football-data.org (FD_API_KEY)
 * Live · Previous · Table · Stadium · Lineup
 */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const ESPN = {
  'sau.1':          'sau.1',
  'eng.1':          'eng.1',
  'esp.1':          'esp.1',
  'ger.1':          'ger.1',
  'ita.1':          'ita.1',
  'fra.1':          'fra.1',
  'uefa.champions': 'uefa.champions',
};

const FD = {
  'eng.1': 'PL', 'esp.1': 'PD', 'ger.1': 'BL1',
  'ita.1': 'SA', 'fra.1': 'FL1', 'uefa.champions': 'CL',
};

/* ESPN scoreboard — always works, no key */
async function espnScores(league) {
  const id = ESPN[league] || league;
  try {
    const r = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/${id}/scoreboard`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!r.ok) { console.log('[scores/espn] status:', r.status); return []; }
    const d = await r.json();
    return (d.events || []).map(e => {
      const co = e.competitions?.[0] || {};
      const hm = co.competitors?.find(c => c.homeAway === 'home') || {};
      const aw = co.competitors?.find(c => c.homeAway === 'away') || {};
      const state = e.status?.type?.state || 'pre';
      const isLive = state === 'in';
      const isDone = state === 'post';
      return {
        id: 'espn_' + e.id,
        status: isLive ? 'LIVE' : isDone ? 'FINISHED' : 'SCHEDULED',
        minute: isLive ? (e.status?.displayClock || '') : null,
        home: hm.team?.shortDisplayName || hm.team?.displayName || '?',
        away: aw.team?.shortDisplayName || aw.team?.displayName || '?',
        homeLogo: hm.team?.logo || null,
        awayLogo: aw.team?.logo || null,
        homeScore: (isLive || isDone) ? String(hm.score ?? '0') : null,
        awayScore: (isLive || isDone) ? String(aw.score ?? '0') : null,
        date: e.date || '',
        competition: e.shortName || e.name || '',
        venue: co.venue?.fullName || co.venue?.shortName || '',
        city: co.venue?.address?.city || '',
        timeLabel: e.status?.type?.shortDetail || '',
      };
    });
  } catch (e) {
    console.error('[scores/espn]', e.message);
    return [];
  }
}

/* ESPN standings */
async function espnTable(league) {
  const id = ESPN[league] || league;
  try {
    const r = await fetch(
      `https://site.api.espn.com/apis/v2/sports/soccer/${id}/standings`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!r.ok) return [];
    const d = await r.json();
    const entries =
      d.standings?.[0]?.entries ||
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
  } catch (e) {
    console.error('[scores/table]', e.message);
    return [];
  }
}

/* football-data.org — needs FD_API_KEY */
async function fdScores(league, key) {
  const comp = FD[league];
  if (!comp || !key) return [];
  try {
    const r = await fetch(
      `https://api.football-data.org/v4/competitions/${comp}/matches?status=LIVE,IN_PLAY,PAUSED,SCHEDULED,FINISHED&limit=20`,
      { headers: { 'X-Auth-Token': key }, signal: AbortSignal.timeout(8000) }
    );
    if (!r.ok) { console.log('[scores/fd] status:', r.status); return []; }
    const d = await r.json();
    return (d.matches || []).map(m => ({
      id: 'fd_' + m.id,
      status: m.status === 'IN_PLAY' || m.status === 'PAUSED' ? 'LIVE' : m.status,
      minute: m.minute ? String(m.minute) : null,
      home: m.homeTeam?.shortName || m.homeTeam?.name || '?',
      away: m.awayTeam?.shortName || m.awayTeam?.name || '?',
      homeLogo: null, awayLogo: null,
      homeScore: m.score?.fullTime?.home ?? m.score?.halfTime?.home ?? null,
      awayScore: m.score?.fullTime?.away ?? m.score?.halfTime?.away ?? null,
      date: m.utcDate || '',
      competition: m.competition?.name || '',
      venue: m.venue || '',
      city: '',
      timeLabel: m.status || '',
    }));
  } catch (e) {
    console.error('[scores/fd]', e.message);
    return [];
  }
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const league = url.searchParams.get('league') || 'sau.1';
  const type = url.searchParams.get('type') || 'live';
  const fdKey = context.env.FD_API_KEY;

  console.log('[scores] league:', league, 'type:', type, 'fdKey:', !!fdKey);

  try {
    if (type === 'table') {
      const table = await espnTable(league);
      return new Response(JSON.stringify({ table, league }),
        { headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public,max-age=300' } });
    }

    /* Fetch ESPN + FD in parallel */
    const [espn, fd] = await Promise.allSettled([
      espnScores(league),
      fdScores(league, fdKey),
    ]);

    const espnData = espn.status === 'fulfilled' ? espn.value : [];
    const fdData = fd.status === 'fulfilled' ? fd.value : [];

    /* Prefer ESPN (has logos), supplement with FD if ESPN empty */
    const matches = espnData.length ? espnData : fdData;

    console.log('[scores] matches found:', matches.length, 'source:', espnData.length ? 'espn' : 'fd');

    return new Response(JSON.stringify({ matches, league, count: matches.length }),
      { headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public,max-age=60' } });

  } catch (err) {
    console.error('[scores] error:', err.message);
    return new Response(JSON.stringify({ matches: [], table: [], error: err.message }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 200, headers: CORS });
}
