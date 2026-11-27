// DigitalSaudi service worker v3
// - App shell cached on install (works offline)
// - Pages and app files open at once from the phone; the newest copy is fetched in the background and used from the next opening
// - Payments, Premium, AI and admin are never cached
const CACHE = 'digitalsaudi-v67';
const SHELL = ['/', '/index.html', '/manifest.json', '/icon.svg', '/icon-192.png', '/privacy.html', '/terms.html', '/ds-quran-list.json', '/ds-hadith.json'];
const NEVER = ['/transfer', '/users', '/setup.html', '/file', '/f/', '/r/', '/history', '/approve', '/complete', '/cancel-payment', '/premium', '/ai', '/admin-api', '/admin.html', '/admin', '/pi-check', '/dict', '/translate', '/poster-file', '/match', '/quran-audio', '/hadith-audio', '/referral', '/verify', '/recover', '/staff', '/report', '/merchants', '/fx'];

self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin === location.origin && (NEVER.includes(u.pathname) || /^\/(f|r)\//.test(u.pathname))) return;
  if (u.hostname.endsWith('minepi.com')) return;                                   // Pi SDK always live
  if (/basemaps\.cartocdn\.com|tile\.openstreetmap\.org/.test(u.hostname)) return;       // map tiles: browser cache only
  if (req.destination === 'image' && u.origin !== location.origin) return;          // news images / crests
  if (/\.(mp3|mp4|webm)(\?|$)/.test(u.pathname)) return;                                       // Quran audio streams live
  // Quran list, 40 Hadith and surah text never change: answer from the phone at once, refresh quietly in the background
  if (u.origin === location.origin && (/^\/ds-(quran-list|hadith)\.json$/.test(u.pathname) || (u.pathname === '/quran' && u.search))) {
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res && res.ok) c.put(req, res.clone()); return res; });
      if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
      return net;
    })));
    return;
  }
  // Wallet files carry a version number: answer from the phone at once (a new version has a new number)
  if (u.origin === location.origin && /^\/wallet[\w-]*(\/[\w-]+)?\.(js|css)$/.test(u.pathname) && /[?&]v=/.test(u.search)) {
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => hit || fetch(req).then(res => { if (res && res.ok) c.put(req, res.clone()); return res; }))));
    return;
  }
  // app pages and files open at once from the phone and refresh in the background;
  // anything else (live scores, news, weather, other sites) stays network first, with the saved copy when offline
  const fileLike = u.origin === location.origin && (req.mode === 'navigate' || /\.(js|css|json|png|jpe?g|webp|svg|ico|woff2?|html|webmanifest)$/.test(u.pathname));
  if (!fileLike) {
    e.respondWith(fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; })
      .catch(() => caches.match(req).then(r => r || Response.error())));
    return;
  }
  const net = fetch(req).then(res => {
    if (res && (res.ok || res.type === 'opaque') && !res.redirected) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  });
  e.respondWith(caches.match(req).then(hit => {
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net.catch(() => req.mode === 'navigate' ? caches.match('/index.html') : Response.error());
  }));
});

// Tapping a phone notification opens (or focuses) DigitalSaudi
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow ? self.clients.openWindow('/') : null;
  }));
});

function SKIP(u) { return NEVER.includes(u.pathname) || /^\/(f|r)\//.test(u.pathname) || !(/\.(js|css|json|png|jpe?g|webp|svg|ico|woff2?|html|webmanifest)$/.test(u.pathname) || u.pathname === '/' || u.pathname === '/wallet'); }
// the app sends the list of its own files once loaded, so the next opening needs no network
self.addEventListener('message', function (e) {
  var L = e.data && e.data.warm; if (!Array.isArray(L)) return;
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(L.slice(0, 120).map(function (p) {
      var u; try { u = new URL(p, self.location.origin); } catch (x) { return null; }
      if (u.origin !== self.location.origin || SKIP(u)) return null;
      return c.match(u.href).then(function (hit) { if (hit) return null; return fetch(u.href).then(function (res) { if (res && res.ok && !res.redirected) return c.put(u.href, res); }).catch(function () {}); });
    }));
  }));
});
