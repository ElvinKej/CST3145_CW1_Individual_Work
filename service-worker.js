var cacheName = "webstore-v1";
var cacheFiles = [
    "index.html",
    //"products.js",
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