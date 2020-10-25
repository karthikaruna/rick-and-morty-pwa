<template>
  <div class="component-wrapper">
    <ul class="location-list">
      <li v-on:click="fetchCharacters(location)" v-for="location in locations" :key="location.id">
        {{location.name}}
      </li>
    </ul>
    <ul v-if="characters && characters.length" class="character-list">
      <li v-for="character in characters" :key="character.id">
        <router-link :to="{ name: 'Character', params: { id: character.id }}">
          {{character.name}}
        </router-link>
      </li>
    </ul>
    <div v-else class="character-list empty">
      <template v-if="Array.isArray(characters)">
        There are no residents in the selected location
      </template>
      <template v-else>
        Select a location to view its residents
      </template>
    </div>
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

      if (characterIds.length) {
        fetch(`https://rickandmortyapi.com/api/character/${characterIds}`)
          .then(nonConsumableResponse => nonConsumableResponse.json())
          .then(response => {
            this.characters = Array.isArray(response) ? response : [response]
          })
      } else {
        this.characters = []
      }
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
