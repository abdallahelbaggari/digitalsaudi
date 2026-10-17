// /weather?lat=21.42&lon=39.83
// Weather from MET Norway (api.met.no Locationforecast 2.0), licensed CC BY 4.0, free for commercial use.
// MET asks apps to call it from a server with an identifying User-Agent and to cache responses,
// so this function does both and returns the same shape the app used before, so the screens don't change.

const UA = 'DigitalSaudi/5.9 digitalsaudi.pages.dev support.digitalsaudi.pi@gmail.com';
const TTL = 1800; // 30 minutes

// MET symbol → the weather codes the app already draws icons for
function code(sym) {
  if (!sym) return null;
  const s = String(sym).replace(/_(day|night|polartwilight)$/, '');
  if (/thunder/.test(s)) return 95;
  if (s === 'clearsky') return 0;
  if (s === 'fair') return 1;
  if (s === 'partlycloudy') return 2;
  if (s === 'cloudy') return 3;
  if (s === 'fog') return 45;
  if (/^heavyrainshowers/.test(s)) return 82;
  if (/^heavyrain/.test(s)) return 65;
  if (/^lightrainshowers|^rainshowers/.test(s)) return 80;
  if (/^lightrain/.test(s)) return 51;
  if (/rain/.test(s)) return 61;
  return 3; // sleet / snow (very rare in Saudi Arabia) → shown as cloudy
}
// "feels like" (apparent temperature, Australian Bureau of Meteorology formula)
function feels(t, rh, ws) {
  if (t == null || rh == null || ws == null) return t;
  const e = rh / 100 * 6.105 * Math.exp(17.27 * t / (237.7 + t));
  return t + 0.33 * e - 0.70 * ws - 4.0;
}
const riyadhDate = (iso) => new Date(Date.parse(iso) + 3 * 3600e3).toISOString().slice(0, 10);
const riyadhHour = (iso) => new Date(Date.parse(iso) + 3 * 3600e3).getUTCHours();

function shape(met) {
  const ts = (met && met.properties && met.properties.timeseries) || [];
  if (!ts.length) return null;
  const now = Date.now();
  const cur = ts.find((x) => Date.parse(x.time) >= now - 3600e3) || ts[0];
  const d = cur.data.instant.details;
  const sym = (cur.data.next_1_hours || cur.data.next_6_hours || {}).summary;
  const current = {
    time: cur.time,
    temperature_2m: d.air_temperature,
    apparent_temperature: Math.round(feels(d.air_temperature, d.relative_humidity, d.wind_speed) * 10) / 10,
    relative_humidity_2m: Math.round(d.relative_humidity),
    weather_code: code(sym && sym.symbol_code),
    wind_speed_10m: Math.round(d.wind_speed * 3.6 * 10) / 10,
  };
  const days = new Map();
  for (const x of ts) {
    const k = riyadhDate(x.time), det = x.data.instant.details;
    if (!days.has(k)) days.set(k, { max: -99, min: 99, uv: null, sym: null, symDist: 99 });
    const o = days.get(k), n6 = x.data.next_6_hours, n1 = x.data.next_1_hours;
    if (det.air_temperature != null) { o.max = Math.max(o.max, det.air_temperature); o.min = Math.min(o.min, det.air_temperature); }
    if (n6 && n6.details) {
      if (n6.details.air_temperature_max != null) o.max = Math.max(o.max, n6.details.air_temperature_max);
      if (n6.details.air_temperature_min != null) o.min = Math.min(o.min, n6.details.air_temperature_min);
    }
    if (det.ultraviolet_index_clear_sky != null) o.uv = Math.max(o.uv || 0, det.ultraviolet_index_clear_sky);
    const s = (n6 && n6.summary) || (n1 && n1.summary), dist = Math.abs(riyadhHour(x.time) - 12);
    if (s && dist < o.symDist) { o.sym = s.symbol_code; o.symDist = dist; }
  }
  const keys = [...days.keys()].filter((k) => days.get(k).max > -99).slice(0, 7);
  return {
    current,
    daily: {
      time: keys,
      weather_code: keys.map((k) => code(days.get(k).sym)),
      temperature_2m_max: keys.map((k) => Math.round(days.get(k).max * 10) / 10),
      temperature_2m_min: keys.map((k) => Math.round(days.get(k).min * 10) / 10),
      uv_index_max: keys.map((k) => days.get(k).uv),
    },
    source: 'MET Norway',
    license: 'CC BY 4.0',
    updated: (met.properties.meta && met.properties.meta.updated_at) || null,
  };
}

const json = (body, status = 200, extra = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', ...extra } });

export async function onRequestGet({ request, waitUntil }) {
  const u = new URL(request.url);
  const lat = parseFloat(u.searchParams.get('lat')), lon = parseFloat(u.searchParams.get('lon'));
  if (!isFinite(lat) || !isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return json({ ok: false, error: 'lat and lon required' }, 400);
  const la = lat.toFixed(2), lo = lon.toFixed(2);
  const cache = caches.default, key = new Request('https://cache.digitalsaudi.internal/weather/' + la + ',' + lo);
  const hit = await cache.match(key);
  if (hit) return hit;
  try {
    const r = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=' + la + '&lon=' + lo, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
    if (!r.ok) return json({ ok: false, error: 'weather source unavailable' }, 502);
    const out = shape(await r.json());
    if (!out) return json({ ok: false, error: 'no forecast' }, 502);
    const res = json({ ok: true, ...out }, 200, { 'Cache-Control': 'public, max-age=' + TTL });
    waitUntil(cache.put(key, res.clone()));
    return res;
  } catch (e) {
    return json({ ok: false, error: 'weather source unavailable' }, 502);
  }
}
