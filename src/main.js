import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { makeServer } from './server'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'test') {
  makeServer()
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
