/**
 * DigitalSaudi · /scores · Live Scores Proxy
 * Sources: football-data.org + ESPN public API
 * Cloudflare Pages Function
 */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/* football-data.org competition IDs */
const FD_LEAGUES = {
  'sau.1': null,        /* Saudi Pro League — ESPN only */
  'eng.1': 'PL',       /* Premier League */
  'esp.1': 'PD',       /* La Liga */
  'ger.1': 'BL1',      /* Bundesliga */
  'ita.1': 'SA',       /* Serie A */
  'fra.1': 'FL1',      /* Ligue 1 */
  'uefa.champions': 'CL', /* Champions League */
};

/* ESPN league IDs */
const ESPN_LEAGUES = {
  'sau.1': 'sau.1',
  'eng.1': 'eng.1',
  'esp.1': 'esp.1',
  'ger.1': 'ger.1',
  'ita.1': 'ita.1',
  'fra.1': 'fra.1',
  'uefa.champions': 'uefa.champions',
};

async function getFDScores(leagueId, fdKey) {
  const fdComp = FD_LEAGUES[leagueId];
  if (!fdComp || !fdKey) return null;
  try {
    const r = await fetch(
      `https://api.football-data.org/v4/competitions/${fdComp}/matches?status=LIVE,SCHEDULED,FINISHED&limit=20`,
      {
        headers: { 'X-Auth-Token': fdKey },
        signal: AbortSignal.timeout(7000),
      }
    );
    if (!r.ok) throw new Error('FD ' + r.status);
    const d = await r.json();
    return (d.matches || []).map(m => ({
      id: 'fd_' + m.id,
      source: 'fd',
      status: m.status, /* LIVE, SCHEDULED, FINISHED, IN_PLAY, PAUSED */
      minute: m.minute || null,
      home: m.homeTeam?.shortName || m.homeTeam?.name || 'Home',
      away: m.awayTeam?.shortName || m.awayTeam?.name || 'Away',
      homeScore: m.score?.fullTime?.home ?? m.score?.halfTime?.home ?? null,
      awayScore: m.score?.fullTime?.away ?? m.score?.halfTime?.away ?? null,
      date: m.utcDate,
      competition: m.competition?.name || '',
    }));
  } catch(e) {
    console.error('[scores/fd]', e.message);
    return null;
  }
}

async function getESPNScores(leagueId) {
  const espnId = ESPN_LEAGUES[leagueId] || leagueId;
  try {
    const r = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/${espnId}/scoreboard`,
      { signal: AbortSignal.timeout(7000) }
    );
    if (!r.ok) throw new Error('ESPN ' + r.status);
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
        source: 'espn',
        status: isLive ? 'LIVE' : isDone ? 'FINISHED' : 'SCHEDULED',
        minute: isLive ? (e.status?.displayClock || '') : null,
        home: hm.team?.shortDisplayName || hm.team?.displayName || 'Home',
        away: aw.team?.shortDisplayName || aw.team?.displayName || 'Away',
        homeLogo: hm.team?.logo || null,
        awayLogo: aw.team?.logo || null,
        homeScore: isDone || isLive ? (hm.score || '0') : null,
        awayScore: isDone || isLive ? (aw.score || '0') : null,
        date: e.date,
        competition: e.name || '',
        timeLabel: e.status?.type?.shortDetail || '',
      };
    });
  } catch(e) {
    console.error('[scores/espn]', e.message);
    return null;
  }
}

async function getESPNTable(leagueId) {
  const espnId = ESPN_LEAGUES[leagueId] || leagueId;
  try {
    const r = await fetch(
      `https://site.api.espn.com/apis/v2/sports/soccer/${espnId}/standings`,
      { signal: AbortSignal.timeout(7000) }
    );
    if (!r.ok) throw new Error('ESPN table ' + r.status);
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
        gd: stats.pointDifferential || 0,
        points: stats.points || 0,
        form: (stats.form || '').split('').slice(-5),
      };
    });
  } catch(e) {
    console.error('[scores/table]', e.message);
    return null;
  }
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const league = url.searchParams.get('league') || 'sau.1';
  const type = url.searchParams.get('type') || 'scores'; /* scores | table */
  const fdKey = context.env.FD_API_KEY;

  try {
    if (type === 'table') {
      const table = await getESPNTable(league);
      return new Response(JSON.stringify({ table: table || [], league }), {
        headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public,max-age=300' },
      });
    }

    /* Scores — try FD first, fall back to ESPN */
    const [fd, espn] = await Promise.allSettled([
      getFDScores(league, fdKey),
      getESPNScores(league),
    ]);

    const fdData = fd.status === 'fulfilled' ? fd.value : null;
    const espnData = espn.status === 'fulfilled' ? espn.value : null;

    /* Prefer FD data if available, merge ESPN logos */
    let matches = fdData || espnData || [];
    if (!fdData && espnData) matches = espnData;

    return new Response(JSON.stringify({ matches, league, source: fdData ? 'fd+espn' : 'espn' }), {
      headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public,max-age=60' },
    });
  } catch(err) {
    return new Response(JSON.stringify({ matches: [], table: [], error: err.message }), {
      status: 200, headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}
