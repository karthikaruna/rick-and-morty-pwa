/* global workbox */
workbox.core.setCacheNameDetails({ prefix: 'lb-trial' })
workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.routing.registerNavigationRoute('/index.html')

const version = 1
const IDBConfig = {
  name: 'lb_trial',
  version,
  stores: [
    {
      name: 'api_responses',
      keyPath: 'url'
    }
  ]
}

const createIndexedDB = ({ name, version, stores }) => {
  const request = self.indexedDB.open(name, version)

  return new Promise((resolve, reject) => {
    request.onupgradeneeded = e => {
      const db = e.target.result

      stores.map(({ name, keyPath }) => {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, { keyPath })
        }
      })
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

const getStoreFactory = (dbName, version) => ({ name }, mode = 'readonly') => {
  return new Promise((resolve, reject) => {
    const request = self.indexedDB.open(dbName, version)

    request.onsuccess = e => {
      const db = request.result
      const transaction = db.transaction(name, mode)
      const store = transaction.objectStore(name)

      return resolve(store)
    }

    request.onerror = e => reject(request.error)
  })
}

const openStore = getStoreFactory(IDBConfig.name, version)

const cacheApiResponse = async response => {
  try {
    const store = await openStore(IDBConfig.stores[0], 'readwrite')

    store.add(response)
  } catch (error) {
    console.log('idb error', error)
  }
}

const getCachedApiResponse = request => {
  return new Promise((resolve, reject) => {
    openStore(IDBConfig.stores[0])
      .then(store => {
        const cachedRequest = store.get(request.url)

        cachedRequest.onsuccess = e => {
          return cachedRequest.result === undefined ? resolve(null) : resolve(new Response(JSON.stringify(cachedRequest.result.json)))
        }

        cachedRequest.onerror = e => {
          console.log('cached response error', e, cachedRequest.error)

          return reject(cachedRequest.error)
        }
      })
  })
}

const networkThenCache = async request => {
  const { method, url, destination } = request

  try {
    const response = await fetch(request)
    const json = await destination === 'image'
      ? response.clone().blob()
      : response.clone().json()

    if (method === 'GET') {
      cacheApiResponse({ url, json })
    }

    return response
  } catch (e) {
    return new Response(JSON.stringify({ message: 'no response' }))
  }
}

const getCachedOrNetworkApiResponse = async request => await getCachedApiResponse(request) || networkThenCache(request)

const activateHandler = e => {
  if (self.indexedDB) {
    createIndexedDB(IDBConfig)
  }
}

const fetchHandler = async e => {
  const { request } = e
  const { url } = request

  if (url.includes('/api')) {
    e.respondWith(getCachedOrNetworkApiResponse(request))
  }
}

self.addEventListener('activate', activateHandler)
self.addEventListener('fetch', fetchHandler)

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
