const state = {
    sales:[]
};

const getters = {
    sales(state){
        return state.sales
    }
};
const actions = {
    newSale({commit},sale){
        return new Promise(resolve =>{
            commit('newSale',sale)
            resolve()
        })
    },    
};
const mutations = {
    newSale(state,sale){
        //to sincronyze
        state.sales.push(sale)
    },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
