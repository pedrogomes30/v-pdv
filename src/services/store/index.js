import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';


import currentSale from './modules/currentSale';
import cart from './modules/cart';
import cupoms from './modules/cupoms';
import payments from './modules/payments';
import person from './modules/person';


export default createStore({
    modules: {
        currentSale,
        cart,
        cupoms,
        payments,
        person
    },
    plugins: [
        createPersistedState({
          key: 'currentExecution',
          paths: 
          ['cart', 'cupoms','payments','person','currentSale'], 
        })
      ]
  });
  
