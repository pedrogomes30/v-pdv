
const state = {//ou venda
    loja:'',
    caixa:'',
    funcCaixa:'',    
    dtVenda:'',//ano-mes-dia hora:minuto
    numero:'',//date(Y,m,d H:i)+storeAbbreviaiton+'-'+cashierId = 202202251652inval(totalvompra)CFJP-1
    obs:'',
    cliente:{
        documento:'',
        nome:'não identificado',
        email:'',
        telefone:'',
        empresaParc:'',
        nomeEmpresaParc:'',
        tipo:false,         
    },
    vendedor:{
        documento:'',
        nome:'não identificado',
        email:'',
        telefone:'',
        empresaParc:'',
        nomeEmpresaParc:'',
        tipo:false,         
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
    forcarCliente:false,
    formaPagamento:'',
    vendaValida:false,
    status:'sem venda',
    fiscal:false,
        nfce:{
            serie:'',
            numero:'',
            linkNfcePdf:'',
            linkNfceXml:'',
        }
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
    //LIMPAR VENDA
    limparVenda({commit}){
        return new Promise(resolve =>{
            commit('limparVenda',state)
            resolve()
        })
    },
    //cliente vendedor
    addCliente({commit},value){
        return new Promise(resolve =>{
            commit('addCliente',value)
            resolve()
        })
    },
    removerCliente({commit}){
        return new Promise(resolve =>{
            commit('removerCliente')
            resolve()
        })
    },
    addVendedor({commit},value){
        return new Promise(resolve =>{
            commit('addVendedor',value)
            resolve()
        })
    },
    removerVendedor({commit}){
        return new Promise(resolve =>{
            commit('removerVendedor')
            resolve()
        })
    },
    forcarCliente({commit},tipo){
        return new Promise(resolve =>{
            commit('forcarCliente',tipo)
            resolve(tipo)
        })
    },
    // Finalizar venda
    finalizarVenda({commit}){
        return new Promise(resolve =>{
            console.log('find newVEnda')
            commit('newVenda',state)
            resolve()
            service.limparVenda()
        })
    },
    

};
const mutations = {
    //CARRINHO ...
    includeItensSelecionados(state, produto){
        state.status = 'seleção de produtos'
        let exists = state.itensSelecionados.findIndex(x => x.SKU === produto.SKU);
        if(exists !== -1){
            state.itensSelecionados[exists].quantidade = state.itensSelecionados[exists].quantidade+1
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
        state.forcarCliente = desconto.comCliente
        service.addDescontoProdutos(state);
    },
    removeDescontos(state, desconto){
        state.status = 'em descontos'
        let exists = state.descontos.findIndex(x => x.id === desconto.id);
        if(exists !== -1){
            state.descontos.splice(exists,1)
        }else{
            console.log('impossivel remover o desconto')
        }
        service.addDescontoProdutos(state)
        service.total()
    },
    //  OBSERVAÇÃO
    observacao(state, observacao){
        state.obs = observacao
    },
    // LIMPAR A VENDA
    limparVenda(state){
        state.cliente={
            documento:'',
            nome:'não identificado',
            email:'',
            telefone:'',
            empresaParc:'',
            nomeEmpresaParc:'',
            tipo:false,         
        },
        state.vendedor={
            documento:'',
            nome:'não identificado',
            email:'',
            telefone:'',
            empresaParc:'',
            nomeEmpresaParc:'',
            tipo:false,         
        },
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
        state.vendaCliente=false
        state.forcarCliente=false
        state.formaPagamento=''
        state.vendaValida=false
        state.status='sem venda'
        state.dtVenda=''
        state.obs=''
    },
    //CLIENTE
    addCliente(state, cliente){
        state.cliente = cliente
        service.total(state)
    },
    removerCliente(state){
        state.cliente = {
            documento:'',
            nome:'não identificado',
            email:'',
            telefone:'',
            empresaParc:'',
            nomeEmpresaParc:'',
            tipo:false,         
        }   
        service.total(state)
    },
    addVendedor(state, vendedor){
        state.vendedor = vendedor
        service.total(state)
    },
    removerVendedor(state){
        state.vendedor = {
            documento:'',
            nome:'não identificado',
            email:'',
            telefone:'',
            empresaParc:'',
            nomeEmpresaParc:'',
            tipo:false,         
        }   
        service.total(state)
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
                    state.valorDesconto += desconto.valor
                    descontoTemp += desconto.valor
                })
            }
            state.valorVenda += produto.total - descontoTemp
            state.valorProdutos +=  produto.total 
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
        state.troco = (state.valorPagamentos - state.valorVenda)
        state.troco= +(state.troco.toFixed(2))
        //validar a venda
        state.vendaValida = true
        state.status = "Finalizada"
        if(typeof state.itensSelecionados === 'undefined'){state.vendaValida = false; state.status=' Não há item nesta venda.'}
        if(state.troco >= 0 && state.valorPagamentos === 0){state.vendaValida = false; state.status=' Não há pagamentos nesta venda.'}
        if(state.valorVenda < 0 ){state.vendaValida = false; state.status=' venda com o total negativo.'}
        if(state.valorProdutos <=0){state.vendaValida = false; state.status=' venda com o total de produtos zerado.'}
        if(state.valorDesconto > state.valorProdutos){state.vendaValida = false; state.status=' valor de desconto maior que o valor total da venda.'}
        if(state.troco <0){state.vendaValida = false; state.status=' valor de pagamento menor que o valor total da venda.'}
        if(state.forcarCliente && state.cliente.tipo !== state.forcarCliente){state.vendaValida = false; state.status=`necessário informar um ${state.forcarCliente} nesta venda.`}
    
        console.log('VENDA ->',state)
    },
    // DESCONTOS ...
    addDescontoProdutos(state){
        state.status = 'em descontos'
        state.valorDesconto = 0 
        var tempTotal = 0
        state.itensSelecionados.forEach((produtoTotal)=>{
            tempTotal += produtoTotal.total
        })
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
                        }
                        //em R$
                        else{
                            //obter o total de produtos
                            var porcenProduto = produto.total/ tempTotal;
                            var descontoPercent = desconto.valor * porcenProduto
                            produto.descontos.push({
                                codigo:desconto.codigo,
                                valor:descontoPercent,
                                descricao: desconto.descricao,
                                valorPercent:'',
                                porcentagem:desconto.porcentagem
                            })
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
                            }
                        }
                    }
                   state.forcarCliente = desconto.comCliente? desconto.comCliente:false
                })
            })
            this.total(state)
        }
    }
    
}
export default {
  state,
  getters,
  actions,
  mutations,
  service
};