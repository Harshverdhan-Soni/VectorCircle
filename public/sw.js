const CACHE = 'vector-circle-v2';
const SHELL = ['/', '/index.html', '/manifest.webmanifest', '/favicon.svg', '/icons/icon-192.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      // One missing file must not fail the whole install, which is what
      // addAll() does — it's all-or-nothing.
      .then((c) => Promise.allSettled(SHELL.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;   // let Firebase talk directly
  if (!url.protocol.startsWith('http')) return;      // ignore chrome-extension: etc.

  // Navigation: network first, cached shell only if the network is gone.
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request).catch(() =>
        caches.match('/index.html').then((hit) => hit || fetch(request))
      )
    );
    return;
  }

  e.respondWith((async () => {
    const hit = await caches.match(request);
    if (hit) return hit;
    try {
      const res = await fetch(request);
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(request, copy));
      }
      return res;
    } catch (err) {
      // Every path must end in a Response. Returning undefined here is what
      // threw "Failed to convert value to 'Response'".
      return new Response('', { status: 504, statusText: 'Offline' });
    }
  })());
});

self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'NUDGE') {
    self.registration.showNotification(e.data.title || 'Vector Circle', {
      body: e.data.body || 'Log today\u2019s dots before the day closes.',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: 'daily-nudge'
    });
  }
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
