// DigitalSaudi service worker v3
// - App shell cached on install (works offline)
// - Network-first for GET requests, falling back to the last saved copy
// - Payments, Premium, AI and admin are never cached
const CACHE = 'digitalsaudi-v6';
const SHELL = ['/', '/index.html', '/manifest.json', '/icon.svg', '/icon-192.png', '/privacy.html', '/terms.html'];
const NEVER = ['/approve', '/complete', '/cancel-payment', '/premium', '/ai', '/admin-api', '/admin.html', '/admin', '/pi-check', '/dict', '/translate'];

self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin === location.origin && NEVER.includes(u.pathname)) return;
  if (u.hostname.endsWith('minepi.com')) return;                                   // Pi SDK always live
  if (/basemaps\.cartocdn\.com|tile\.openstreetmap\.org/.test(u.hostname)) return;       // map tiles: browser cache only
  if (req.destination === 'image' && u.origin !== location.origin) return;          // news images / crests
  if (/\.mp3(\?|$)/.test(u.pathname)) return;                                       // Quran audio streams live
  e.respondWith(
    fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then(r => r || (req.mode === 'navigate' ? caches.match('/index.html') : Response.error())))
  );
});
