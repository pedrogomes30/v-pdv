const state = {
    items: [
      {
        category:0,
        description:"PRODUTO EXEMPLO",
        id:0,
        price:9.99,
        provider:"CEARA AUTOPEÇAS",
        quantity:5,
        sku:"64654654",
        total:48.98,
        value:0,
        website:null,            
        disconts:[
          {
            code:'',
            price:0.0,
            description:'',
            value:'',
            percent:0
          }
        ]
      },
    ], 
  };
  
  const getters = {
    getItems(state) {
      return state.items;
    },
  };
  
  const mutations = {
    addItem(state, product) {
      // Adiciona um item ao carrinho
      state.items.push(product);
    },
  
    removeItem(state, product) {
      // Remove um item do carrinho
      const index = state.items.findIndex(item => item.sku === product.sku);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  
    clearItems(state) {
      // Limpa o carrinho
      state.items = [];
    },
  };
  
  const actions = {
    addToCart({ commit }, product) {
      // Adiciona um item ao carrinho e chama a mutation "addItem"
      return new Promise(resolve => {
        commit('addItem', product);
        resolve();
      });
    },
  
    removeFromCart({ commit }, product) {
      // Remove um item do carrinho e chama a mutation "removeItem"
      return new Promise(resolve => {
        commit('removeItem', product);
        resolve();
      });
    },
  
    clearCart({ commit }) {
      // Limpa o carrinho e chama a mutation "clearItems"
      return new Promise(resolve => {
        commit('clearItems');
        resolve();
      });
    },
  };
  
  export default {
    namespaced: true, 
    state,
    getters,
    mutations,
    actions,
  };
  