<template>
  <Locations v-bind:locations="locations" />
</template>

<script>
// @ is an alias to /src
import Locations from '@/components/Locations.vue'
import { fetchResources } from '@/utils'

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
    fetchResources('location')
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
