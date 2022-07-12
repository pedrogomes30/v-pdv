import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  cashier_session :'',
};
const getters = {

};
const actions = {
    logout({commit}){
      return new Promise(() =>{
        commit('logout')
      })
    },
    start({commit},startObj){
      return new Promise(() =>{
        commit('start',startObj)
      })
    },
  }




const mutations = {
  
  logout(state){
    state.cashier_session = ""
  },
  start(state,startObj){
    state.cashier_session = startObj
    
  } 
};
export default {
  state,
  getters,
  actions,
  mutations
};
