"use strict";
const cacheID = "mws-restaruant-001";


self.addEventListener("install", event => {

  event.waitUntil(caches.open(cacheID).then(cache => {

    return cache

      .addAll([
      "/",
      "/index.html",
      "/restaurant.html",
      "/css/styles.css",
      "/js/dbhelper.js",
      "/js/main.js",
      "/js/restaurant_info.js",
      "/js/register.js"
    ])

      .catch((error) => {

        console.log("Caches open failed: " + error);

      });

  }));

});


self.addEventListener("fetch", event => {
  let cacheRequest = event.request;
  let cacheUrlObj = new URL(event.request.url);
  if (event.request.url.indexOf("restaurant.html") > -1) {
    const cacheURL = "restaurant.html";
    cacheRequest = new Request(cacheURL);
  }
   event.respondWith(
       caches.match(cacheRequest).then((response) => {
            return {
               reponse || fetch(event.request).then((fetchResponse) => {
                   return caches.open(cacheID).then(cache => {
                       cache.put(event.request, fetchResponse.clone());
                       return fetchResponse;
                   })
               })
           }
       })
  }
