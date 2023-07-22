// Importe qualquer dependência necessária aqui, se aplicável

const state = {
    // Defina o estado inicial do módulo aqui
    // Exemplo: item: null, items: []
  };
  
  const getters = {
    // Defina os getters do módulo aqui
    // Exemplo:
    // getItem: state => state.item,
    // getItems: state => state.items,
  };
  
  const mutations = {
    addPayment(state, payment){
          state.status = 'em pagamento'
          let exists = state.payments.findIndex(x => x.method_id === payment.method_id);
          if(exists !== -1 ){
              state.payments[exists].method_value = payment.method_value
          }else{
              state.payments.push(payment);
          }
          
      },
      removePayment(state, payment){
          state.status = 'em pagamento'
          let exists = state.payments.findIndex(x => x.method_id === payment.method_id);
          if(exists !== -1){
              state.payments.splice(exists,1)
          }else{
              alert('impossivel remover este apgamento')
          }
          
      },
    };
  
  const actions = {
    addPayment({commit},pagamento){
      return new Promise(resolve =>{
        commit('addPayment',pagamento)
        resolve(pagamento)
      })
    },

    removePayment({commit},pagamento){
      return new Promise(resolve =>{
        commit('removePayment',pagamento)
        resolve(pagamento)
      })
    },

    addDisconts({commit},discont){
      return new Promise(resolve =>{
        commit('addDisconts',discont)
        resolve(discont)
      })
    },

    removeDisconts({commit},discont){
        return new Promise(resolve =>{
          commit('removeDisconts',discont)
          resolve(discont)
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
  