const CACHE_NAME = "game2048-pwa-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./2048小游戏.html",
  "./styles.css",
  "./game.js",
  "./manifest.webmanifest",
  "./icon-192.svg",
  "./icon-512.svg",
  "./assets/source/2.png",
  "./assets/source/4.png",
  "./assets/source/8.png",
  "./assets/source/16.png",
  "./assets/source/32.png",
  "./assets/source/64.png",
  "./assets/source/128.png",
  "./assets/source/256.png",
  "./assets/source/512.png",
  "./assets/source/1204.png",
  "./assets/source/2048.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isFreshResource =
    event.request.mode === "navigate" ||
    (isSameOrigin && [".html", ".css", ".js", ".webmanifest"].some((ext) => requestUrl.pathname.endsWith(ext)));

  if (isFreshResource) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html"))),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    }),
  );
});
