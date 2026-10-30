// Offline support: app shell cached first, content refreshed from the network when possible.
const VERSION = 'mp-v2';
const SHELL = [
  './', 'index.html', 'manifest.webmanifest', 'css/app.css',
  'js/app.js', 'js/store.js', 'js/speech.js', 'js/srs.js', 'js/ui.js', 'js/practice.js', 'js/sentences.js',
  'js/views/home.js', 'js/views/cards.js', 'js/views/listen.js', 'js/views/oral.js', 'js/views/colle.js',
  'js/views/reading.js', 'js/views/games.js', 'js/views/exam.js', 'js/views/progress.js',
  'js/views/guide.js', 'js/tour.js',
  'content/content.json', 'content/pinyin-map.json', 'audio/index.json',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== 'mp-audio').map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Network first (so updates arrive right away), cache as fallback when offline.
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});
