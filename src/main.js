import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'



axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.GERENCIADOR_URL;

Vue.config.productionTip = false




new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
