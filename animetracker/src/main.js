import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import cookie from 'vue-cookie'
import axios from 'axios'


Vue.use(cookie)
axios.defaults.baseURL = "https://api.tijnvanveghel.dev"

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
