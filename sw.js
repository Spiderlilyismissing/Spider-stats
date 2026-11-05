/* Spider Stats: network-first app files, cached images and offline fallback. */
const CACHE_NAME = 'spider-stats-redesign-51';
const CACHE_PREFIXES = ['spider-shell-', 'spider-stats-'];
const OFFLINE_FILES = ['./index.html', './styles.css', './game-data.js', './rank-art.js', './app.js', './artwork.js', './spider-features.js', './collection-catalog.json', './artwork-manifest.json', './manifest.webmanifest', './icon.svg', './spider-logo.svg'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(OFFLINE_FILES.map(async file => {
      const response = await fetch(new Request(file, { cache: 'no-store' }));
      if (response.ok) await cache.put(file, response);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => CACHE_PREFIXES.some(prefix => key.startsWith(prefix)) && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;

  const networkFirst = request.mode === 'navigate' || request.destination !== 'image';
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    if (networkFirst) {
      try {
        const response = await fetch(request, { cache: 'no-store' });
        if (response.ok) {
          await cache.put(request, response.clone());
          if (request.mode === 'navigate') await cache.put('./index.html', response.clone());
        }
        return response;
      } catch (error) {
        const cached = await cache.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') {
          const fallback = await cache.match('./index.html');
          if (fallback) return fallback;
        }
        throw error;
      }
    }
    const cached = await cache.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  })());
});
