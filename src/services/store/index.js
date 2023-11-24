import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';


import currentSale from './modules/currentSale';
import person from './modules/person';


export default createStore({
    modules: {
        currentSale,
        person
    },
    plugins: [
        createPersistedState({
          key: 'currentExecution',
          paths: 
          ['payments','person','currentSale'], 
        })
      ]
  });
  
