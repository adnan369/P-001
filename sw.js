const CACHE_NAME = 'adnan-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/core.js',
  '/js/admin.js',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600;900&display=swap'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch Assets from Cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
