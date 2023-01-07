import productsDB from '../../indexedDB/productsDB'
const state = {
    products: productsDB.get(),
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
        productObj.products.forEach(products => {
            productsDB.save(products)
        });
        //  (var products in productObj.products){
        //     console.log( products.id)
        // }
        // state.products      = productObj.products
        // productsDB.save(productObj.products)
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