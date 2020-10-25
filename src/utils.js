const namespace = process.env.NODE_ENV === 'development'
  ? '/api'
  : 'https://rickandmortyapi.com/api'

export function fetchResources (path) {
  return fetch(namespace + '/' + path)
    .then(response => response.json())
}
