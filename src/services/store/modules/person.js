// Importe qualquer dependência necessária aqui, se aplicável

const state = {
    example:null
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
    // Defina as mutations do módulo aqui
    // Exemplo:
    // SET_ITEM(state, payload) {
    //   state.item = payload;
    // },
    // ADD_ITEM(state, payload) {
    //   state.items.push(payload);
    // },
    // REMOVE_ITEM(state, index) {
    //   state.items.splice(index, 1);
    // },
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
  