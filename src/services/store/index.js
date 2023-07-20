import { createStore } from 'vuex';

import currentSale from './modules/currentSale';
import cart from './modules/cart';
import errorHandle from './modules/errorHandle';
import disconts from './modules/disconts';
import payments from './modules/payments';
import person from './modules/person';


export default createStore({
    modules: {
        currentSale,
        errorHandle,
        cart,
        disconts,
        payments,
        person
    },
  });
  
