

const state = {//ou venda
    loja:'this.store',
    caixa:'this.caixa',
    func_caixa:'this.user',    
    obs:'',
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
    pagamentos:[],
    itensSelecionados:[],
    descontos:[],
    valorProdutos:0,
    valorPagamentos:0,
    valorDesconto:0,
    qtdItens:0,
    valorVenda:0,
    qtdPagamentos:0,
    vendaFuncionario:false,
    status:'sem venda', //(sem venda, seleção de produto,em pagamento = sincronizada, em sincronização, erro)
};

const actions = {
    //CARRINHO ...
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
    qtdItensSelecionados({commit},produto){
        return new Promise(resolve =>{
            commit('qtdItensSelecionados',produto)
            resolve(produto)
        })
    },    
    quicksearch({commit},search){
        return new Promise(resolve =>{
            commit('quicksearch',search)
            resolve(search)
        })
    },
    cleanCart({commit}){
        return new Promise(resolve =>{
            commit('cleanCart')
            resolve()
        })
    },
    //PAGAMENTOS
    addPayment({commit},pagamento){
        return new Promise(resolve =>{
            commit('addPayment',pagamento)
            resolve(pagamento)
        })
    },
    removePayment({commit},pagamento){
        return new Promise(resolve =>{
            commit('removePayment',pagamento)
            resolve(pagamento)
        })
    },
    //DESCONTOS
    addDescontos({commit},desconto){
        return new Promise(resolve =>{
            commit('addDescontos',desconto)
            resolve(desconto)
        })
    },

};
const mutations = {
    //CARRINHO ...
    includeItensSelecionados(state, produto){
        state.status = 'seleção de produtos'
        let exists = state.itensSelecionados.findIndex(x => x.SKU === produto.SKU);
        if(exists !== -1){
            state.itensSelecionados[exists].quantidade++  
            service.ajustarTotalItem(state,exists);
            service.total(state);
        }else{
            produto.quantidade = 1
            produto.valor = typeof produto.valor === 'undefined' ?1.99 : produto.valor
            state.itensSelecionados.push(produto)
            state.qtdItens = state.qtdItens +1
            service.ajustarTotalItem(state,exists===-1? 0:exists);
            service.total(state);
        }
    },
    removeItensSelecionados(state,produto){
        state.status = 'seleção de produtos'
        let exists = state.itensSelecionados.findIndex(x => x.SKU === produto.SKU);
        if(exists !== -1){
            state.itensSelecionados.splice(exists,1)
            state.qtdItens = state.qtdItens -1
            service.total(state);
        }else{
            console.log('produto não pode ser removido')
        }
        
    },
    qtdItensSelecionados(state, produto){
        state.status = 'seleção de produtos'
        let exists = state.itensSelecionados.findIndex(x => x.SKU === produto.SKU);
        state.itensSelecionados[exists].quantidade = produto.quantidade
        service.ajustarTotalItem(state,exists);
        service.total(state);
    },   
    cleanCart(state){
        state.status = 'sem venda'
        state.itensSelecionados = [],
        service.total(state);
    },   
    // PAGAMENTOS...
    addPayment(state, pagamento){
        state.status = 'em pagamento'
        let exists = state.pagamentos.findIndex(x => x.id === pagamento.id);
        if(exists !== -1){
            state.pagamentos[exists] = pagamento
            service.totalPagamentos(state);
        }else{
            pagamento.id = state.pagamentos.length
            state.pagamentos.push(pagamento);
            service.totalPagamentos(state);
        }
    },
    removePayment(state, pagamento){
        state.status = 'em pagamento'
        let exists = state.pagamentos.findIndex(x => x.id === pagamento.id);
        if(exists !== -1){
            state.pagamentos.splice(exists,1)
            service.totalPagamentos(state);
        }else{
            console.log('impossivel remover o pagamento')
        }
    },
    //DESCONTOS ...
    addDescontos(state, desconto){
        state.status = 'em pagamento'
        let exists = state.pagamentos.findIndex(x => x.id === desconto.id);
        if(exists !== -1){
            state.pagamentos[exists] = desconto
            service.totalPagamentos(state);
        }else{
            desconto.id = state.descontos.length
            state.descontos.push(desconto);
            service.totalPagamentos(state);
        }
        console.log('stado-> ', state)
        console.log('desconto-> ', desconto)
        // state.status = 'em pagamento'
        // let exists = state.descontos.findIndex(x => x.id === desconto.id);
        // if(exists !== -1){
        //     state.descontos[exists] = desconto
        //     service.totalPagamentos(state);
        // }else{
        //     desconto.id = state.descontos.length
        //     state.pagamentos.push(desconto);
        //     service.totalPagamentos(state);
        // }
    },

};
const getters = {
    
};
const service ={
    ajustarTotalItem(state,indice){
        if(typeof state.itensSelecionados[indice].valor === 'undefined'){
            state.itensSelecionados[indice].valor = 1.00;
        }
        state.itensSelecionados[indice].total = (state.itensSelecionados[indice].quantidade * state.itensSelecionados[indice].valor)
       
    },
    total(state){
        state.valorProdutos = 0
        state.itensSelecionados.forEach(produto => {
            if(typeof produto.total === 'undefined'){
                produto.total = Math.round(produto.quantidade * produto.valor,2);
            }
            state.valorProdutos += produto.total
        });
    },
    // PAGAMENTOS ...
    totalPagamentos(state){
        state.valorPagamentos = 0
        state.pagamentos.forEach(pagamento => {
            state.valorPagamentos += pagamento.valor
        });
    }
    
}
export default {
  state,
  getters,
  actions,
  mutations,
  service
};