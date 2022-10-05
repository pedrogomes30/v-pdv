import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import cashierStore from './modules/cashierStore';
import productStore from './modules/productStore';
import salesStore from './modules/salesStore';
import errorHandle from './modules/errorHandle';


Vue.use(Vuex)

const Store = new Vuex.Store({
  modules:{
    auth,
    cashierStore,
    productStore, 
    salesStore,
    errorHandle
  },
  plugins:[createPersistedState()]
})
export default Store
