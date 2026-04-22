const CACHE_NAME = 'jom-mula-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/index.js',
  '/script.js',
  '/style.css',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;600&display=swap'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch Assets
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
