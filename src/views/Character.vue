<template>
  <CharacterDetails v-bind:characterDetails="characterDetails" />
</template>

<script>
import CharacterDetails from '@/components/CharacterDetails.vue'
import { fetchResources } from '@/utils'

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
    fetchResources(`character/${to.params.id}`)
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
