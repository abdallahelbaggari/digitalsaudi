// DigitalSaudi — /places  (Cloudflare Pages Function)
// Real places from OpenStreetMap via the Overpass API, cached 24 hours.
//   /places?cat=hotels&lat=21.4225&lng=39.8262&r=3000
// Categories: all, hotels, food, cafes, mosques, health, pharmacy, malls, attractions, transport, money, fuel

const HEADERS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Content-Type': 'application/json' };
const json = (o, age) => new Response(JSON.stringify(o), { status: 200, headers: { ...HEADERS, 'Cache-Control': 'public, max-age=' + (age || 600) } });
const ENDPOINTS = ['https://overpass-api.de/api/interpreter', 'https://overpass.private.coffee/api/interpreter', 'https://overpass.kumi.systems/api/interpreter', 'https://maps.mail.ru/osm/tools/overpass/api/interpreter'];
const TTL = 86400;
const MEM = globalThis.__dsPlaces || (globalThis.__dsPlaces = new Map());

const Q = {
  hotels: ['nwr["tourism"~"^(hotel|guest_house|apartment|hostel|motel)$"]["name"]'],
  food: ['nwr["amenity"~"^(restaurant|fast_food|food_court)$"]["name"]'],
  cafes: ['nwr["amenity"="cafe"]["name"]'],
  mosques: ['nwr["amenity"="place_of_worship"]["religion"="muslim"]["name"]'],
  health: ['nwr["amenity"~"^(hospital|clinic)$"]["name"]', 'nwr["healthcare"~"^(hospital|clinic)$"]["name"]'],
  pharmacy: ['nwr["amenity"="pharmacy"]["name"]'],
  malls: ['nwr["shop"="mall"]["name"]'],
  attractions: ['nwr["tourism"~"^(attraction|museum|viewpoint|theme_park|zoo|aquarium|gallery)$"]["name"]', 'nwr["historic"]["name"]'],
  transport: ['nwr["railway"="station"]["name"]', 'nwr["aeroway"="aerodrome"]["iata"]', 'nwr["amenity"="bus_station"]["name"]', 'nwr["station"="subway"]["name"]'],
  money: ['nwr["amenity"~"^(bank|atm|bureau_de_change)$"]'],
  fuel: ['nwr["amenity"="fuel"]']
};
Q.all = [].concat(Q.hotels, Q.food, Q.cafes, Q.pharmacy, Q.malls, Q.attractions, Q.health);

function catOf(t) {
  if (/^(hotel|guest_house|apartment|hostel|motel)$/.test(t.tourism || '')) return 'hotels';
  if (/^(restaurant|fast_food|food_court)$/.test(t.amenity || '')) return 'food';
  if (t.amenity === 'cafe') return 'cafes';
  if (t.amenity === 'place_of_worship') return 'mosques';
  if (/^(hospital|clinic)$/.test(t.amenity || t.healthcare || '')) return 'health';
  if (t.amenity === 'pharmacy') return 'pharmacy';
  if (t.shop === 'mall') return 'malls';
  if (t.railway === 'station' || t.aeroway || t.amenity === 'bus_station' || t.station) return 'transport';
  if (/^(bank|atm|bureau_de_change)$/.test(t.amenity || '')) return 'money';
  if (t.amenity === 'fuel') return 'fuel';
  return 'attractions';
}
function fallbackName(t, cat) {
  if (cat === 'money') return t.operator || t.brand || (t.amenity === 'atm' ? 'ATM' : 'Bank');
  if (cat === 'fuel') return t.brand || t.operator || 'Fuel station';
  if (cat === 'transport' && t.aeroway) return (t['name:en'] || t.name || t.iata) + (t.iata ? ' (' + t.iata + ')' : '');
  return '';
}
function clean(el, want) {
  const t = el.tags || {};
  const lat = el.lat != null ? el.lat : el.center && el.center.lat;
  const lng = el.lon != null ? el.lon : el.center && el.center.lon;
  if (lat == null || lng == null) return null;
  const cat = want === 'all' ? catOf(t) : want;
  const name = t['name:en'] || t.name || fallbackName(t, cat);
  if (!name) return null;
  const tags = {};
  const pick = (k, v) => { if (v) tags[k] = String(v).slice(0, 160); };
  pick('stars', t.stars); pick('cuisine', t.cuisine); pick('phone', t.phone || t['contact:phone']);
  pick('website', t.website || t['contact:website']); pick('hours', t.opening_hours);
  pick('street', t['addr:street']); pick('district', t['addr:district'] || t['addr:suburb']); pick('city', t['addr:city']);
  pick('brand', t['brand:en'] || t.brand); pick('ar', t['name:ar'] && t['name:ar'] !== name ? t['name:ar'] : '');
  return { id: el.type[0] + el.id, name, cat, lat: +lat.toFixed(6), lng: +lng.toFixed(6), tags };
}

function timed(url, opts, ms) {
  const c = new AbortController(); const t = setTimeout(() => c.abort(), ms);
  return fetch(url, { ...opts, signal: c.signal }).finally(() => clearTimeout(t));
}
// Ask several Overpass mirrors at once and use the first good answer.
async function overpass(query) {
  return Promise.any(ENDPOINTS.map(url => timed(url, { method: 'POST', body: 'data=' + encodeURIComponent(query), headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'DigitalSaudi/3.0 (Pi Network app; support.digitalsaudi.pi@gmail.com)' } }, 14000)
    .then(r => { if (!r.ok) throw new Error(url.split('/')[2] + ' ' + r.status); return r.json(); })
    .then(d => { if (!d || !Array.isArray(d.elements)) throw new Error('bad reply'); return d; })));
}

// Backup source: Photon (komoot) search, filtered to the radius.
const PHOTON = {
  hotels: [['hotel', 'tourism:hotel'], ['apartment', 'tourism:apartment']], food: [['restaurant', 'amenity:restaurant'], ['fast food', 'amenity:fast_food']],
  cafes: [['cafe', 'amenity:cafe']], mosques: [['mosque', 'amenity:place_of_worship']], health: [['hospital', 'amenity:hospital'], ['clinic', 'amenity:clinic']],
  pharmacy: [['pharmacy', 'amenity:pharmacy']], malls: [['mall', 'shop:mall']], attractions: [['museum', 'tourism:museum'], ['attraction', 'tourism:attraction']],
  transport: [['station', 'railway:station'], ['airport', 'aeroway:aerodrome'], ['bus station', 'amenity:bus_station']], money: [['bank', 'amenity:bank'], ['atm', 'amenity:atm']], fuel: [['fuel', 'amenity:fuel']]
};
PHOTON.all = [].concat(PHOTON.hotels, PHOTON.food, PHOTON.cafes, PHOTON.malls, PHOTON.attractions);
function km(a, b, c, d) { const r = Math.PI / 180, x = Math.sin((c - a) * r / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin((d - b) * r / 2) ** 2; return 12742 * Math.asin(Math.sqrt(x)); }
async function photon(cat, lat, lng, r) {
  const lists = await Promise.all(PHOTON[cat].map(([q, tag]) => timed('https://photon.komoot.io/api/?q=' + encodeURIComponent(q) + '&lat=' + lat + '&lon=' + lng + '&limit=50&osm_tag=' + tag, { headers: { 'User-Agent': 'DigitalSaudi/3.0' } }, 10000)
    .then(x => x.ok ? x.json() : { features: [] }).catch(() => ({ features: [] }))));
  const out = [];
  for (const d of lists) for (const f of (d.features || [])) {
    const p = f.properties || {}, c = (f.geometry || {}).coordinates || [];
    if (!p.name || c.length < 2 || km(lat, lng, c[1], c[0]) * 1000 > r * 1.5) continue;
    const t = {}; t[p.osm_key] = p.osm_value;
    out.push(clean({ type: (p.osm_type || 'N').toLowerCase().replace('n', 'node').replace('w', 'way').replace('r', 'relation'), id: p.osm_id, lat: c[1], lon: c[0], tags: { ...t, name: p.name, 'addr:street': p.street, 'addr:district': p.district, 'addr:city': p.city } }, cat));
  }
  return out.filter(Boolean);
}

export async function onRequestGet(context) {
  const u = new URL(context.request.url);
  const cat = u.searchParams.get('cat') || 'all';
  const lat = parseFloat(u.searchParams.get('lat')), lng = parseFloat(u.searchParams.get('lng'));
  let r = parseInt(u.searchParams.get('r'), 10) || 3000;
  if (!Q[cat]) return json({ ok: false, error: 'Unknown category' });
  if (!isFinite(lat) || !isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return json({ ok: false, error: 'Bad location' });
  r = Math.max(300, Math.min(r, cat === 'transport' ? 30000 : 10000));
  const key = cat + ':' + lat.toFixed(3) + ':' + lng.toFixed(3) + ':' + r;
  const now = Date.now(), m = MEM.get(key);
  if (m && now - m.t < TTL * 1000) return json(m.data, 3600);
  const creq = new Request('https://cache.digitalsaudi.internal/places/' + encodeURIComponent(key));
  try { const hit = await caches.default.match(creq); if (hit) { const data = await hit.json(); MEM.set(key, { t: now, data }); return json(data, 3600); } } catch (e) {}
  try {
    const around = `(around:${r},${lat},${lng})`;
    const query = `[out:json][timeout:20];(${Q[cat].map(q => q + around + ';').join('')});out center tags 200;`;
    // Overpass first; if it hasn't answered within 6 s, Photon joins the race. First useful answer wins.
    let raw, source = 'OpenStreetMap';
    const ov = overpass(query).then(d => ({ raw: d.elements.map(el => clean(el, cat)), source: 'OpenStreetMap' }));
    const ph = new Promise(res => setTimeout(res, 6000)).then(() => photon(cat, lat, lng, r)).then(list => { if (!list.length) throw new Error('photon empty'); return { raw: list, source: 'OpenStreetMap (Photon)' }; });
    try { const w = await Promise.any([ov, ph]); raw = w.raw; source = w.source; }
    catch (e) { throw new Error('No place servers answered'); }
    const seen = new Set();
    const places = raw.filter(p => {
      if (!p) return false;
      const k = p.name.toLowerCase() + ':' + p.lat.toFixed(3) + ':' + p.lng.toFixed(3);
      if (seen.has(k)) return false; seen.add(k); return true;
    });
    const data = { ok: true, cat, count: places.length, places, source };
    MEM.set(key, { t: now, data });
    if (MEM.size > 400) MEM.delete(MEM.keys().next().value);
    try { await caches.default.put(creq, new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=' + TTL } })); } catch (e) {}
    return json(data, 3600);
  } catch (err) {
    if (m) return json(m.data, 60);
    return json({ ok: false, error: String(err && err.message || err) }, 10);
  }
}
export async function onRequestOptions() { return new Response(null, { status: 204, headers: HEADERS }); }
