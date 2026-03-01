const CACHE_NAME = 'unifybdu-v2';
const urlsToCache = [
  '/',
  '/static/style.css',
  '/static/app.js',
  '/static/calculator.js',
  '/static/manifest.json',
  '/static/icon-192.png',
  '/static/icon-512.png',
  '/static/logo.png',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css'
];

// Install Service Worker - aggressive caching
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching app shell');
        return cache.addAll(urlsToCache.map(url => {
          return new Request(url, { cache: 'reload' });
        })).catch(err => {
          console.log('[SW] Cache addAll error:', err);
          // Try caching individually
          return Promise.all(
            urlsToCache.map(url => {
              return cache.add(url).catch(err => {
                console.log('[SW] Failed to cache:', url);
              });
            })
          );
        });
      })
  );
  self.skipWaiting();
});

// Fetch - Cache First Strategy for offline support
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response immediately
        if (response) {
          console.log('[SW] Serving from cache:', event.request.url);
          return response;
        }
        
        // Not in cache - fetch from network
        console.log('[SW] Fetching from network:', event.request.url);
        return fetch(event.request).then(
          (response) => {
            // Check if valid response
            if (!response || response.status !== 200) {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the fetched response for future offline use
            caches.open(CACHE_NAME)
              .then((cache) => {
                // Only cache GET requests
                if (event.request.method === 'GET') {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          }
        ).catch(() => {
          // Network failed and not in cache - return cached home page
          console.log('[SW] Network failed, serving cached home');
          return caches.match('/');
        });
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  return self.clients.claim();
});

// Message handler
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
