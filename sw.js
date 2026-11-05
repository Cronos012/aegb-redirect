// L'appli a déménagé sur aegb.fr : ce service retire l'ancien de app.aegb.fr,
// vide ses caches, puis recharge les pages ouvertes (qui renvoient vers aegb.fr).
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key)
    await self.registration.unregister()
    for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url)
  })())
})
