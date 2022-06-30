import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

const state = {
    vendas:[]
};

const getters = {

};
const actions = {
  newVenda({commit},venda){
    return new Promise(resolve =>{
        //obter da api  
        commit('newVenda',venda)
        resolve()
    })
},    
};
const mutations = {
    newVenda(state,venda){
        state.vendas.push(venda)
    },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
