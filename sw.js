/**
 * DigitalSaudi · Service Worker v4.0
 * Offline support · API cache · Fast loading
 */
const CACHE = 'ds-v4';
const STATIC = ['/', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  /* Cache prayer/weather/holiday API responses for offline */
  if (url.pathname === '/api') {
    e.respondWith(
      fetch(e.request, { signal: AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined })
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        }).catch(() => caches.match(e.request))
    );
    return;
  }
  /* Network-first for everything else */
  e.respondWith(
    fetch(e.request).catch(() =>
      caches.match(e.request).then(r => r || caches.match('/'))
    )
  );
});
