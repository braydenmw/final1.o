
const CACHE_NAME = 'bwga-nexus-cache-v19';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/@babel/standalone@7/babel.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'index.tsx'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        const cachePromises = urlsToCache.map(urlToCache => {
            return cache.add(urlToCache).catch(err => {
                console.warn(`Failed to cache ${urlToCache}:`, err);
            });
        });
        return Promise.all(cachePromises);
      })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.url.includes('/api/nexus')) {
    // Let non-GET requests and API calls pass through to the network
    return;
  }

  // Use a "Network falling back to cache" strategy
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        // Try to fetch the resource from the network first.
        const networkResponse = await fetch(event.request);
        
        // If the fetch is successful, update the cache with the new version.
        // We only cache valid responses from same-origin or CORS-enabled sources.
        if (networkResponse && networkResponse.ok && event.request.url.startsWith('http')) {
           cache.put(event.request, networkResponse.clone());
        }
        
        return networkResponse;
      } catch (error) {
        // If the network request fails (e.g., user is offline),
        // try to serve the resource from the cache instead.
        console.warn(`Network request for ${event.request.url} failed, trying cache.`);
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        // If the resource is not in the cache either, the request will fail,
        // which is the expected behavior for an offline user with no cached version.
        throw error;
      }
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
