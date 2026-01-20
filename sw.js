const CACHE_NAME = 'posemetre-pro-v2';
const STATIC_CACHE = 'posemetre-static-v2';
const DYNAMIC_CACHE = 'posemetre-dynamic-v2';

// Fichiers essentiels à mettre en cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/styles-light.css',
  '/app.js',
  '/i18n.js',
  '/theme-switcher.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

// Installation du service worker
self.addEventListener('install', event => {
  console.log('[SW] Installation en cours...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Mise en cache des ressources statiques');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Installation terminée');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('[SW] Erreur lors de l\'installation:', err);
      })
  );
});

// Activation du service worker
self.addEventListener('activate', event => {
  console.log('[SW] Activation en cours...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Suppression ancien cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activation terminée');
        return self.clients.claim();
      })
  );
});

// Stratégie de cache: Stale-While-Revalidate pour les ressources statiques
// Network-First pour les autres requêtes
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorer les requêtes externes
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        // Stale-While-Revalidate: retourner le cache immédiatement
        // et mettre à jour en arrière-plan
        const fetchPromise = fetch(request)
          .then(networkResponse => {
            // Mettre à jour le cache avec la nouvelle réponse
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(DYNAMIC_CACHE)
                .then(cache => {
                  cache.put(request, responseClone);
                });
            }
            return networkResponse;
          })
          .catch(err => {
            console.log('[SW] Erreur réseau:', err);
            // En cas d'erreur réseau, retourner le cache ou une page offline
            return cachedResponse;
          });

        // Retourner le cache si disponible, sinon attendre le réseau
        return cachedResponse || fetchPromise;
      })
  );
});

// Gestion des messages (pour les mises à jour)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Gestion des notifications push (préparation pour PWABuilder)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Nouvelle notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Assistant Posemètre Pro', options)
  );
});

// Gestion du clic sur les notifications
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
