// import Vue from 'vue';

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
      console.log('in START');
      return new Promise(resolve =>{
        setTimeout(()=>{
          commit('SET_START',startObj,{root:true});
          resolve();
        },250);
      })
    },
  }
const mutations = {  
  LOGOUT(state){
    state.cashier_session = ""
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
