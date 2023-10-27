const state = {
    disconts: [],
  };
  
  const getters = {
    getItems(state) {
      return state.disconts;
      /*
      "disconts": [
            {
                "id": 1,
                "with_client": "",
                "code": "#AVAR",
                "description": "aplica 10% em um produto avariado",
                "value": 10,
                "all_products": 0,
                "acumulate": 1,
                "percent": 1,
                "quantity": null,
                "sku": "6927545997197"
            }
      */
    },
  };
  
  const mutations = {
    addDisconts(state, discont){
        state.status = 'em disconts'
        state.disconts.push(discont);
        state.forceCustomer = discont.with_client
    },
    removeDisconts (state, discont){
        state.status = 'em disconts'
        let exists = state.disconts.findIndex(x => x.id === discont.id);
        if(exists !== -1){
          state.disconts.splice(exists,1)
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
    addDisconts({ commit }, discont) {
      commit('addDisconts', discont);
    },
    removeDisconts({ commit }, discont) {
        commit('removeDisconts', discont);
      },
    clearDiscounts({ commit }) {
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
  