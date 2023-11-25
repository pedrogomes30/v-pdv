import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';


import currentSale from './modules/currentSale';


export default createStore({
    modules: {
        currentSale,
    },
    plugins: [
        createPersistedState({
          key: 'currentExecution',
          paths: 
          ['payments','person','currentSale'], 
        })
      ]
  });
  
