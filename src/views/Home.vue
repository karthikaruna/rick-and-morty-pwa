<template>
  <div class="home">
    <Locations v-bind:locations="locations" />
  </div>
</template>

<script>
// @ is an alias to /src
import Locations from '@/components/Locations.vue'

export default {
  name: 'Home',
  components: {
    Locations
  },
  data () {
    return {
      locations: undefined
    }
  },
  beforeRouteEnter (to, from, next) {
    fetch('https://rickandmortyapi.com/api/location/')
      .then(nonConsumableResponse => nonConsumableResponse.json())
      .then(response => {
        next(vm => vm.setData(response.results))
      })
  },
  methods: {
    setData (locations) {
      this.locations = locations
    }
  }
}
</script>
