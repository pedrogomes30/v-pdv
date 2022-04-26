import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import caixa from './modules/caixa';
import produto from './modules/produto';


Vue.use(Vuex)

export default new Vuex.Store({
 modules:{
   auth,
   caixa,
   produto
 },
 plugins:[createPersistedState()]
})
