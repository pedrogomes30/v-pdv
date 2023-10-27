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
      product.total = calculateProductValues(product);
      state.items.push(product);
    },

    incrementQuantity(state, product) {
      const existingProduct = state.items.find(item => item.sku === product.sku);
      if (existingProduct) {
        existingProduct.quantity++;
        existingProduct.total = calculateProductValues(existingProduct);
      }

    }, 

    decrementQuantity(state, product) {
      const existingProduct = state.items.find(item => item.sku === product.sku);
      if (existingProduct) {
        existingProduct.quantity--;
        existingProduct.total = calculateProductValues(existingProduct);
        if(existingProduct.quantity <= 0){
          const index = state.items.findIndex(item => item.sku === product.sku);
          if (index !== -1) {
            state.items.splice(index, 1);
          }
        }
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
    },

    addDiscountToProduct(state, { product, discount }) {
      const existingProduct = state.items.find(item => item.sku === product.sku);
      if (existingProduct) {
        if (!existingProduct.discounts) {
          existingProduct.discounts = [];
        }
        existingProduct.discounts.push(discount);
      }
    },
  
    removeDiscountFromProduct(state, { product, discountCode }) {
      const existingProduct = state.items.find(item => item.sku === product.sku);
      if (existingProduct && existingProduct.discounts) {
        existingProduct.discounts = existingProduct.discounts.filter(discount => discount.code !== discountCode);
      }
    }
  };
  
  const actions = {
    addToCart({ state, commit }, product) {
      return new Promise(resolve => {
        const existingProduct = state.items.find(item => item.sku === product.sku);

        if (existingProduct) {
          commit('incrementQuantity', existingProduct);
        } else {
          const productWithQuantity = { ...product, quantity: 1, disconts:[], total:0 };
          commit('addItem', productWithQuantity);
        }

        resolve();
      });
    },    
    
    incrementProductCart({ commit }, product){
      return new Promise(resolve => {
        commit('incrementQuantity', product);
        resolve();
      });
    },

    decrementProductCart({ commit }, product){
      return new Promise(resolve => {
        commit('decrementQuantity', product);
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

    addDiscount({ commit }, { product, code, value }) {
      // Action para adicionar um desconto ao produto no carrinho
      const discount = { code, value };
  
      commit('addDiscountToProduct', { product, discount });
    },
  
    removeDiscount({ commit }, { product, discountCode }) {
      // Action para remover um desconto do produto no carrinho
      commit('removeDiscountFromProduct', { product, discountCode });
    },
  
  };

  function calculateProductValues(product) {
    const itemTotal = product.price * product.quantity;
    if (product.discounts) {
      const totalDiscount = product.discounts.reduce((total, discount) => total + discount.value, 0);
      return itemTotal - totalDiscount;
    }
    return itemTotal;
  }
  
  export default {
    namespaced: true, 
    state,
    getters,
    mutations,
    actions,
  };
  