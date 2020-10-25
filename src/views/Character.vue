<template>
  <CharacterDetails v-bind:characterDetails="characterDetails" />
</template>

<script>
import CharacterDetails from '@/components/CharacterDetails.vue'

export default {
  name: 'Character',
  components: {
    CharacterDetails
  },
  data () {
    return {
      characterDetails: undefined
    }
  },
  beforeRouteEnter (to, from, next) {
    fetch(`https://rickandmortyapi.com/api/character/${to.params.id}`)
      .then(nonConsumableResponse => nonConsumableResponse.json())
      .then(response => {
        next(vm => vm.setData(response))
      })
  },
  methods: {
    setData (characterDetails) {
      this.characterDetails = characterDetails
    }
  }
}
</script>
