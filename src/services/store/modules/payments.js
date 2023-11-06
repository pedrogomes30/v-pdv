// Importe qualquer dependência necessária aqui, se aplicável

const state = {
  payments: 
    []
  };
  
  const getters = {
    getPayments(state) {
      return state.payments;
    },
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
    clearMethods(state) {
      state.payments = [];
    }
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
    clearPayments({commit}) {
      return new Promise(resolve =>{
        commit('clearMethods')
        resolve()
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
  