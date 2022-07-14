import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import cashierStore from './modules/cashierStore';
import productStore from './modules/productStore';
import discontStore from './modules/discontStore';
import salesStore from './modules/salesStore';


Vue.use(Vuex)

export default new Vuex.Store({
 modules:{
   auth,
   cashierStore,
   productStore, 
   discontStore,
   salesStore,
 },
 plugins:[createPersistedState()]
})
