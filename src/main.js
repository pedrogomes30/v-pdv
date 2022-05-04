import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueMask from 'v-mask';
import money from 'v-money'



axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.GERENCIADOR_URL;
Vue.config.productionTip = false



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueMask)
Vue.use(money, {precision: 4})
