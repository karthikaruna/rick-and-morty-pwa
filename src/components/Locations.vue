<template>
  <ul>
    <li v-for="location in locations" :key="location.id">
      {{location.name}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Locations',
  props: ['locations']
}
</script>
