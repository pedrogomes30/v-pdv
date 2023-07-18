import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './services/router';
import mitt from 'mitt';
import './registerServiceWorker';
import './assets/styles.css';

const app = createApp(App);

const global = {
  load: false,
  alert:{
    show:false,
    type:'error',
    message:''
  },
  showNavBar:false,
};

const eventBus = mitt();

app.config.globalProperties.$global = global;
app.config.globalProperties.$eventBus = eventBus;

app.use(router);

app.mount('#app');
