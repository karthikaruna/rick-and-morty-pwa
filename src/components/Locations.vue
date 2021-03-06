<template>
  <div class="component-wrapper">
    <ul class="location-list">
      <li class="card" v-on:click="fetchCharacters(location)" v-for="location in locations" :key="location.id">
        {{location.name}}
        <div class="go-corner">
          <div class="go-arrow">→</div>
        </div>
      </li>
    </ul>
    <ul v-if="characters && characters.length" class="character-list">
      <li v-for="character in characters" :key="character.id">
        <router-link :to="{ name: 'Character', params: { id: character.id }}">
          <CharacterThumb v-bind:character="character" />
        </router-link>
      </li>
    </ul>
    <div v-else class="character-list empty">
      <template v-if="Array.isArray(characters)">
        <div class="call-for-action">
          <img src="../assets/no-residents-found.png" alt="No residents found">
          <p>There are no residents in the selected location</p>
        </div>
      </template>
      <template v-else>
        <div class="call-for-action">
          <img src="../assets/pick-a-location.png" alt="Pick a location">
          <p>Select a location from the left to view its residents</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { fetchResources } from '@/utils'
import CharacterThumb from '@/components/CharacterThumb.vue'

export default {
  name: 'Locations',
  props: ['locations'],
  components: {
    CharacterThumb
  },
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
        fetchResources(`character/${characterIds}`)
          .then(response => {
            this.characters = (Array.isArray(response) ? response : [response])
              .filter(character => ['Alive', 'Dead'].includes(character.status))
          })
      } else {
        this.characters = []
      }
    }
  }
}
</script>

<style scoped>
* {
  transition: all 0.3s ease-out;
}
.component-wrapper {
  display: flex;
}
.location-list {
  display: flex;
  flex-wrap: wrap;
  flex: 2;
}
.character-list {
  border-left: 2px dashed silver;
  flex: 1;
  overflow-y: auto;
}
.character-list>li {
  display: inline-block;
  margin: 12px;
  width: calc(50% - 24px);
}
.character-list>li>a {
  display: block;
}
.character-list.empty {
  display: flex;
  align-items: center;
}
ul {
  padding: 0;
  margin: 0;
}
</style>
