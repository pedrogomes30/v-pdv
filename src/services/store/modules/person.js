// Importe qualquer dependência necessária aqui, se aplicável

const state = {
    customer:null
  };
  
  const getters = {
    getCustomer:state=>state.customer,
    getSalesman:state=>state.salesman
  };
  
  const mutations = {
    //customer
    addCustomer(state, customer){
        console.log(customer);
        state.customer = customer
    },
    removeCustomer(state){
        state.customer = null;
    },
    //salesman
    addSalesman(state, salesman){
        state.salesman = salesman
    },
    removeSalesman(state){
        state.salesman = null;
    },
    //remove all
    clearAll(state){   
        state.customer = null;
        state.salesman = null;
    }
  };
  
  const actions = {
    //customer
    addCustomer({commit},value){
      return new Promise(resolve =>{
          commit('addCustomer',value)
          resolve()
      })
    },
    removeCustomer({commit}){
        return new Promise(resolve =>{
            commit('removeCustomer')
            resolve()
        })
    },
    //salesman
    addSalesman({commit},value){
        return new Promise(resolve =>{
            commit('addSalesman',value)
            resolve()
        })
    },
    removeSalesman({commit}){
        return new Promise(resolve =>{
            commit('removeSalesman')
            resolve()
        })
    },
    //remove all
    clearCustomerSalesman({commit}){
        console.log("<<CLEANING ALL>>")
        return new Promise(resolve =>{
            commit('clearAll')
            resolve()
        })
    }
  };
  
  export default {
    namespaced: true, 
    state,
    getters,
    mutations,
    actions,
  };
  