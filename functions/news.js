// DigitalSaudi — /news  (Cloudflare Pages Function)
// Aggregates RSS feeds (headline, image, short summary, link back to the publisher),
// sorts newest first and serves pages of 12 for infinite scrolling. Cached 10 minutes.
//   /news?cat=all|saudi|hajj|business|sport|crypto|world&page=1

const FEEDS = [
  { url: 'https://www.arabnews.com/rss.xml', source: 'Arab News' },
  { url: 'https://english.alarabiya.net/feed/rss2/en.xml', source: 'Al Arabiya' },
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
    let summary = strip(desc || content);
    if (summary.length > 420) summary = summary.slice(0, 417).replace(/\s+\S*$/, '') + '…';
    const date = Date.parse(strip(tag(raw, 'pubDate')) || strip(tag(raw, 'dc:date'))) || Date.now();
    const it = { id: hash(link), title, link, img: img || '', summary, source: feed.source, date };
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

  const results = await Promise.allSettled(FEEDS.map(f =>
    fetch(f.url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DigitalSaudiNews/1.0)', 'Accept': 'application/rss+xml, application/xml, text/xml' }, cf: { cacheTtl: 300 } })
      .then(r => { if (!r.ok) throw new Error(f.url + ' ' + r.status); return r.text(); })
      .then(x => parseFeed(x, f))
  ));
  const seen = new Set();
  const items = [];
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
    if (cat === 'all') list = all.filter(it => it.tags.indexOf('crypto') < 0 || it.tags.indexOf('pi') >= 0);
    else list = all.filter(it => it.tags.indexOf(cat) >= 0);
    const start = (page - 1) * PAGE_SIZE;
    const items = list.slice(start, start + PAGE_SIZE).map(({ tags, ...rest }) => rest);
    return json({ ok: true, cat, page, total: list.length, hasMore: start + PAGE_SIZE < list.length, items });
  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err), items: [], hasMore: false }, 10);
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: HEADERS });
}
