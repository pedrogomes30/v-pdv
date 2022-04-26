

const state = {//ou venda
    pagamentos:[],
    itensSelecionados:[],
    valorProdutos:0,
    valorPagamentos:0,
    valorDesconto:0,
    qtdItens:0,
    qtdPagamentos:0,
    status:'em aberto',
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
    includeItensSelecionados({commit},produto){
        return new Promise(resolve =>{
            commit('includeItensSelecionados',produto)
            resolve(produto)
        })
    },
    removeItensSelecionados({commit},produto){
        return new Promise(resolve =>{
            commit('removeItensSelecionados',produto)
            resolve(produto)
        })
    },
    addItensSelecionados({commit},produto){
        return new Promise(resolve =>{
            commit('addItensSelecionados',produto)
            resolve(produto)
        })
    },
    quicksearch({commit},search){
        return new Promise(resolve =>{
            commit('quicksearch',search)
            resolve(search)
        })
    }
    
};
const mutations = {
    includeItensSelecionados(state, produto){
        let exists = state.itensSelecionados.findIndex(x => x.SKU === produto.SKU);
        console.log('qtdProdutos -> ',state.qtdItens)
        if(exists !== -1){
            state.itensSelecionados[exists].quantidade++            
        }else{
            produto.quantidade = 1
            state.itensSelecionados.push(produto)
            state.qtdItens ++
        }
    },
    removeItensSelecionados(state, produto){
        let exists = state.itensSelecionados.findIndex(x => x.SKU === produto.SKU);
        console.log('qtdProdutos -> ',state.qtdItens)
        if(state.itensSelecionados-- === 0 ){
            //state.itensSelecionados.delete(exists)
            state.qtdItens --
        }else{
            state.itensSelecionados[exists].quantidade--
        }
    },
    addItensSelecionados(state, produto){
        let exists = state.itensSelecionados.findIndex(x => x.SKU === produto.SKU);
        console.log('qtdProdutos -> ',state.qtdItens)
        if(state.itensSelecionados-- === 0 ){
            //state.itensSelecionados.delete(exists)
            state.qtdItens --
        }else{
            state.itensSelecionados[exists].quantidade--
        }
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