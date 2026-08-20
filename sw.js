const CACHE_NAME = "grandpa-communicator-v5-guangrao-phrases";
const AUDIO_FILES = [
  ...Array.from({ length: 53 }, (_, index) => `/audio/grandpa-qwen/need-${index + 1}.wav`),
  "/audio/grandpa-qwen/quick-yes.wav",
  "/audio/grandpa-qwen/quick-no.wav",
  "/audio/grandpa-qwen/quick-help.wav",
];
const APP_SHELL = [
  "/",
  "/manifest.webmanifest",
  "/favicon.svg",
  "/app-icon-192.png",
  "/app-icon-512.png",
  ...AUDIO_FILES,
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(
      names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)),
    )),
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "CACHE_URLS" || !Array.isArray(event.data.urls)) return;
  const urls = event.data.urls.filter((value) => {
    try { return new URL(value).origin === self.location.origin; }
    catch { return false; }
  });
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urls)));
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === "navigate") return caches.match("/");
        return new Response("Offline", { status: 503, statusText: "Offline" });
      }),
  );
});
