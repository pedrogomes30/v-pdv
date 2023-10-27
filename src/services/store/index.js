import { createStore } from 'vuex';

import currentSale from './modules/currentSale';
import cart from './modules/cart';
import disconts from './modules/disconts';
import payments from './modules/payments';
import person from './modules/person';


export default createStore({
    modules: {
        currentSale,
        cart,
        disconts,
        payments,
        person
    },
  });
  
