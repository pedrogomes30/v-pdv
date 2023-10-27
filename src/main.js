import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './services/router';
import mitt from 'mitt';
import './registerServiceWorker';
import './assets/styles.css';
import store from './services/store'

const app = createApp(App);

const global = {
  load: false,
  alert:{
    show:false,
    type:'error',
    message:''
  },
  system:{
    formStatus:{
      cupomForm:false,
      paymentForm:false,
      customerform:false, 
      sellerForm:false,
      obsForm:false,
      changeProductForm:false,
    }
  },
  showNavBar:false,
};

const eventBus = mitt();

app.config.globalProperties.$global = global;
app.config.globalProperties.$eventBus = eventBus;

app.use(router);
app.use(store); 
app.mount('#app');
