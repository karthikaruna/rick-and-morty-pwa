import { Server, Model } from 'miragejs'
import { characters, locations } from './test-data'

export function makeServer (environment = 'test') {
  const server = new Server({
    environment,

    models: {
      character: Model,
      location: Model
    },

    seeds (server) {
      characters.forEach(character => server.create('character', character))
      locations.forEach(location => server.create('location', location))
    },

    routes () {
      this.namespace = 'api'

      this.get('/character', schema => {
        return schema.characters.all()
      })

      this.get('/character/:id', (schema, request) => {
        return schema.characters.find(request.params.id)
      })

      this.get('/location', schema => {
        return schema.locations.all()
      })
    }
  })

  return server
}
