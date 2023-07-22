const state = {
    items: [
      
    ], 
  };
  
  const getters = {
    getItems(state) {
      return state.items;
    },
  };
  
  const mutations = {
    addItem(state, product) {
      state.items.push(product);
    },

    incrementQuantity(state, product) {
      const existingProduct = state.items.find(item => item.sku === product.sku);
      if (existingProduct) {
        existingProduct.quantity++;
      }
    }, 
    
    removeItem(state, product) {
      const index = state.items.findIndex(item => item.sku === product.sku);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },

    clearItems(state) {
      state.items = [];
    }
  };
  
  const actions = {
    addToCart({ state, commit }, product) {
      return new Promise(resolve => {
        const existingProduct = state.items.find(item => item.sku === product.sku);

        if (existingProduct) {
          commit('incrementQuantity', existingProduct);
        } else {
          const productWithQuantity = { ...product, quantity: 1 };
          commit('addItem', productWithQuantity);
        }

        resolve();
      });
    },    
  
    removeFromCart({ commit }, product) {
      return new Promise(resolve => {
        commit('removeItem', product);
        resolve();
      });
    },
  
    clearCart({ commit }) {
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
  