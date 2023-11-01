const state = {
    cupoms: [{
      active:1,
      acumulate:1,
      allproducts:1,
      code:"AVAR",
      default:1,
      description:"aplica 10% em um produto avariado",
      end_date:null,
      label:"",
      percent:1,
      quantity:null,
      start_date:null,
      value:10,
      with_validity:0
    },
    ],
  };
  
  const getters = {
    getItems(state) {
      return state.cupoms;
    },
  };
  
  const mutations = {
    addcupoms(state, discont){
        state.status = 'em cupoms'
        state.cupoms.push(discont);
        state.forceCustomer = discont.with_client
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
      clearDiscounts({ commit }) {
        return new Promise(resolve => {
          commit('clearDiscounts');
          resolve();
        });
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
  