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
    addPayments(state, payment){
      state.status = 'em pagamento'
      let exists = state.payments.findIndex(x => x.method_id === payment.method_id);
      if(exists !== -1 ){
        state.payments[exists].method_value = parseFloat(payment.method_value.replace(/\D/g, ''))/100;
      }else{
        payment.method_value = parseFloat(payment.method_value.replace(/\D/g, ''))/100;
        state.payments.push(payment);
      }
      console.log('addpayment',state.payments)
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
        commit('addPayments',pagamento)
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
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };
  