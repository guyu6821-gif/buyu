const CACHE_NAME = 'unifybdu-offline-v3';

// All assets to cache for offline
const ASSETS_TO_CACHE = [
  '/',
  '/static/style.css',
  '/static/app.js',
  '/static/calculator.js',
  '/static/manifest.json',
  '/static/icon-192.png',
  '/static/icon-512.png',
  '/static/logo.png'
];

// Install - cache everything immediately
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching all assets');
      
      // Cache our assets one by one to avoid failures
      const cachePromises = ASSETS_TO_CACHE.map(url => {
        return fetch(url)
          .then(response => {
            if (response.ok) {
              return cache.put(url, response);
            }
            console.warn('[SW] Failed to cache:', url);
            return null;
          })
          .catch(err => {
            console.error('[SW] Error caching:', url, err);
            return null;
          });
      });
      
      return Promise.all(cachePromises);
    }).then(() => {
      console.log('[SW] All assets cached successfully');
      return self.skipWaiting();
    })
  );
});

// Activate - clean old caches and take control immediately
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Service worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch - Cache First, then Network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip chrome extensions and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] Serving from cache:', event.request.url);
          return cachedResponse;
        }
        
        console.log('[SW] Fetching from network:', event.request.url);
        
        return fetch(event.request)
          .then((networkResponse) => {
            // Only cache successful GET requests
            if (event.request.method === 'GET' && networkResponse && networkResponse.status === 200) {
              // Clone response before caching
              const responseToCache = networkResponse.clone();
              
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            
            return networkResponse;
          })
          .catch((error) => {
            console.error('[SW] Fetch failed, trying cache:', error);
            
            // If network fails, try to return cached version of homepage
            if (event.request.mode === 'navigate') {
              return caches.match('/').then((cachedHome) => {
                if (cachedHome) {
                  return cachedHome;
                }
                
                // Return offline page
                return new Response(
                  `<!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Offline - UniFy</title>
                    <style>
                      body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        text-align: center;
                        padding: 20px;
                      }
                      .offline-message {
                        max-width: 400px;
                      }
                      h1 { font-size: 3em; margin: 0; }
                      p { font-size: 1.2em; margin: 20px 0; }
                    </style>
                  </head>
                  <body>
                    <div class="offline-message">
                      <h1>📵</h1>
                      <h2>Offline</h2>
                      <p>Internet bağlantınız yoxdur. Zəhmət olmasa yenidən cəhd edin.</p>
                      <button onclick="location.reload()" style="background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold;">
                        Yenilə
                      </button>
                    </div>
                  </body>
                  </html>`,
                  {
                    headers: { 'Content-Type': 'text/html' }
                  }
                );
              });
            }
            
            return new Response('Offline - məlumat əlçatan deyil', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }
});
