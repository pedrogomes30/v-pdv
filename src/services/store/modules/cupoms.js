const state = {
    cupoms: [
    ],
  };
  
  const getters = {
    getItems(state) {
      return state.cupoms;
    },
  };
  
  const mutations = {
    addcupoms(state, discont){
      if(discont.acumulate === 1){
        state.cupoms.push(discont)
      }else if(state.cupoms.length > 0){
        let exists = state.cupoms.findIndex(x => x.code === discont.code);
        if(exists !== -1){
          throw new Error('Cupom já adicionado')
        }
      }
      switch(discont.label){
        case 'client': state.forceCustomer = true; break;
        case 'funcionario': state.forceEmployee = true; break;
        case 'funcionarioParc': state.forceEmployeeParc = true; break;
        default: break;
      }
      console.log('cupoms', state.cupoms)
      
    },
    removecupoms (state, discont){
      state.status = 'em cupoms'
      let exists = state.cupoms.findIndex(x => x.id === discont.id);
      if(exists !== -1){
        state.cupoms.splice(exists,1)
      }else{
        alert('impossivel remover discont')
      }
    },
    clearDiscounts(state) {
      state.cupoms = [];
    },
  }
  
  const actions = {
    addCupom({ commit }, discont) {
      commit('addcupoms', discont);
    },
    removeCupom({ commit }, discont) {
        commit('removecupoms', discont);
      },
    clearCupoms({ commit }) {
      commit('clearDiscounts');
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
  