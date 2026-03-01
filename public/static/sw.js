const CACHE_VERSION = 'v5-offline';
const CACHE_NAME = `unifybdu-${CACHE_VERSION}`;
const OFFLINE_URL = '/';

// CRITICAL: Everything needed for offline
const CRITICAL_ASSETS = [
  '/',
  '/static/style.css',
  '/static/app.js',
  '/static/calculator.js',
  '/static/manifest.json',
  '/static/icon-192.png',
  '/static/icon-512.png',
  '/static/logo.png'
];

// Install - Pre-cache EVERYTHING for offline start
self.addEventListener('install', event => {
  console.log('[SW] Installing for OFFLINE START...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-caching critical assets for offline');
        // Cache all critical assets - MUST work offline
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => {
        console.log('[SW] All critical assets cached - OFFLINE READY');
        // Force this SW to become active immediately
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Pre-cache FAILED:', error);
        throw error;
      })
  );
});

// Activate - Take control immediately
self.addEventListener('activate', event => {
  console.log('[SW] Activating for OFFLINE START...');
  
  event.waitUntil(
    Promise.all([
      // Delete old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName.startsWith('unifybdu-') && cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Take control of all pages immediately (including offline)
      self.clients.claim()
    ]).then(() => {
      console.log('[SW] OFFLINE START READY - Can launch without internet!');
    })
  );
});

// Fetch - OFFLINE FIRST strategy for PWA
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }
  
  // OFFLINE FIRST: Try cache first, then network
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          console.log('[SW] ✅ FROM CACHE (OFFLINE OK):', url.pathname);
          return cachedResponse;
        }
        
        // Not in cache - fetch from network
        console.log('[SW] 🌐 FROM NETWORK:', url.pathname);
        
        return fetch(request)
          .then(response => {
            // Cache successful responses
            if (response && response.status === 200 && response.type === 'basic') {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(request, responseToCache);
              });
            }
            return response;
          })
          .catch(error => {
            console.error('[SW] ❌ FETCH FAILED (OFFLINE?):', url.pathname);
            
            // If navigation request fails (no internet), serve cached homepage
            if (request.mode === 'navigate') {
              return caches.match(OFFLINE_URL).then(cached => {
                if (cached) {
                  console.log('[SW] 📵 SERVING CACHED PAGE FOR OFFLINE START');
                  return cached;
                }
                
                // Ultimate fallback - simple offline page
                return new Response(
                  `<!DOCTYPE html>
                  <html lang="az">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>UniFy - Offline</title>
                    <style>
                      body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        margin: 0;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        text-align: center;
                        padding: 20px;
                      }
                      .container { max-width: 400px; }
                      h1 { font-size: 4em; margin: 0; }
                      h2 { margin: 10px 0; }
                      p { opacity: 0.9; line-height: 1.6; }
                      button {
                        background: white;
                        color: #667eea;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: bold;
                        cursor: pointer;
                        margin-top: 20px;
                      }
                      button:hover { opacity: 0.9; }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <h1>📵</h1>
                      <h2>Offline</h2>
                      <p>İnternet bağlantınız yoxdur. Zəhmət olmasa tətbiqi bir dəfə internet ilə açın ki, offline istifadə üçün hazır olsun.</p>
                      <button onclick="location.reload()">🔄 Yenidən Cəhd Et</button>
                    </div>
                  </body>
                  </html>`,
                  {
                    status: 200,
                    headers: { 
                      'Content-Type': 'text/html',
                      'Cache-Control': 'no-cache'
                    }
                  }
                );
              });
            }
            
            // For other requests, return error response
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Message handler for updates
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Log when SW becomes active
self.addEventListener('activate', event => {
  console.log('[SW] 🚀 ACTIVE - APP CAN START OFFLINE NOW!');
});
