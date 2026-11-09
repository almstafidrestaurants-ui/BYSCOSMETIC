// Cache static files and images to make repeat visits faster.
const CACHE_NAME = "bys-whish-manual-20261107-bys-discount-label-20261109-static-banner-v1";
const STATIC_FILES = ["./", "./index.html", "./style.css", "./script.js", "./catalog.js", "./manifest.webmanifest",
  "./opening.js?v=2",
  "./images/banners/bys-home.webp",
  "./images/bys-silver.webp",
  "./images/opening/opening-01.webp",
  "./images/opening/opening-02.webp",
  "./images/opening/opening-03.webp",
  "./images/opening/opening-04.webp",
  "./images/opening/opening-05.webp",
  "./images/opening/opening-06.webp",
  "./images/opening/opening-07.webp",
  "./images/opening/opening-08.webp",
  "./images/opening/opening-09.webp",
  "./images/opening/opening-10.webp",
  "./images/categories/skincare.svg",
  "./images/categories/body-care.svg",
  "./images/categories/hair-care.svg",
  "./images/categories/perfumes.svg",
  "./images/categories/feminine-care.svg",
  "./images/categories/bath-and-body.svg",
  "./images/categories/sun-care.svg",
  "./images/categories/accessories.svg"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_FILES)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
});
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  const url = new URL(request.url);
  if (url.pathname.includes("/images/")) {
    event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(request, copy)));
      }
      return response;
    })));
    return;
  }
  event.respondWith(fetch(request).then(response => {
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(request, copy)));
    }
    return response;
  }).catch(() => caches.match(request)));
});
