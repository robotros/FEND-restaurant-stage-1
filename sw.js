"use strict";
const cacheID = "mws-restaruant-001";
const files = [
  "/",
  "/index.html",
  "/restaurant.html",
  "/css/styles.css",
  "/js/dbhelper.js",
  "/js/main.js",
  "/js/restaurant_info.js",
  "/js/register_sw.js"
  "/data/restaurants.json"
  "/img/1.jpg",
  "/img/2.jpg",
  "/img/3.jpg",
  "/img/4.jpg",
  "/img/5.jpg",
  "/img/6.jpg",
  "/img/7.jpg",
  "/img/8.jpg",
  "/img/9.jpg",
  "/img/10.jpg",
  ]

self.addEventListener("install", event => {
  event.waitUntil(caches.open(cacheID).then(cache => {
    return cache.addAll(files);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});