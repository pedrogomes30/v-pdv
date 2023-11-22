import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';


import currentSale from './modules/currentSale';
import cupoms from './modules/cupoms';
import payments from './modules/payments';
import person from './modules/person';


export default createStore({
    modules: {
        currentSale,
        cupoms,
        payments,
        person
    },
    plugins: [
        createPersistedState({
          key: 'currentExecution',
          paths: 
          ['cupoms','payments','person','currentSale'], 
        })
      ]
  });
  
