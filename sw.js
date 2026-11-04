// تخزين ملفات الواجهة الأساسية فقط - بدون حفظ بيانات الطلبات الحساسة
const CACHE_NAME = "bys-role-v1";
const STATIC_FILES = ["./", "./index.html", "./style.css", "./script.js", "./catalog.js", "./manifest.webmanifest"];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_FILES)));
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(Promise.all([
        caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
        self.clients.claim()
    ]));
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
    event.respondWith(fetch(event.request).then((response) => {
        if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
    }).catch(() => caches.match(event.request)));
});
