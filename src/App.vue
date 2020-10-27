<template>
  <div id="app">
    <transition
      :name="transitionName"
      mode="out-in"
    >
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: undefined
    }
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length

      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      next()
    })
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

html,
body,
#app,
.component-wrapper {
  height: 100%;
}

/* common styles */
/* call for action */
.call-for-action {
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.call-for-action img {
  width: 100%;
}
.call-for-action p {
  font-size: 24px;
}

/* card */
.go-corner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 32px;
  height: 32px;
  overflow: hidden;
  top: 0;
  right: 0;
  background-color: #00838d;
  border-radius: 0 4px 0 32px;
}
.go-arrow {
  margin-top: -4px;
  margin-right: -4px;
  color: white;
  font-family: courier, sans;
}
.card {
  display: block;
  cursor: pointer;
  top: 0px;
  position: relative;
  width: calc(100% / 3 - 74px);
  background-color: #f2f8f9;
  border-radius: 4px;
  padding: 32px 24px;
  margin: 12px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  border: 1px solid #f2f8f9;
}
.card:hover {
  transition: all 0.2s ease-out;
  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
  top: -4px;
  border: 1px solid #cccccc;
  background-color: #97d7d7;
}
.card:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
  background: #00838d;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  transform: scale(2);
  transform-origin: 50% 50%;
  transition: transform 0.15s ease-out;
}
.card:hover:before {
  transform: scale(2.15);
}

/* route transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.25s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
