// import axios from 'axios';
import {Produtos} from '../../api/gerenciadorPdv/produtoApi'

const state = {
    produtos: Produtos,
};
const actions = {
    updateProducts({commit},produtos){
        return new Promise(resolve =>{
            //API to Backend 
            produtos = null;
            commit('returnProducts',produtos)
            resolve()
        })
    },
};
const mutations = {
    returnProducts(state, produto){
        if (produto === null){
            state.produto = Produtos
        }
    },
};
const getters = {
    
};
export default {
  state,
  getters,
  actions,
  mutations
};