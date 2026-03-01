const CACHE_VERSION = 'v4';
const CACHE_NAME = `unifybdu-${CACHE_VERSION}`;

// CRITICAL: All URLs must be cached
const urlsToCache = [
  '/',
  '/static/style.css',
  '/static/app.js',
  '/static/calculator.js',
  '/static/manifest.json',
  '/static/icon-192.png',
  '/static/icon-512.png',
  '/static/logo.png'
];

// Install event - cache everything NOW
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Caching app shell');
        // Use addAll for atomic operation
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[ServiceWorker] Cached all files');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[ServiceWorker] Cache failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName.startsWith('unifybdu-') && cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[ServiceWorker] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - CACHE FIRST ALWAYS
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        // If we have it in cache, return it immediately
        if (cachedResponse) {
          console.log('[ServiceWorker] FROM CACHE:', request.url);
          return cachedResponse;
        }
        
        // Not in cache, try network
        console.log('[ServiceWorker] FROM NETWORK:', request.url);
        return fetch(request)
          .then(response => {
            // Don't cache if not a success
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Add to cache for next time
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.error('[ServiceWorker] Fetch failed:', error);
            
            // If this is a navigation request, return the cached homepage
            if (request.mode === 'navigate') {
              return caches.match('/');
            }
            
            return new Response('Network error', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});
