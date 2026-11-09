// Cache static files and images to make repeat visits faster.
const CACHE_NAME = "bys-whish-manual-20261107-bys-discount-label-20261109-header-v6";
const STATIC_FILES = ["./", "./index.html", "./style.css?v=header6", "./script.js?v=header6", "./images/ui/all-categories.svg", "./catalog.js?v=header6", "./manifest.webmanifest",
  "./opening.js?v=3",
  "./images/banners/bys-home.webp",
  "./images/bys-logo.jpeg",
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
  "./images/categories/glow-skin.png",
  "./images/categories/bbl-weight-gain.png",
  "./images/categories/hair-nails.png",
  "./images/categories/mens-performance.png",
  "./images/categories/feminine-care-libido.png",
  "./images/categories/flat-tummy-weight-loss-detox.png",
  "./images/categories/vitamins-wellness.png",
  "./images/categories/gym-fitness.png"
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
