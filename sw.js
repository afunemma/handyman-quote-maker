const CACHE_NAME = 'handyman-quote-v7';
const APP_SHELL = [
    './',
    './index.html',
    './manifest.json',
    './icon.svg',
    './icon-192.png',
    './icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(names => Promise.all(names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))))
            .then(() => self.clients.claim())
    );
});

function cacheResponse(request, response) {
    if (response && response.status === 200 && response.type === 'basic') {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
    }
    return response;
}

self.addEventListener('fetch', event => {
    const { request } = event;
    if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

    // Pages: network first so updates show up, fall back to the cached app when offline
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(response => cacheResponse(request, response))
                .catch(() => caches.match(request).then(cached => cached || caches.match('./index.html')))
        );
        return;
    }

    // Icons, manifest etc: cache first, refresh in the background
    event.respondWith(
        caches.match(request).then(cached => {
            const network = fetch(request)
                .then(response => cacheResponse(request, response))
                .catch(() => cached);
            return cached || network;
        })
    );
});
