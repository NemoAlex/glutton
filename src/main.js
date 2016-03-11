import Vue from 'vue'
import App from './app.vue'
import * as VueTouch from 'vue-touch'

Vue.config.debug = true
Vue.use(VueTouch)
VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

