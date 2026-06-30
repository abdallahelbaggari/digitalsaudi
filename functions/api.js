/**
 * DigitalSaudi · /api · v2.0
 * Smart Saudi Dashboard API
 * Sources: Aladhan (prayer/hijri) · Open-Meteo (weather) · Guardian (news)
 * All free — zero paid API keys
 */

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const CITIES = {
  riyadh:  { name:'Riyadh',    nameAr:'الرياض',          lat:24.7136, lng:46.6753 },
  jeddah:  { name:'Jeddah',    nameAr:'جدة',              lat:21.4858, lng:39.1925 },
  makkah:  { name:'Makkah',    nameAr:'مكة المكرمة',     lat:21.3891, lng:39.8579 },
  madinah: { name:'Madinah',   nameAr:'المدينة المنورة',  lat:24.5247, lng:39.5692 },
  dammam:  { name:'Dammam',    nameAr:'الدمام',           lat:26.4207, lng:50.0888 },
  khobar:  { name:'Al Khobar', nameAr:'الخبر',            lat:26.2172, lng:50.1971 },
  taif:    { name:'Taif',      nameAr:'الطائف',           lat:21.2703, lng:40.4158 },
  tabuk:   { name:'Tabuk',     nameAr:'تبوك',             lat:28.3838, lng:36.5550 },
  abha:    { name:'Abha',      nameAr:'أبها',             lat:18.2164, lng:42.5053 },
  neom:    { name:'NEOM',      nameAr:'نيوم',             lat:28.0339, lng:35.2500 },
};

/* ── Prayer Times ── */
async function getPrayerTimes(city) {
  const c = CITIES[city] || CITIES.riyadh;
  const today = new Date();
  const date  = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
  try {
    const r = await fetch(
      `https://api.aladhan.com/v1/timings/${date}?latitude=${c.lat}&longitude=${c.lng}&method=4`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!r.ok) throw new Error('Aladhan ' + r.status);
    const d = await r.json();
    const t = d.data?.timings || {};
    const h = d.data?.date?.hijri || {};

    /* Detect Ramadan: Hijri month 9 */
    const isRamadan = parseInt(h.month?.number||0) === 9;

    return {
      city: c.name, cityAr: c.nameAr,
      date: d.data?.date?.readable || today.toDateString(),
      hijri: {
        day: h.day, month: h.month?.en||'', monthAr: h.month?.ar||'',
        monthNumber: h.month?.number||0, year: h.year,
        isRamadan,
        holidays: h.holidays||[],
      },
      timings: {
        Fajr:    t.Fajr    || '--:--',
        Sunrise: t.Sunrise || '--:--',
        Dhuhr:   t.Dhuhr   || '--:--',
        Asr:     t.Asr     || '--:--',
        Maghrib: t.Maghrib || '--:--',
        Isha:    t.Isha    || '--:--',
      },
      source: 'aladhan.com',
    };
  } catch(e) {
    /* Offline fallback — approximate Riyadh times */
    return {
      city: c.name, cityAr: c.nameAr,
      date: today.toDateString(),
      hijri: { day:'', month:'', year:'', isRamadan:false },
      timings: { Fajr:'04:45',Sunrise:'06:10',Dhuhr:'12:15',Asr:'15:30',Maghrib:'18:45',Isha:'20:15' },
      offline: true,
      note: 'Offline times — approximate for ' + c.name,
    };
  }
}

/* ── Weather (all cities or single) ── */
async function getWeather(city, all) {
  const wxDesc = c => c<=0?'Clear Sky':c<=3?'Partly Cloudy':c<=49?'Foggy':c<=69?'Rainy':c<=79?'Snowy':c<=82?'Showers':'Thunderstorm';
  const wxIcon = c => c<=0?'☀️':c<=3?'⛅':c<=49?'🌫️':c<=69?'🌧️':c<=79?'❄️':c<=82?'🌦️':'⛈️';

  if (all) {
    /* Fetch all cities in parallel */
    const cities = Object.entries(CITIES);
    const results = await Promise.allSettled(
      cities.map(([key,c]) =>
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lng}&current=temperature_2m,weather_code&timezone=Asia%2FRiyadh`,
          { signal: AbortSignal.timeout(7000) })
        .then(r => r.json())
        .then(d => ({ key, name:c.name, nameAr:c.nameAr, temp:Math.round(d.current?.temperature_2m||0), code:d.current?.weather_code||0 }))
      )
    );
    return {
      cities: results
        .filter(r => r.status==='fulfilled')
        .map(r => ({ ...r.value, desc:wxDesc(r.value.code), icon:wxIcon(r.value.code) }))
    };
  }

  const c = CITIES[city] || CITIES.riyadh;
  try {
    const r = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lng}`+
      `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`+
      `&daily=temperature_2m_max,temperature_2m_min,weather_code`+
      `&timezone=Asia%2FRiyadh&forecast_days=5`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!r.ok) throw new Error('Weather ' + r.status);
    const d = await r.json();
    const cur = d.current || {};
    const daily = d.daily || {};
    return {
      city: c.name, cityAr: c.nameAr,
      current: {
        temp:     Math.round(cur.temperature_2m||0),
        humidity: cur.relative_humidity_2m||0,
        wind:     Math.round(cur.wind_speed_10m||0),
        desc:     wxDesc(cur.weather_code||0),
        icon:     wxIcon(cur.weather_code||0),
      },
      forecast: (daily.time||[]).slice(0,5).map((date,i) => ({
        date,
        max:  Math.round(daily.temperature_2m_max?.[i]||0),
        min:  Math.round(daily.temperature_2m_min?.[i]||0),
        desc: wxDesc(daily.weather_code?.[i]||0),
        icon: wxIcon(daily.weather_code?.[i]||0),
      })),
    };
  } catch(e) {
    return { city:c.name, error:e.message };
  }
}

/* ── News (Guardian + ESPN Saudi) ── */
async function getNews(category) {
  const QUERIES = {
    all:      'saudi arabia',
    tech:     'saudi technology AI LEAP NEOM digital',
    vision:   'saudi vision 2030 NEOM giga projects',
    business: 'saudi economy investment startup FII',
    tourism:  'saudi tourism AlUla Red Sea travel',
    sports:   'saudi pro league football',
  };
  const q = QUERIES[category] || QUERIES.all;

  const [guardian, sports] = await Promise.allSettled([
    fetch(
      `https://content.guardianapis.com/search?q=${encodeURIComponent(q)}`+
      `&show-fields=thumbnail,trailText&page-size=20&order-by=newest&api-key=test`,
      { signal: AbortSignal.timeout(6000) }
    ).then(r => r.ok ? r.json() : {})
     .then(d => (d.response?.results||[]).map((a,i) => ({
       id:`g_${i}`, title:a.webTitle||'', source:'The Guardian',
       summary:(a.fields?.trailText||'').replace(/<[^>]+>/g,'').slice(0,200),
       image:a.fields?.thumbnail||null, url:a.webUrl||'',
       date:a.webPublicationDate||'', category,
     }))).catch(() => []),
    category === 'sports' ?
      fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/sau.1/news?limit=15',
        { signal: AbortSignal.timeout(5000) })
      .then(r => r.ok ? r.json() : {})
      .then(d => (d.articles||[]).map((a,i) => ({
        id:`espn_${i}`, title:a.headline||'', source:'ESPN Saudi',
        summary:(a.description||'').slice(0,200),
        image:a.images?.[0]?.url||null, url:a.links?.web?.href||'',
        date:a.published||'', category:'sports',
      }))).catch(() => []) : Promise.resolve([]),
  ]);

  const articles = [
    ...(guardian.status==='fulfilled' ? guardian.value : []),
    ...(sports.status==='fulfilled'   ? sports.value   : []),
  ].filter(a => a.title);

  return { articles, total: articles.length, category };
}

/* ── Qibla ── */
function getQibla(lat, lng) {
  const ML=21.3891*Math.PI/180, MLng=39.8579*Math.PI/180;
  const ul=lat*Math.PI/180, ulng=lng*Math.PI/180;
  const dL=MLng-ulng;
  const y=Math.sin(dL)*Math.cos(ML);
  const x=Math.cos(ul)*Math.sin(ML)-Math.sin(ul)*Math.cos(ML)*Math.cos(dL);
  const b=(Math.atan2(y,x)*180/Math.PI+360)%360;
  const dist=6371*2*Math.asin(Math.sqrt(Math.pow(Math.sin((ML-ul)/2),2)+Math.cos(ul)*Math.cos(ML)*Math.pow(Math.sin(dL/2),2)));
  return { bearing:Math.round(b), distance:Math.round(dist) };
}

/* ── Saudi Public Holidays ── */
function getHolidays() {
  const now = new Date();
  const y   = now.getFullYear();
  const holidays = [
    { name:'Founding Day',         nameAr:'يوم التأسيس',    date:`${y}-02-22`, flag:'🇸🇦' },
    { name:'Eid Al Fitr',          nameAr:'عيد الفطر',       date:`${y}-03-30`, flag:'🌙', note:'Approx date — follows Hijri calendar' },
    { name:'Eid Al Adha',          nameAr:'عيد الأضحى',      date:`${y}-06-06`, flag:'🕋', note:'Approx date — follows Hijri calendar' },
    { name:'Saudi National Day',   nameAr:'اليوم الوطني',    date:`${y}-09-23`, flag:'🇸🇦' },
  ];
  return holidays.map(h => {
    const target = new Date(h.date);
    const diff   = Math.ceil((target - now) / (1000*60*60*24));
    return { ...h, daysUntil: diff < 0 ? diff + 365 : diff, passed: diff < 0 };
  }).sort((a,b) => a.daysUntil - b.daysUntil);
}

/* ── MAIN ── */
export async function onRequestGet(context) {
  const url  = new URL(context.request.url);
  const type = url.searchParams.get('type') || 'health';
  const city = url.searchParams.get('city') || 'riyadh';
  const cat  = url.searchParams.get('category') || 'all';
  const all  = url.searchParams.get('all') === '1';
  const lat  = parseFloat(url.searchParams.get('lat') || '24.7136');
  const lng  = parseFloat(url.searchParams.get('lng') || '46.6753');

  console.log(`[DS/api] type=${type} city=${city} cat=${cat}`);

  try {
    let data, cacheAge = 60;
    switch(type) {
      case 'prayer':   data = await getPrayerTimes(city); cacheAge = 3600; break;
      case 'weather':  data = await getWeather(city, all); cacheAge = 1800; break;
      case 'news':     data = await getNews(cat); cacheAge = 300; break;
      case 'qibla':    data = getQibla(lat, lng); cacheAge = 86400; break;
      case 'holidays': data = { holidays: getHolidays() }; cacheAge = 3600; break;
      case 'cities':   data = { cities: CITIES }; cacheAge = 86400; break;
      default: data = { status:'ok', app:'DigitalSaudi', version:'2.0', now:new Date().toISOString() };
    }
    return new Response(JSON.stringify({ success:true, type, ...data }), {
      headers: { ...CORS, 'Content-Type':'application/json', 'Cache-Control':`public, max-age=${cacheAge}` },
    });
  } catch(err) {
    console.error('[DS/api] Error:', err.message);
    return new Response(JSON.stringify({ success:false, type, error:err.message }), {
      status: 200, headers: { ...CORS, 'Content-Type':'application/json' },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}
