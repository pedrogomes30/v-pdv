import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './services/router';
import mitt from 'mitt';
import './registerServiceWorker';
import './assets/styles.css';
import store from './services/store'
import '@fortawesome/fontawesome-free/css/all.css'
import * as directives from './services/directives';


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
      customerForm:false, 
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

Object.keys(directives).forEach((name) => {
  app.directive(name, directives[name]);
});


// //money values
// app.directive('currency', {
//   beforeMount(el) {
//     el.addEventListener('input', () => {
//       let value = el.value;
//       value = value.replace(/\D/g, '');
//       value = (value / 100).toFixed(2);
//       el.value = `R$ ${value}`;
//     });
//   },
// });
// //sku / ean13 values
// app.directive('ean', {
//   mounted(el) {
//     el.addEventListener('input', function () {
//       let value = this.value.replace(/[^0-9]/g, '');
//       value = value.slice(0, 13);
//       this.value = value;
//     });
//   },
// });
// //document values
// app.directive('document', {
//   beforeMount(el) {
//     el.addEventListener('input', () => {
//       let value = el.value;
//       value = value.replace(/\D/g, '');
//       if (value.length <= 11) {
//         value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
//       } else {
//         value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
//       }
//       el.value = value;
//     });
//   },
// });
// //telefone
// app.directive('fone', {
//   beforeMount(el) {
//     el.addEventListener('input', () => {
//       let value = el.value;
//       value = value.replace(/\D/g, '');
//       value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
//       el.value = value;
//     });
//   },
// });





app.use(router);
app.use(store);
app.mount('#app');
