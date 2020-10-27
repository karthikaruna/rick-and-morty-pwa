<template v-if="characterDetails">
  <div class="component-container">
    <div class="dp-container">
      <img v-bind:src="characterDetails.image" v-bind:alt="characterDetails.name">
    </div>
    <div class="details-container">
      <h1>{{characterDetails.name}}</h1>
      <table>
        <tbody>
          <tr>
            <td>Created at</td>
            <td>
              {{new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short', year: 'numeric' })
                .format(new Date(characterDetails.created))}}
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{{characterDetails.status}}</td>
          </tr>
          <tr>
            <td>Species</td>
            <td>{{characterDetails.species}}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{{characterDetails.type}}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{{characterDetails.gender}}</td>
          </tr>
          <tr>
            <td>Origin</td>
            <td>{{characterDetails.origin.name}}</td>
          </tr>
          <tr>
            <td>Current location</td>
            <td>{{characterDetails.location.name}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterDetails',
  props: ['characterDetails']
}
</script>

<style scoped>
.dp-container,
h1 {
  text-align: center;
}
img {
  border-radius: 100%;
  box-shadow: 0 0 5px 2px rgba(0,0,0,.35);
}
h1 {
  margin: -30px 0 0 0;
  padding: 40px;
  background-color: #97d7d7;
}
table {
  margin: auto;
  background-color: #f2f8f9;
}
td {
  padding: 6px 12px;
}
td:first-child {
  font-weight: bold;
  text-align: right;
}
</style>
