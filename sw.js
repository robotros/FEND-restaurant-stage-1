"use strict";
const cacheID = "mws-restaruant-001";


self.addEventListener("install", event => {
  event.waitUntil(caches.open(cacheID).then(cache => {
    return cache.addAll(
      [
        "/",
        "/index.html",
        "/restaurant.html",
        "/css/styles.css",
        "/js/dbhelper.js",
        "/js/main.js",
        "/js/restaurant_info.js",
        "/js/register_sw.js"
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});