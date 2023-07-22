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
    };
  
  const actions = {
    // Defina as actions do módulo aqui
    // Exemplo:
    // setItem({ commit }, item) {
    //   commit('SET_ITEM', item);
    // },
    // addItem({ commit }, item) {
    //   commit('ADD_ITEM', item);
    // },
    // removeItem({ commit }, index) {
    //   commit('REMOVE_ITEM', index);
    // },
  };
  
  export default {
    // Defina outras configurações do módulo, se necessário
    namespaced: true, // Defina como true para evitar conflitos com outros módulos
    state,
    getters,
    mutations,
    actions,
  };
  