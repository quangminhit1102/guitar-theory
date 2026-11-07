const VERSION = "2026-11-07-1";
const CACHE = "gt-static-" + VERSION;
const BOOK = "music-theory-for-guitarists-kolb/";
const CHAPTERS = [
  "ch01-fretboard.html",
  "ch02-theory-basics.html",
  "ch03-scales-key-signatures.html",
  "ch04-intervals.html",
  "ch05-triads.html",
  "ch06-harmonizing-major-scale.html",
  "ch07-chord-construction.html",
  "ch08-harmonizing-minor-scale.html",
  "ch09-key-centers.html",
  "ch10-blues-pentatonic.html",
  "ch11-modes-modal-harmony.html",
  "ch12-other-scales-arpeggios.html",
  "ch13-substitution-reharmonization.html"
];

const PRECACHE = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/shell.css",
  "assets/shell.js",
  "assets/quiz.js",
  "assets/cards.js",
  "assets/diagrams.js",
  "assets/pwa.js",
  "assets/favicon.svg",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/data/library.js",
  BOOK + "index.html",
  BOOK + "glossary.html",
  BOOK + "data/book.js",
  BOOK + "data/glossary.js"
]
  .concat(CHAPTERS.map((file) => BOOK + "chapters/" + file))
  .concat(CHAPTERS.map((file, i) => BOOK + "data/ch" + String(i + 1).padStart(2, "0") + ".js"));

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.all(PRECACHE.map((url) => cache.add(url).catch(() => null)))
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => {
          if (request.mode === "navigate") return caches.match("./index.html");
          return new Response("", { status: 503, statusText: "Offline" });
        });
    })
  );
});
