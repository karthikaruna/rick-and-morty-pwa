<template>
  <div class="component-wrapper">
    <ul class="location-list">
      <li v-on:click="fetchCharacters(location)" v-for="location in locations" :key="location.id">
        {{location.name}}
      </li>
    </ul>
    <ul class="character-list">
      <li v-for="character in characters" :key="character.id">
        {{character.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Locations',
  props: ['locations'],
  data () {
    return {
      characters: null
    }
  },
  methods: {
    fetchCharacters (location) {
      const characterIds = location.residents.map(characterUrl => {
        const characterUrlChunks = characterUrl.split('/')
        const characterId = characterUrlChunks[characterUrlChunks.length - 1]
        return characterId
      })

      fetch(`https://rickandmortyapi.com/api/character/${characterIds}`)
        .then(nonConsumableResponse => nonConsumableResponse.json())
        .then(response => { this.characters = response })
    }
  }
}
</script>

<style scoped>
.component-wrapper {
  display: flex;
}
.location-list {
  flex: 2;
}
.character-list {
  border-left: 2px dashed silver;
  flex: 1;
  overflow-y: auto;
}
</style>
