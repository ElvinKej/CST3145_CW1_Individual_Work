var cacheName = "webstore-v1";
var cacheFiles = [
    "index.html",
    "products.js",
    "Pictures/Art.png",
    "Pictures/Economics.png",
    "Pictures/English.png",
    "Pictures/French.png",
    "Pictures/History.png",
    "Pictures/Geography.png",
    "Pictures/Maths.png",
    "Pictures/Music.png",
    "Pictures/Spanish.png",
    "Pictures/Science.png",
];

self.addEventListener("install", function(e) {
    console.log("[Service Worker] Install");
    e.waitUntil(caches.open(cacheName).then(function(cache) {
        console.log("[Service Worker] Caching files");
        return cache.addAll(cacheFiles);
    }));
});

//Static Caching
self.addEventListener('fetch', function (e) {
    e.respondWith (
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource:' + e.request.url);
            return r;
        })
    );
});

//Dynamic Caching
self.addEventListener("fetch", function(e) {
    e.respondWith(
        caches.match(e.request).then(function (cachedFile) {
            if (cachedFile) {
                console.log("[Service Worker] Resource fetched from the cache for: " + e.request.url);
                return cachedFile;
            } else { 
                return fetch(e.request).then(function (response) {
                    return caches.open(cacheName).then(function (cache) {
                        cache.put(e.request, response.clone());
                        console.log("[Service Worker] Resource fetched and saved in the cache for: " + e.request.url);
                        return response;
                    });
                });
            }
        })
    );
});