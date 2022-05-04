import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import caixa from './modules/caixa';
import produto from './modules/produto';
import pessoa from './modules/pessoa';
import descontos from './modules/descontos';


Vue.use(Vuex)

export default new Vuex.Store({
 modules:{
   auth,
   caixa,
   produto,
   pessoa,
   descontos,
 },
 plugins:[createPersistedState()]
})
