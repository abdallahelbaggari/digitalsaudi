/**
 * DigitalSaudi · /api · v3.0
 * Prayer · Weather · Holidays · Qibla
 */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
const CITIES = {
  riyadh:  {name:'Riyadh',   ar:'الرياض',         lat:24.7136,lng:46.6753},
  jeddah:  {name:'Jeddah',   ar:'جدة',             lat:21.4858,lng:39.1925},
  makkah:  {name:'Makkah',   ar:'مكة المكرمة',    lat:21.3891,lng:39.8579},
  madinah: {name:'Madinah',  ar:'المدينة المنورة', lat:24.5247,lng:39.5692},
  dammam:  {name:'Dammam',   ar:'الدمام',          lat:26.4207,lng:50.0888},
  taif:    {name:'Taif',     ar:'الطائف',          lat:21.2703,lng:40.4158},
  tabuk:   {name:'Tabuk',    ar:'تبوك',            lat:28.3838,lng:36.5550},
  abha:    {name:'Abha',     ar:'أبها',            lat:18.2164,lng:42.5053},
  neom:    {name:'NEOM',     ar:'نيوم',            lat:28.0339,lng:35.2500},
};
const WX = c=>c<=0?['☀️','Clear']:c<=3?['⛅','Partly Cloudy']:c<=49?['🌫️','Foggy']:c<=69?['🌧️','Rainy']:['⛈️','Stormy'];

async function getPrayer(city) {
  const c=CITIES[city]||CITIES.riyadh;
  const now=new Date();
  const d=`${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
  try {
    const r=await fetch(`https://api.aladhan.com/v1/timings/${d}?latitude=${c.lat}&longitude=${c.lng}&method=4`,{signal:AbortSignal.timeout(8000)});
    const data=await r.json();
    const t=data.data?.timings||{},h=data.data?.date?.hijri||{};
    return {city:c.name,ar:c.ar,date:data.data?.date?.readable,
      hijri:{day:h.day,month:h.month?.en,monthAr:h.month?.ar,year:h.year,isRamadan:parseInt(h.month?.number||0)===9},
      timings:{Fajr:t.Fajr,Sunrise:t.Sunrise,Dhuhr:t.Dhuhr,Asr:t.Asr,Maghrib:t.Maghrib,Isha:t.Isha}};
  } catch(e) {
    return {city:c.name,ar:c.ar,date:now.toDateString(),hijri:{isRamadan:false},
      timings:{Fajr:'04:45',Sunrise:'06:10',Dhuhr:'12:15',Asr:'15:30',Maghrib:'18:45',Isha:'20:15'},offline:true};
  }
}

async function getWeather(city,all) {
  if(all) {
    const res=await Promise.allSettled(Object.entries(CITIES).map(([k,c])=>
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lng}&current=temperature_2m,weather_code&timezone=Asia%2FRiyadh`,{signal:AbortSignal.timeout(6000)})
      .then(r=>r.json()).then(d=>{const w=WX(d.current?.weather_code||0);return{key:k,name:c.name,ar:c.ar,temp:Math.round(d.current?.temperature_2m||0),icon:w[0],desc:w[1]};})
    ));
    return {cities:res.filter(r=>r.status==='fulfilled').map(r=>r.value)};
  }
  const c=CITIES[city]||CITIES.riyadh;
  try {
    const r=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Asia%2FRiyadh&forecast_days=5`,{signal:AbortSignal.timeout(8000)});
    const d=await r.json();
    const cur=d.current||{},daily=d.daily||{},w=WX(cur.weather_code||0);
    return {city:c.name,ar:c.ar,temp:Math.round(cur.temperature_2m||0),humidity:cur.relative_humidity_2m||0,wind:Math.round(cur.wind_speed_10m||0),icon:w[0],desc:w[1],
      forecast:(daily.time||[]).slice(0,5).map((date,i)=>{const fw=WX(daily.weather_code?.[i]||0);return{date,max:Math.round(daily.temperature_2m_max?.[i]||0),min:Math.round(daily.temperature_2m_min?.[i]||0),icon:fw[0],desc:fw[1]};})};
  } catch(e){return{city:c.name,error:e.message};}
}

function getQibla(lat,lng) {
  const ML=21.3891*Math.PI/180,MLng=39.8579*Math.PI/180,ul=lat*Math.PI/180,ulng=lng*Math.PI/180,dL=MLng-ulng;
  const b=(Math.atan2(Math.sin(dL)*Math.cos(ML),Math.cos(ul)*Math.sin(ML)-Math.sin(ul)*Math.cos(ML)*Math.cos(dL))*180/Math.PI+360)%360;
  const dist=Math.round(6371*2*Math.asin(Math.sqrt(Math.pow(Math.sin((ML-ul)/2),2)+Math.cos(ul)*Math.cos(ML)*Math.pow(Math.sin(dL/2),2))));
  return {bearing:Math.round(b),distance:dist};
}

function getHolidays() {
  const now=new Date(),y=now.getFullYear();
  return [{name:'Founding Day',ar:'يوم التأسيس',date:`${y}-02-22`,flag:'🇸🇦'},
    {name:'Eid Al Fitr',ar:'عيد الفطر',date:`${y}-03-30`,flag:'🌙',note:'Approx'},
    {name:'Eid Al Adha',ar:'عيد الأضحى',date:`${y}-06-06`,flag:'🕋',note:'Approx'},
    {name:'Saudi National Day',ar:'اليوم الوطني',date:`${y}-09-23`,flag:'🇸🇦'}]
    .map(h=>{const diff=Math.ceil((new Date(h.date)-now)/864e5);return{...h,daysUntil:diff<0?diff+365:diff,passed:diff<0};})
    .sort((a,b)=>a.daysUntil-b.daysUntil);
}

export async function onRequestGet(context) {
  const url=new URL(context.request.url);
  const type=url.searchParams.get('type')||'health';
  const city=url.searchParams.get('city')||'riyadh';
  const all=url.searchParams.get('all')==='1';
  const lat=parseFloat(url.searchParams.get('lat')||'24.7136');
  const lng=parseFloat(url.searchParams.get('lng')||'46.6753');
  let data,cache=60;
  try {
    switch(type) {
      case 'prayer':   data=await getPrayer(city);cache=3600;break;
      case 'weather':  data=await getWeather(city,all);cache=1800;break;
      case 'holidays': data={holidays:getHolidays()};cache=3600;break;
      case 'qibla':    data=getQibla(lat,lng);cache=86400;break;
      default: data={status:'ok',app:'DigitalSaudi',v:'3.0'};
    }
    return new Response(JSON.stringify({success:true,...data}),{headers:{...CORS,'Content-Type':'application/json','Cache-Control':`public,max-age=${cache}`}});
  } catch(e) {
    return new Response(JSON.stringify({success:false,error:e.message}),{status:200,headers:{...CORS,'Content-Type':'application/json'}});
  }
}
export async function onRequestOptions(){return new Response(null,{headers:CORS});}
