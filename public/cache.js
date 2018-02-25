// Version 0.6.2
let version = '0.6.2';
importScripts('./cache-polyfill.js');

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('solavo').then(cache => {
            return cache.addAll([
                `/`,
            ])
                .then(() => self.skipWaiting());
        })
    )
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            return response || fetch(event.request);
        })
    );
});
