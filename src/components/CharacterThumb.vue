<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img v-bind:src="character.image" alt="Avatar">
      </div>
      <div class="flip-card-back">
        <h1>{{character.name}}</h1>
        <ul class="character-stats">
          <li>Status: {{character.status}}</li>
          <li>Species: {{character.species}}</li>
          <li>Gender: {{character.gender}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterThumb',
  props: ['character']
}
</script>

<style scoped>
.flip-card {
  background-color: transparent;
  height: 200px;
  border: 1px solid #f1f1f1;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-card-back {
  background-color: #97d7d7;
  color: black;
  transform: rotateY(180deg);
}

img {
  width: 100%;
}

.character-stats {
  list-style-type: none;
  padding: 0;
}
</style>
