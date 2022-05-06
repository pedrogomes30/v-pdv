
const state = {//ou venda
    loja:'',
    caixa:'',
    func_caixa:'',    
    dtVenda:'',
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
    valorVenda:0,
    troco:0,
    qtdItens:0,
    qtdPagamentos:0,
    vendaFuncionario:false,
    formaPagamento:'',
    vendaValida:false,
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
    removeDescontos({commit},desconto){
        return new Promise(resolve =>{
            commit('removeDescontos',desconto)
            resolve(desconto)
        })
    },
    // OBSERVACAO
    observacao({commit},observacao){
        return new Promise(resolve =>{
            commit('observacao',observacao)
            resolve(observacao)
        })
    },
    limparVenda({commit}){
        return new Promise(resolve =>{
            commit('limparVenda',state)
            resolve()
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
        }else{
            produto.quantidade = 1
            produto.descontos=[]
            produto.valor = typeof produto.valor === 'undefined' ?1.99 : produto.valor
            state.itensSelecionados.push(produto)
            state.qtdItens = state.qtdItens +1
        }
        service.ajustarTotalItem(state);
    },
    removeItensSelecionados(state,produto){
        state.status = 'seleção de produtos'
        let exists = state.itensSelecionados.findIndex(x => x.SKU === produto.SKU);
        if(exists !== -1){
            state.itensSelecionados.splice(exists,1)
            state.qtdItens = state.qtdItens -1
        }else{
            console.log('produto não pode ser removido')
        }
        service.ajustarTotalItem(state);
    },
    qtdItensSelecionados(state, produto){
        state.status = 'seleção de produtos'
        let exists = state.itensSelecionados.findIndex(x => x.SKU === produto.SKU);
        state.itensSelecionados[exists].quantidade = produto.quantidade
        service.ajustarTotalItem(state,exists);
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
        }else{
            pagamento.id = state.pagamentos.length
            state.pagamentos.push(pagamento);
        }
        service.total(state);
    },
    removePayment(state, pagamento){
        state.status = 'em pagamento'
        let exists = state.pagamentos.findIndex(x => x.id === pagamento.id);
        if(exists !== -1){
            state.pagamentos.splice(exists,1)
        }else{
            console.log('impossivel remover o pagamento')
        }
        service.total(state);
    },
    //DESCONTOS ...
    addDescontos(state, desconto){
        state.status = 'em descontos'
        let exists = state.descontos.findIndex(x => x.id === desconto.id);
        if(exists !== -1){
            state.descontos[exists] = desconto
        }else{
            desconto.id = state.descontos.length
            state.descontos.push(desconto);
        }
        service.addDescontoProdutos(state);
    },
    removeDescontos(state, desconto){
        state.status = 'em descontos'
        let exists = state.descontos.findIndex(x => x.id === desconto.id);
        if(exists !== -1){
            state.descontos.splice(exists,1)
        }else{
            console.log('impossivel remover o pagamento')
        }
        service.addDescontoProdutos(state)
    },
    //  OBSERVAÇÃO
    observacao(state, observacao){
        state.obs = observacao
    },
    // LIMPAR A VENDA
    limparVenda(state){
        state.cliente= {
                tipo: 'cliente', 
                nome: 'cliente não identificado',
                cpf:'000000000',
            }
        state.vendedor={
                tipo: 'vendedor',
                nome: 'vendedor não identificado',
                cpf:'000000000',
            }
        state.pagamentos=[]
        state.itensSelecionados=[]
        state.descontos=[]
        state.valorProdutos=0
        state.valorPagamentos=0
        state.valorDesconto=0
        state.valorVenda=0
        state.troco=0
        state.qtdItens=0
        state.qtdPagamentos=0
        state.vendaFuncionario=false
        state.formaPagamento=''
        state.vendaValida=false
        state.status='sem venda'
        state.dtVenda=''
    },

};
const getters = {
    
};
const service ={
    ajustarTotalItem(state,indice){
        if(indice !== undefined){
        if(typeof state.itensSelecionados[indice].valor === 'undefined'){
            state.itensSelecionados[indice].valor = 1.00;
        }
        state.itensSelecionados[indice].total = (state.itensSelecionados[indice].quantidade * state.itensSelecionados[indice].valor)
        }else{
            state.itensSelecionados.forEach((produto)=>{
                if(typeof produto.valor === 'undefined'){
                    produto.valor = 1.00;
                }
                produto.total = (produto.quantidade * produto.valor)
            })
        }
    this.addDescontoProdutos(state)
    this.total(state)
    },
    total(state){
        state.valorProdutos=0
        state.subtotal=0
        state.valorProdutos=0
        state.valorPagamentos=0
        state.valorDesconto=0
        state.valorVenda=0
        state.troco=0
        state.qtdItens=0
        state.qtdPagamentos=0
        //produtos -- descontos
        state.itensSelecionados.forEach(produto => {
            var descontoTemp = 0
            
            if(produto.descontos.lenght !== 0){
                produto.descontos.forEach(desconto => {
                    descontoTemp += desconto.valor
                    state.valorDesconto += descontoTemp
                })
            }
            state.valorVenda += produto.total 
            state.valorProdutos +=  produto.total + descontoTemp
            state.qtdItens++
        })
        //pagamento -- troco
        if(state.pagamentos.length > 0){
            state.pagamentos.forEach(pagamento=>{
                state.valorPagamentos += pagamento.valor
                state.qtdPagamentos++ 
            })
            state.formaPagamento = state.qtdPagamentos >= 2 ? 'pagamento misto' : state.pagamentos[0].method
        }
        state.troco = state.valorPagamentos - state.valorVenda
        state.vendaValida = state.troco >=0? true:false
        console.log('VENDA ____>>>',state)
    },
    // DESCONTOS ...
    addDescontoProdutos(state){
        state.status = 'em descontos'
        state.valorDesconto = 0 
        if(typeof state.descontos !== 'undefined'){
            //loop produtos
            state.itensSelecionados.forEach((produto)=>{
                produto.descontos = []
                //loop descontos
                state.descontos.forEach((desconto)=>{
                    //desconto em todos os itens
                    if(desconto.todosProdutos){
                        let totalProduto = produto.total
                        //em %
                        if(desconto.porcentagem){
                            let valorDesconto   = (desconto.valor / 100) * totalProduto;
                            produto.descontos.push({
                                codigo:desconto.codigo,
                                valor:valorDesconto,
                                descricao: desconto.descricao,
                                valorPercent:desconto.valor,
                                porcentagem:desconto.porcentagem
                            })
                            state.valorDesconto += valorDesconto
                            this.total(state)
                        }
                        //em R$
                        else{
                            produto.descontos.push({
                                codigo:desconto.codigo,
                                valor:desconto.valor,
                                descricao: desconto.descricao,
                                valorPercent:'',
                                porcentagem:desconto.porcentagem
                            })
                            state.valorDesconto += desconto.valor
                            this.total(state)
                        }
                        //desconto em um SKU especifico
                    }else{
                        if(desconto.SKU === produto.SKU){
                            let totalProduto = produto.total
                            //em %
                            if(desconto.porcentagem){
                                let valorDesconto   = (desconto.valor / 100) * totalProduto ;
                                produto.descontos.push({
                                    codigo:desconto.codigo,
                                    valor:valorDesconto,
                                    descricao: desconto.descricao,
                                    valorPercent:desconto.valor,
                                    porcentagem:desconto.porcentagem
                                })
                                state.valorDesconto += valorDesconto
                                this.total(state)
                            }
                            //em R$
                            else{
                                produto.descontos.push({
                                    codigo:desconto.codigo,
                                    valor:desconto.valor,
                                    descricao: desconto.descricao,
                                    valorPercent:'',
                                    porcentagem:desconto.porcentagem
                                })
                                state.valorDesconto += desconto.valor
                                this.total(state)
                            }
                        }
                    }
                    
                })
            })
        }
        this.total(state)
    }
    
}
export default {
  state,
  getters,
  actions,
  mutations,
  service
};