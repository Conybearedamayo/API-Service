const CACHE_NAME = 'joke-app-cache-v1';
const API_URL = 'https://official-joke-api.appspot.com/random_joke';


const CACHE_FILES = [
    '/',
    '/index.html',
    '/cons.css',
    '/cons.js',
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching static assets');
            return cache.addAll(CACHE_FILES);
        })
    );
});


self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', (event) => {

    if (event.request.url.startsWith(API_URL)) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {

                    return cachedResponse;
                }


                return fetch(event.request).then((networkResponse) => {
                    if (networkResponse.ok) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                        return networkResponse;
                    }
                    return networkResponse;
                });
            })
        );
    } else {

        event.respondWith(fetch(event.request));
    }
});