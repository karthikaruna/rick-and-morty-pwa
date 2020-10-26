import { characters, locations } from '@/test-data'

function fetchify (data) {
  return Promise.resolve({
    json: () => Promise.resolve(data)
  })
}

global.fetch = function (url) {
  let ret

  if (url.endsWith('/character')) {
    ret = fetchify({ results: characters })
  } else if (url.includes('/character/')) {
    const chunksOfUrl = url.split('/')
    const id = chunksOfUrl[chunksOfUrl.length - 1]
    const requestedEntityIds = id.split(',')
    const areMultipleEntitiesRequested = requestedEntityIds.length > 1

    ret = areMultipleEntitiesRequested
      ? fetchify(characters.filter(character => requestedEntityIds.includes(String(character.id))))
      : fetchify(characters.find(character => id === String(character.id)))
  } else if (url.endsWith('/location')) {
    ret = fetchify({ results: locations })
  }

  return ret
}
