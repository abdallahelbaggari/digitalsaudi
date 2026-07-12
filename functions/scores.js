/* DigitalSaudi · /scores · v9.0
   LiveScore-style: Today · Tomorrow · Upcoming · Live · Results
   ESPN (no key) + football-data.org (FD_API_KEY)
   Groups matches by DATE and COMPETITION like livescore.com
*/
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const ESPN_IDS = {
  'sau.1':'sau.1', 'sau.cup':'sau.cup',
  'eng.1':'eng.1', 'esp.1':'esp.1', 'ger.1':'ger.1',
  'ita.1':'ita.1', 'fra.1':'fra.1',
  'uefa.champions':'uefa.champions', 'fifa.worldcup':'fifa.worldcup',
};
const FD_IDS = {
  'eng.1':'PL','esp.1':'PD','ger.1':'BL1','ita.1':'SA',
  'fra.1':'FL1','uefa.champions':'CL','fifa.worldcup':'WC',
};

function fmtDate(d) {
  // Returns YYYY-MM-DD in local time
  const dt = new Date(d);
  return dt.toISOString().split('T')[0];
}
function dayLabel(dateStr, nowStr) {
  if (dateStr === nowStr) return 'TODAY';
  const tomorrow = new Date(nowStr);
  tomorrow.setDate(tomorrow.getDate()+1);
  const tStr = tomorrow.toISOString().split('T')[0];
  if (dateStr === tStr) return 'TOMORROW';
  const dt = new Date(dateStr);
  return dt.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'}).toUpperCase();
}
function timeLabel(dateStr) {
  try {
    return new Date(dateStr).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
  } catch(e){ return '--:--'; }
}

async function espnScores(league) {
  const id = ESPN_IDS[league] || league;
  try {
    const r = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/${id}/scoreboard`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!r.ok) { console.log('[scores/espn]', r.status); return []; }
    const d = await r.json();
    return (d.events||[]).map(e => {
      const co = e.competitions?.[0]||{};
      const hm = co.competitors?.find(c=>c.homeAway==='home')||{};
      const aw = co.competitors?.find(c=>c.homeAway==='away')||{};
      const state = e.status?.type?.state||'pre';
      const isLive = state==='in', isDone = state==='post';
      return {
        id: 'espn_'+e.id,
        status: isLive?'LIVE': isDone?'FINISHED':'SCHEDULED',
        minute: isLive?(e.status?.displayClock||''):'',
        home: hm.team?.shortDisplayName||hm.team?.displayName||'?',
        away: aw.team?.shortDisplayName||aw.team?.displayName||'?',
        homeLogo: hm.team?.logo||null,
        awayLogo: aw.team?.logo||null,
        homeScore: (isLive||isDone)?String(hm.score??'0'):null,
        awayScore: (isLive||isDone)?String(aw.score??'0'):null,
        date: e.date||'',
        competition: e.shortName||e.name||'',
        venue: co.venue?.fullName||'',
        city: co.venue?.address?.city||'',
        timeLabel: e.status?.type?.shortDetail||'',
      };
    });
  } catch(e){ console.error('[espn]',e.message); return []; }
}

async function fdScores(league, key, days=7) {
  const comp = FD_IDS[league]; if(!comp||!key) return [];
  const to = new Date(); to.setDate(to.getDate()+days);
  const from = new Date(); from.setDate(from.getDate()-7);
  const fmt = d => d.toISOString().split('T')[0];
  try {
    const r = await fetch(
      `https://api.football-data.org/v4/competitions/${comp}/matches?dateFrom=${fmt(from)}&dateTo=${fmt(to)}`,
      { headers:{'X-Auth-Token':key}, signal:AbortSignal.timeout(9000) }
    );
    if(!r.ok){ console.log('[fd]',r.status); return []; }
    const d = await r.json();
    return (d.matches||[]).map(m=>({
      id:'fd_'+m.id,
      status:(m.status==='IN_PLAY'||m.status==='PAUSED')?'LIVE':m.status,
      minute:m.minute?String(m.minute):'',
      home:m.homeTeam?.shortName||m.homeTeam?.name||'?',
      away:m.awayTeam?.shortName||m.awayTeam?.name||'?',
      homeLogo:null, awayLogo:null,
      homeScore:m.score?.fullTime?.home??m.score?.halfTime?.home??null,
      awayScore:m.score?.fullTime?.away??m.score?.halfTime?.away??null,
      date:m.utcDate||'',
      competition:m.competition?.name||'',
      venue:m.venue||'', city:'',
      timeLabel:m.status||'',
    }));
  } catch(e){ console.error('[fd]',e.message); return []; }
}

async function espnTable(league) {
  const id = ESPN_IDS[league]||league;
  try {
    const r = await fetch(
      `https://site.api.espn.com/apis/v2/sports/soccer/${id}/standings`,
      {signal:AbortSignal.timeout(8000)}
    );
    if(!r.ok) return [];
    const d = await r.json();
    const entries = d.standings?.[0]?.entries||d.children?.[0]?.standings?.entries||[];
    return entries.map((e,i)=>{
      const st={}; (e.stats||[]).forEach(s=>{st[s.name]=s.value;});
      return {
        pos:i+1, name:e.team?.shortDisplayName||e.team?.displayName||'—',
        logo:e.team?.logos?.[0]?.href||null,
        played:st.gamesPlayed||0, won:st.wins||0, drawn:st.ties||0, lost:st.losses||0,
        gf:st.pointsFor||0, ga:st.pointsAgainst||0,
        gd:st.pointDifferential||0, points:st.points||0,
        form:(st.form||'').split('').slice(-5),
      };
    });
  } catch(e){ console.error('[table]',e.message); return []; }
}

/* Group matches by date then competition — LiveScore style */
function groupMatches(matches) {
  const byDate = {};
  for (const m of matches) {
    const dateKey = fmtDate(m.date);
    if (!byDate[dateKey]) byDate[dateKey] = {};
    if (!byDate[dateKey][m.competition]) byDate[dateKey][m.competition] = [];
    byDate[dateKey][m.competition].push(m);
  }
  return byDate;
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const league  = url.searchParams.get('league')||'sau.1';
  const type    = url.searchParams.get('type')||'today'; // today|live|previous|upcoming|table|all
  const fdKey   = context.env.FD_API_KEY;
  const nowStr  = new Date().toISOString().split('T')[0];

  console.log('[scores] league:',league,'type:',type,'fdKey:',!!fdKey);

  try {
    if (type==='table') {
      const table = await espnTable(league);
      return new Response(JSON.stringify({table,league}),
        {headers:{...CORS,'Content-Type':'application/json','Cache-Control':'public,max-age=300'}});
    }

    // Fetch ESPN + FD in parallel
    const [espnR, fdR] = await Promise.allSettled([
      espnScores(league),
      fdScores(league, fdKey, 7),
    ]);
    const espnData = espnR.status==='fulfilled' ? espnR.value : [];
    const fdData   = fdR.status==='fulfilled'   ? fdR.value   : [];

    // Merge: ESPN primary (has logos), FD fills gaps
    const allById = {};
    for (const m of fdData) allById[m.id]=m;
    for (const m of espnData) allById[m.id]=m; // ESPN overwrites FD if same id base
    let all = Object.values(allById);

    // Classify
    const today    = all.filter(m=>fmtDate(m.date)===nowStr);
    const live     = all.filter(m=>m.status==='LIVE'||m.status==='IN_PLAY');
    const finished = all.filter(m=>m.status==='FINISHED').sort((a,b)=>new Date(b.date)-new Date(a.date));
    const upcoming = all.filter(m=>m.status==='SCHEDULED'&&fmtDate(m.date)>=nowStr).sort((a,b)=>new Date(a.date)-new Date(b.date));

    // Group by date + competition
    const grouped = groupMatches(all);

    // Enrich matches with dayLabel
    const datesWithLabels = Object.keys(grouped).sort().map(dateKey=>({
      dateKey,
      dayLabel: dayLabel(dateKey, nowStr),
      competitions: grouped[dateKey],
    }));

    return new Response(JSON.stringify({
      all: all.length,
      live: live.length,
      today: today.length,
      matches: all,
      grouped: datesWithLabels,
      live_matches: live,
      finished_matches: finished.slice(0,30),
      upcoming_matches: upcoming.slice(0,30),
      nowStr,
      league,
      source: espnData.length?'espn+fd':'fd',
    }), {headers:{...CORS,'Content-Type':'application/json','Cache-Control':'public,max-age=60'}});

  } catch(err) {
    console.error('[scores] error:', err.message);
    return new Response(JSON.stringify({matches:[],grouped:[],error:err.message}),
      {status:200, headers:{...CORS,'Content-Type':'application/json'}});
  }
}

export async function onRequestOptions() {
  return new Response(null, {status:200, headers:CORS});
}
