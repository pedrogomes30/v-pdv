const state = {
    cliente:{
        tipo: 'cliente', 
        nome: 'cliente não identificado',
        cpf:'000000000',
    },
    vendedor:{
        tipo: 'vendedor',
        nome: 'vendedor não identificado',
        cpf:'000000000',
    },
};
const actions = {
    updateCliente({commit},documento){
        return new Promise(resolve =>{
            console.log(documento)
            const newPessoa = '' //get from posmanager by cpf/cnpj
            commit('updateCliente',newPessoa)
            resolve()
        })
    },
    updateVendedor({commit},documento){
        return new Promise(resolve =>{
            console.log(documento)
            const newPessoa = '' //get from posmanager by cpf/cnpj
            commit('updateVendedor',newPessoa)
            resolve()
        })
    },
    
};
const mutations = {
    updateCliente(state,newPessoa){
        state.cliente = newPessoa
    },
    updateVendedor(state,newPessoa){
        state.vendedor = newPessoa
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