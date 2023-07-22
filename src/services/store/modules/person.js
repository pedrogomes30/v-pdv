// Importe qualquer dependência necessária aqui, se aplicável

const state = {
    person:null
    // Defina o estado inicial do módulo aqui
    // Exemplo: item: null, items: []
  };
  
  const getters = {
    example:state=>state.example
    // Defina os getters do módulo aqui
    // Exemplo:
    // getItem: state => state.item,
    // getItems: state => state.items,
  };
  
  const mutations = {
    //CLIENTE
    addCustomer(state, customer){
      state.customer = customer
      },
      removeCustomer(state){
          state.customer = {
              document: "1",
              name: "Cliente não identificado",
              email: "",
              phone: "",
              type: "",
              store_partiner_id: "",
              store_partiner_name: ""
          }
      },
      addSalesman(state, salesman){
          state.salesman = salesman
      },
      removeSalesman(state){
          state.salesman = {
              document: "2",
              name: "Vendedor não identificado",
              email: "",
              phone: "",
              type: "",
              store_partiner_id: "",
              store_partiner_name: ""
          }
      },
  };
  
  const actions = {
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
  forceCustomer({commit},userType){
      return new Promise(resolve =>{
          commit('forceCustomer',userType)
          resolve(userType)
      })
  },
  };
  
  export default {
    // Defina outras configurações do módulo, se necessário
    namespaced: true, // Defina como true para evitar conflitos com outros módulos
    state,
    getters,
    mutations,
    actions,
  };
  