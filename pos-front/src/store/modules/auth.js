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
  fluxoEmissao:'NORMAL',
  formaPagamento:[
    {method:"Dinheiro",icon:'fa-solid fa-money-bill',color:'#4fd15c'},
    {method:"Cartão Crédito à Vista",icon:'fa-solid fa-credit-card',color:'#6f87ed'},
    {method:"Cartão Crédito à parcelado",icon:'fa-solid fa-money-check',color:'#5772e6'},
    {method:"Cartão Débito",icon:'fa-solid fa-money-check-dollar',color:'#ebd07f'},
    {method:"Pix",icon:'fa-brands fa-pix',color:'#77edca'},
    {method:"Crédito Funcionário",icon:'fa-solid fa-id-card',color:'#d47ba4'}
  ] 
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
