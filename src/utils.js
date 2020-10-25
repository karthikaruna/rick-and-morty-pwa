const namespace = process.env.NODE_ENV === 'test'
  ? 'api'
  : 'https://rickandmortyapi.com/api'

export function fetchResources (path) {
  return fetch(namespace + '/' + path)
    .then(response => response.json())
}
