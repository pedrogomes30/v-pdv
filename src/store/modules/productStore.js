
const state = {
    products: [],
    categorys:[],
};
const actions = {
    updateProducts({commit},productObj){
        return new Promise(resolve =>{            
            resolve(commit('updateProducts',productObj))
        })
    },
};
const mutations = {
    updateProducts(state, productObj){
        state.categorys     = productObj.category
        state.products      = productObj.products
    },
};
const getters = {
    
};
export default {
  state,
  getters,
  actions,
  mutations
};