// import Vue from 'vue';

import Cookie from "js-cookie";

const state = {
  cashier_session :{},
};
const getters = {
    getStore: state =>{
      return state.cashier_session.store;
    },
    getPymentMethod: state=>{
      return state.cashier_session.payment_methods;
    },
    getCupoms: state=>{
      return state.cashier_session.cupoms;
    },
    getCashierSession: state=>{
      return state.cashier_session;
    }
};
const actions = {
    logout({commit}){
      return new Promise(() =>{
        commit('logout')
      })
    },
    start({commit},startObj){
      return new Promise(resolve =>{
        setTimeout(()=>{
          commit('SET_START',startObj);
          resolve();
        },250);
      })
    },
  }
const mutations = {  
  logout(state){
    state.cashier_session = ""
    Cookie.remove('._token')
    Cookie.remove('expires')
  },
  SET_START(state,startObj){
    state.cashier_session = startObj
  } 
};
export default {
  state,
  getters,
  actions,
  mutations
};
