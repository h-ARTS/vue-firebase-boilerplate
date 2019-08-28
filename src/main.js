import Vue from 'vue'

import { rtdbPlugin } from 'vuefire'

import App from './App.vue'

Vue.use(rtdbPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
