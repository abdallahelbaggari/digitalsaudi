// DigitalSaudi — /news  (Cloudflare Pages Function)
// Aggregates RSS feeds (headline, image, short summary, link back to the publisher),
// sorts newest first and serves pages of 12 for infinite scrolling. Cached 10 minutes.
// v6.0: large images (BBC 976px, Bing 1280px) and share images for stories whose feed has none.
//   /news?cat=all|saudi|hajj|business|sport|crypto|world&page=1

const FEEDS = [
  { url: 'https://feeds.bbci.co.uk/news/world/middle_east/rss.xml', source: 'BBC News' },
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', source: 'BBC News' },
  { url: 'https://feeds.bbci.co.uk/news/business/rss.xml', source: 'BBC News', force: 'business' },
  { url: 'https://www.aljazeera.com/xml/rss/all.xml', source: 'Al Jazeera' },
  { url: 'https://www.arabnews.com/cat/1/rss.xml', source: 'Arab News', force: 'saudi' },
  // v6.8: publishers' own feeds replace Bing News search feeds (Bing's feeds are for personal, non-commercial use only)
  { url: 'https://www.arabnews.com/rss.xml', source: 'Arab News' },
  { url: 'https://saudigazette.com.sa/rssFeed/74', source: 'Saudi Gazette', force: 'saudi' },
  { url: 'https://feeds.bbci.co.uk/sport/football/rss.xml', source: 'BBC Sport', sport: true },
  { url: 'https://cointelegraph.com/rss/tag/pi-network', source: 'Cointelegraph', crypto: true, pi: true },
  { url: 'https://cointelegraph.com/rss', source: 'Cointelegraph', crypto: true }
];
const PAGE_SIZE = 12;
const TTL = 600;

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json'
};
const json = (obj, maxAge) => new Response(JSON.stringify(obj), { status: 200, headers: { ...HEADERS, 'Cache-Control': 'public, max-age=' + (maxAge || 120) } });

const MEM = globalThis.__dsNewsMem || (globalThis.__dsNewsMem = { t: 0, items: null });

function decode(s) {
  return String(s || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
}
function strip(html) { return decode(decode(html)).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); }
function tag(xml, name) {
  const m = xml.match(new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)</' + name + '>', 'i'));
  return m ? m[1] : '';
}
function attr(xml, name, a) {
  const m = xml.match(new RegExp('<' + name + '\\s[^>]*' + a + '\\s*=\\s*["\']([^"\']+)["\']', 'i'));
  return m ? decode(m[1]) : '';
}
function hash(s) { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(36); }

const HAJJ = /\b(hajj|umrah|pilgrim|pilgrims|makkah|mecca|madinah|medina|nusuk|grand mosque|prophet'?s mosque|kaaba|haram)\b/i;
const SAUDI = /\b(saudi|riyadh|jeddah|ksa|neom|dammam|alula|vision 2030|crown prince)\b/i;

function categorise(it, feed) {
  const text = it.title + ' ' + it.summary;
  const tags = [];
  if (feed.force) { tags.push(feed.force); if (feed.force !== 'saudi' && SAUDI.test(text)) tags.push('saudi'); if (feed.force !== 'hajj' && HAJJ.test(text)) tags.push('hajj'); return tags; }
  if (feed.sport) { tags.push('sport'); if (SAUDI.test(text)) tags.push('saudi'); return tags; }
  if (feed.crypto) { if (feed.pi || /\bpi network\b|\bpi coin\b/i.test(text)) tags.push('crypto', 'pi'); else tags.push('crypto'); }
  else {
    if (HAJJ.test(text)) tags.push('hajj');
    if (/\/sports?\//i.test(it.link)) tags.push('sport');
    if (/\/(business|economy|markets?)/i.test(it.link)) tags.push('business');
    if (/\/saudi-arabia\//i.test(it.link) || /\/News\/saudi-arabia/i.test(it.link) || SAUDI.test(it.title)) tags.push('saudi');
    if (!tags.length) tags.push('world');
  }
  return tags;
}

// Ask the image servers for a large version instead of the small RSS thumbnail
function sharpen(img) {
  if (!img) return img;
  img = img.replace(/(ichef\.bbci\.co\.uk\/(?:ace\/(?:standard|ws)|news))\/\d{2,4}\//, '$1/976/');   // BBC: 240px → 976px
  img = img.replace(/([?&])(w|width)=\d{2,4}/, '$1$2=1200').replace(/([?&])(h|height)=\d{2,4}/, '$1$2=675');
  return img;
}

// Stories whose feed has no picture (Al Jazeera, some Arab News): read the article page's own
// share image (og:image). At most 25 per refresh, 4 s each; results are remembered for a day.
const OG = globalThis.__dsOgMem || (globalThis.__dsOgMem = { t: 0, map: {} });
async function readOgImage(link) {
  const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 4000);
  try {
    const r = await fetch(link, { signal: ctl.signal, headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36', 'Accept': 'text/html' }, cf: { cacheTtl: 86400 } });
    if (!r.ok || !r.body) return '';
    const reader = r.body.getReader(); let html = '', got = 0;
    while (got < 150000) { const { done, value } = await reader.read(); if (done) break; got += value.length; html += new TextDecoder().decode(value); if (/<\/head>/i.test(html)) break; }
    try { reader.cancel(); } catch (e) {}
    const m = html.match(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)(?::src)?["'][^>]*content=["']([^"']+)["']/i)
           || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["'](?:og:image|twitter:image)["']/i);
    let u = m ? decode(m[1]) : '';
    if (u.startsWith('//')) u = 'https:' + u;
    return /^https:\/\//.test(u) ? sharpen(u) : '';
  } catch (e) { return ''; } finally { clearTimeout(tm); }
}
async function fillImages(items) {
  const ck = new Request('https://cache.digitalsaudi.internal/news/og-map');
  if (!OG.t) { try { const hit = await caches.default.match(ck); if (hit) OG.map = await hit.json(); } catch (e) {} OG.t = Date.now(); }
  const need = items.filter(it => !it.img && !(it.link in OG.map)).slice(0, 25);
  if (need.length) {
    const got = await Promise.all(need.map(it => readOgImage(it.link)));
    need.forEach((it, i) => { OG.map[it.link] = got[i] || ''; });
    const keys = Object.keys(OG.map); if (keys.length > 600) keys.slice(0, keys.length - 600).forEach(k => delete OG.map[k]);
    try { await caches.default.put(ck, new Response(JSON.stringify(OG.map), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=86400' } })); } catch (e) {}
  }
  items.forEach(it => { if (!it.img && OG.map[it.link]) it.img = OG.map[it.link]; });
}

function parseFeed(xml, feed) {
  const out = [];
  const items = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || [];
  for (const raw of items) {
    const title = strip(tag(raw, 'title'));
    let link = strip(tag(raw, 'link')) || attr(raw, 'link', 'href');
    if (!title || !/^https?:\/\//.test(link)) continue;
    const content = tag(raw, 'content:encoded') || '';
    const desc = tag(raw, 'description') || '';
    let img = attr(raw, 'media:content', 'url') || attr(raw, 'media:thumbnail', 'url') || attr(raw, 'enclosure', 'url');
    if (!img) { const m = decode(content + desc).match(/<img[^>]+src=["']([^"']+)["']/i); if (m) img = m[1]; }
    if (img && !/^https:\/\//.test(img)) img = img.replace(/^http:\/\//, 'https://');
    if (img && /\.(mp4|mp3|m3u8)(\?|$)/i.test(img)) img = '';
    img = sharpen(img);
    let summary = strip(desc || content);
    if (summary.length > 420) summary = summary.slice(0, 417).replace(/\s+\S*$/, '') + '…';
    const date = Date.parse(strip(tag(raw, 'pubDate')) || strip(tag(raw, 'dc:date'))) || Date.now();
    let src = feed.source, ttl = title;
    if (feed.bing) {
      try { const real = new URL(link).searchParams.get('url'); if (real && /^https?:\/\//.test(real)) link = real; } catch (e) {}
      const bs = strip(tag(raw, 'News:Source')); if (bs) src = bs;
      const bi = strip(tag(raw, 'News:Image')); if (bi && !img) img = bi.replace(/^http:\/\//, 'https://') + (bi.indexOf('?') > 0 ? '&' : '?') + 'w=1280&h=720&c=7';
    }
    if (feed.google) { const ps = strip(tag(raw, 'source')); if (ps) { src = ps; ttl = title.replace(new RegExp('\\s+-\\s+' + ps.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$'), ''); } summary = ''; }
    const it = { id: hash(link), title: ttl, link, img: img || '', summary, source: src, date };
    it.tags = categorise(it, feed);
    it.cat = it.tags.indexOf('hajj') >= 0 ? 'hajj' : it.tags[0];
    out.push(it);
  }
  return out;
}

async function loadAll() {
  const now = Date.now();
  if (MEM.items && now - MEM.t < TTL * 1000) return MEM.items;
  const req = new Request('https://cache.digitalsaudi.internal/news/all');
  try { const hit = await caches.default.match(req); if (hit) { const items = await hit.json(); MEM.items = items; MEM.t = now; return items; } } catch (e) {}

  const status = [];
  const results = await Promise.allSettled(FEEDS.map(f =>
    fetch(f.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36', 'Accept': 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8', 'Accept-Language': 'en-US,en;q=0.9' }, cf: { cacheTtl: 300 } })
      .then(r => { if (!r.ok) throw new Error(f.url + ' ' + r.status); return r.text(); })
      .then(x => parseFeed(x, f))
  ));
  const seen = new Set();
  const items = [];
  results.forEach((r, i) => status.push({ source: FEEDS[i].source, ok: r.status === 'fulfilled', count: r.status === 'fulfilled' ? r.value.length : 0, error: r.status === 'rejected' ? String(r.reason && r.reason.message || r.reason).slice(0, 80) : undefined }));
  globalThis.__dsNewsStatus = status;
  for (const r of results) {
    if (r.status !== 'fulfilled') continue;
    for (const it of r.value) {
      const k = it.title.toLowerCase().replace(/\W+/g, '').slice(0, 80);
      if (seen.has(it.id) || seen.has(k)) continue;
      seen.add(it.id); seen.add(k);
      items.push(it);
    }
  }
  items.sort((a, b) => b.date - a.date);
  if (!items.length && MEM.items) return MEM.items;   // keep old stories if every feed failed
  try { await fillImages(items); } catch (e) {}
  MEM.items = items; MEM.t = now;
  try { await caches.default.put(req, new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=' + TTL } })); } catch (e) {}
  return items;
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const cat = url.searchParams.get('cat') || 'all';
  const page = Math.max(1, parseInt(url.searchParams.get('page'), 10) || 1);
  try {
    const all = await loadAll();
    let list;
    if (cat === 'all') list = all.filter(it => (it.tags.indexOf('crypto') < 0 || it.tags.indexOf('pi') >= 0) && !(it.tags.length === 1 && it.tags[0] === 'sport'));
    else list = all.filter(it => it.tags.indexOf(cat) >= 0);
    const start = (page - 1) * PAGE_SIZE;
    const items = list.slice(start, start + PAGE_SIZE).map(({ tags, ...rest }) => rest);
    const out = { ok: true, cat, page, total: list.length, hasMore: start + PAGE_SIZE < list.length, items };
    if (url.searchParams.get('debug')) out.feeds = globalThis.__dsNewsStatus || 'cached';
    return json(out);
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err), items: [], hasMore: false }, 10);
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: HEADERS });
}
