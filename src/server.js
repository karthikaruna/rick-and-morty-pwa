import { createServer } from 'miragejs'
import { characters, locations } from './test-data'

export function makeServer ({ environment = 'test' } = {}) {
  const server = createServer({
    environment,

    routes () {
      this.namespace = 'api'

      this.get('/character', () => {
        return { results: characters }
      })

      this.get('/character/:id', (schema, request) => {
        const requestedEntityIds = String(request.params.id).split(',')
        const areMultipleEntitiesRequested = requestedEntityIds.length > 1

        return areMultipleEntitiesRequested
          ? characters.filter(character => requestedEntityIds.includes(String(character.id)))
          : characters.find(character => request.params.id === String(character.id))
      })

      this.get('/location', () => {
        return { results: locations }
      })
    }
  })

  return server
}
