import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  nomeUsuario: '',
  LoginUsuario:'',
  caixaNome:'',
  email:'',
  cargo:'',
  loja: 'cabo frio joão pessoa',
  abreviacao: 'CFJP',
  lojaTipo:'loja',
  lojaId:'616A1SA5S642D1646A3A5S1668A4SA6132W3885S56A62A6W8',//enotasID
  caixas:['CFJP-caixa1','CFJP-caixa2','CFJP-caixa3'],
  tokenID:'',//token do oAuth2
  tokenEnd:'',//datetimeends 
};

const getters = {

};
const actions = {
  makeLogin({commit},usuario){
    return new Promise(resolve =>{
        //obter da api  
        commit('makeLogin',usuario)
        resolve(usuario)
    })
},    

};
const mutations = {
  makeLogin(state,usuario){
    state.nomeUsuario = usuario.login
},
};
export default {
  state,
  getters,
  actions,
  mutations
};
