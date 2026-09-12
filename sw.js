const CACHE_NAME = "grandpa-communicator-v25-runtime-cache-bust";
const AUDIO_FILES = [
  ...Array.from({ length: 61 }, (_, index) => `/audio/grandpa-qwen/need-${index + 1}.wav`),
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
const EYE_LAB_FILES = [
  "/eye-labs/webgazer/webgazer.js",
  "/eye-labs/webgazer/LICENSE",
  "/eye-labs/peekr/peekr.js",
  "/eye-labs/peekr/assets/peekr.onnx",
  "/eye-labs/peekr/assets/ort.wasm.min.mjs",
  "/eye-labs/peekr/assets/ort.webgl.min.mjs",
  "/eye-labs/peekr/assets/ort-wasm-simd-threaded.mjs",
  "/eye-labs/peekr/assets/ort-wasm-simd-threaded.wasm",
  "/eye-labs/peekr/assets/ort.webgl.min.mjs?v=runtime-2",
  "/eye-labs/peekr/assets/ort.wasm.min.mjs?v=runtime-2",
  "/eye-labs/peekr/assets/ort-wasm-simd-threaded.mjs?v=runtime-2",
  "/eye-labs/peekr/assets/ort-wasm-simd-threaded.wasm?v=runtime-2",
  "/eye-labs/peekr/assets/worker-D7ZMe-4W.js",
  "/eye-labs/peekr/LICENSE",
  "/eye-labs/peekr/mediapipe/face_mesh.js",
  "/eye-labs/peekr/mediapipe/face_mesh.binarypb",
  "/eye-labs/peekr/mediapipe/face_mesh_solution_packed_assets.data",
  "/eye-labs/peekr/mediapipe/face_mesh_solution_simd_wasm_bin.js",
  "/eye-labs/peekr/mediapipe/face_mesh_solution_simd_wasm_bin.wasm",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL.filter((url) => !AUDIO_FILES.includes(url)));
    await cacheUrlsIndividually(cache, AUDIO_FILES);
    // Experimental eye models are cached on demand when that mode is opened.
    // This keeps core communication and offline audio ready without making a
    // 24MB model download block every service-worker update.
  })());
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
  if (event.data?.type === "CACHE_AUDIO") {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cacheUrlsIndividually(cache, AUDIO_FILES)));
    return;
  }
  if (event.data?.type === "CACHE_EYE_LABS") {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cacheUrlsIndividually(cache, EYE_LAB_FILES)));
    return;
  }
  if (event.data?.type === "CACHE_URLS" && Array.isArray(event.data.urls)) {
    const urls = event.data.urls.filter((value) => {
      try { return new URL(value).origin === self.location.origin; }
      catch { return false; }
    });
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cacheUrlsIndividually(cache, urls)));
  }
});

async function cacheUrlsIndividually(cache, urls) {
  await Promise.allSettled(urls.map(async (url) => {
    const absoluteUrl = new URL(url, self.registration.scope).href;
    const request = new Request(absoluteUrl, { cache: "reload" });
    const cached = await cache.match(request);
    if (cached) return;
    const response = await fetch(request);
    if (!response.ok) throw new Error(`Could not cache ${absoluteUrl}`);
    await cache.put(request, response);
  }));
}

function isAudioRequest(request) {
  const audioRoot = new URL("audio/grandpa-qwen/", self.registration.scope).pathname;
  return new URL(request.url).pathname.startsWith(audioRoot);
}

async function rangedResponse(response, rangeHeader) {
  if (!rangeHeader) return response;
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
  if (!match) return new Response(null, { status: 416 });

  const buffer = await response.arrayBuffer();
  const size = buffer.byteLength;
  const start = match[1] ? Number(match[1]) : 0;
  const end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= size) {
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
  }

  const headers = new Headers(response.headers);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  return new Response(buffer.slice(start, end + 1), { status: 206, headers });
}

async function serveAudio(request) {
  const cache = await caches.open(CACHE_NAME);
  const cacheKey = new Request(request.url);
  let response = await cache.match(cacheKey);

  if (!response) {
    const networkResponse = await fetch(cacheKey);
    if (!networkResponse.ok) return networkResponse;
    response = networkResponse.clone();
    await cache.put(cacheKey, networkResponse);
  }

  return rangedResponse(response, request.headers.get("range"));
}

async function serveStatic(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) await cache.put(request, response.clone());
  return response;
}

async function serveNavigation(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    return (await caches.match(request)) || (await caches.match("/")) ||
      new Response("Offline", { status: 503, statusText: "Offline" });
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  if (isAudioRequest(request)) {
    event.respondWith(serveAudio(request));
    return;
  }

  event.respondWith(request.mode === "navigate" ? serveNavigation(request) : serveStatic(request));
});
