const state = {
    cuponsPreDefinidos:[
            {
                SKU: '', 
                codigo: '#AVAR',
                descricao:'aplica 10% em um produto avariado',
                todosProdutos:false,
                comCliente :false,
                clienteTipo:'',
                porcentagem:true,
                acumulativo:true,
                valor:10,
            },  
            {
                SKU: '', 
                codigo: '#FUNC',
                descricao:'aplica 15% na compra de um funcionário',
                todosProdutos:true,
                comCliente:'funcionario',
                porcentagem:true,
                acumulativo:false,
                valor:15,
            },  
            {
                SKU: '', 
                codigo: '#PARC',
                descricao:'aplica 5% na compra de um funcionário de loja parceira.',
                valor:5,
                todosProdutos:true,
                comCliente:'funcionarioParceiro',
                porcentagem:true,
                acumulativo:false,
            },  

        ],
};
const actions = {
    
};
const mutations = {
    
};
const getters = {

};
export default {
  state,
  getters,
  actions,
  mutations
};