/* eslint-env serviceworker */

const cacheName = 'binary-clock';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName).then((c) => c.addAll([
    './',
    './index.html',
    './index.css',
    './index.js',
    './binary-clock.js'
  ])));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(
      (r) => r || fetch(event.request).then(
        (response) => caches.open(cacheName).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        })
      )
    )
  );
});
