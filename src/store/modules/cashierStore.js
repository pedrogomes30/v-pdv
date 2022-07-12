const state = {//ou venda
   //suport values
    change_value:0,
    qtd_items:0,
    qtd_payments:0,
    force_customer:false,
    payment_method:'',
    valid_sale:false,
    //
    number: '',
    sale_date: '',
    store: '',
    cashier: '',
    employee_cashier: '',
    employee_sale: false,
    obs: '',
    invoice:false,
    products_value: 0,
    payments_value: 0,
    discont_value: 0,
    total_value: 0,
    nfce:{
        serie:'',
        number:'',
        cupom_pdf:'',
        nfce_xml:'',
    },
    customer: {
        // document: "",
        // name: "",
        // email: "",
        // phone: "",
        // type: "",
        // store_partiner_id: "",
        // store_partiner_name: ""
    },
    salesman: {
        // document: "",
        // name: "",
        // email: "",
        // phone: "",
        // type: "",
        // store_partiner_id: "",
        // store_partiner_name: ""
    },
    payments: [
        // {
        //     value:0.00,
        //     payment_method_id: 1
        //     payment_date:'',
        // }
    ],
    items:[
        // {
        //     product_id: "25",
        //     description:'',
        //     quantity: 5,
        //     value: 3.99,
        //     discont_value: 1.99,
        //     item_date:'',
        //     disconts:[
        //         {
                    // code:'',
                    // description: '',
                    // discont_total:0
                    // disconts_calculated:0.00,
        //         }
        //     ]
        // },
    ],
    disconts: [
        // {
        //     id: '',
        //     with_client: "",
        //     code: "",
        //     description: "",
        //     value: 10,
        //     all_products: 0,
        //     acumulate: false,
        //     percent: true,
        //     quantity: 0
        // }
    ]
};

const actions = {
    //CARRINHO ...
    addItem({commit},product){
        return new Promise(resolve =>{
            commit('addItem',product)
            resolve(product)
        })
    },
    removeItem({commit},product){
        return new Promise(resolve =>{
            commit('removeItem',product)
            resolve(product)
        })
    },
    qtdItem({commit},product){
        return new Promise(resolve =>{
            commit('qtdItem',product)
            resolve(product)
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
    //discontS
    addDisconts({commit},discont){
        return new Promise(resolve =>{
            commit('addDisconts',discont)
            resolve(discont)
        })
    },
    removedisconts({commit},discont){
        return new Promise(resolve =>{
            commit('removedisconts',discont)
            resolve(discont)
        })
    },
    // addObs
    addObs({commit},obs){
        return new Promise(resolve =>{
            commit('addObs',obs)
            resolve(obs)
        })
    },
    //LIMPAR VENDA
    cleanSale({commit}){
        return new Promise(resolve =>{
            commit('cleanSale',state)
            resolve()
        })
    },
    //cliente vendedor
    addCustomer({commit},value){
        return new Promise(resolve =>{
            commit('addCustomer',value)
            resolve()
        })
    },
    removeCustomer({commit}){
        return new Promise(resolve =>{
            commit('removeCustomer')
            resolve()
        })
    },
    addSalesman({commit},value){
        return new Promise(resolve =>{
            commit('addSalesman',value)
            resolve()
        })
    },
    removeSalesman({commit}){
        return new Promise(resolve =>{
            commit('removeSalesman')
            resolve()
        })
    },
    force_customer({commit},tipo){
        return new Promise(resolve =>{
            commit('force_customer',tipo)
            resolve(tipo)
        })
    },
    // Finalizar venda
    finalizarVenda({commit}){
        return new Promise(resolve =>{
            console.log('find newVEnda')
            commit('newVenda',state)
            resolve()
            service.cleanSale()
        })
    },
    

};
const mutations = {
    //CART ...
    addItem(state, product){
        state.status = 'seleção de products'
        let exists = state.items.findIndex(x => x.sku === product.sku);
        if(exists !== -1){
            state.items[exists].quantity = state.items[exists].quantity+1
        }else{
            product.quantity        = 1
            product.disconts        =[]
            product.value           = product.price
            state.items.push(product)
            state.qtd_items         = state.qtd_items +1
        }
        service.processItemValue(state);
    },
    removeItem(state,product){
        state.status = 'seleção de products'
        let exists = state.items.findIndex(x => x.sku === product.sku);
        if(exists !== -1){
            state.items.splice(exists,1)
            state.qtd_items = state.qtd_items -1
        }else{
            alert('produto não pode ser removido')
        }
        service.processItemValue(state);
    },
    qtdItem(state, product){
        state.status = 'seleção de products'
        let exists = state.items.findIndex(x => x.sku === product.sku);
        state.items[exists].quantity = product.quantity
        service.processItemValue(state,exists);
    },   
    cleanCart(state){
        state.status = 'sem venda'
        state.items  = [],
        service.total(state);
    },   
    // PAYMENTS...
    addPayment(state, payment){
        state.status = 'em pagamento'
        let exists = state.payments.findIndex(x => x.method_id === payment.method_id);
        if(exists !== -1){
            state.payments[exists].value += payment.value
        }else{
            state.payments.push(payment);
        }
        service.total(state);
    },
    removePayment(state, payment){
        state.status = 'em pagamento'
        let exists = state.payments.findIndex(x => x.method_id === payment.method_id);
        if(exists !== -1){
            state.payments.splice(exists,1)
        }else{
            alert('impossivel remover este apgamento')
        }
        service.total(state);
    },
    //DISCONTS ...
    addDisconts(state, discont){
        state.status = 'em disconts'
        let exists = state.disconts.findIndex(x => x.id === discont.id);
        if(exists !== -1){
            state.disconts[exists] = discont
        }else{
            discont.id = state.disconts.length
            state.disconts.push(discont);
        }
        state.force_customer = discont.with_client
        service.addDiscontsToProducts(state);
    },
    removeDisconts (state, discont){
        state.status = 'em disconts'
        let exists = state.disconts.findIndex(x => x.id === discont.id);
        if(exists !== -1){
            state.disconts.splice(exists,1)
        }else{
            alert('impossivel remover discont')
        }
        service.addDiscontsToProducts(state)
    },
    //  OBSERVATION
    addObs(state, obs){
        state.obs = obs
    },
    // LIMPAR A VENDA
    cleanSale(state){
        state.customer='',
        state.salesman='',
        state.payment=[]
        state.items=[]
        state.disconts=[]
        state.products_value=0
        state.payments_value=0
        state.discont_value=0
        state.total_value=0
        state.change_value=0
        state.qtd_items=0
        state.qtd_payments=0
        state.employee_sale=false
        state.force_customer=false
        state.payment_method=''
        state.valid_sale=false
        state.status='sem venda'
        state.sale_date=''
        state.obs=''
    },
    //CLIENTE
    addCustomer(state, customer){
        state.customer = customer
        service.total(state)
    },
    removeCustomer(state){
        state.customer = ''
        service.total(state)
    },
    addSalesman(state, salesman){
        state.salesman = salesman
        service.total(state)
    },
    removeSalesman(state){
        state.vendedor = ''
        service.total(state)
    },
};
const getters = {
    
};
const service ={
    /*
        calculate total of a product ( quantity * value_unitary)
    */
    processItemValue(state,indice){
        if(indice !== undefined){
            if(typeof state.items[indice].value === 'undefined'){
                alert('erro ao calcular total do produto')
            }
            state.items[indice].total = (state.items[indice].quantity * state.items[indice].value)
        }else{
            state.items.forEach((product)=>{
                if(typeof product.value === 'undefined'){
                    alert('erro ao calcular total do produto')
                }
                product.total = (product.quantity * product.value)
            })
        }
    this.addDiscontsToProducts(state)
    this.total(state)
    },
    total(state){
        state.subtotal=0
        state.products_value=0
        state.payments_value=0
        state.discont_value=0
        state.total_value=0
        state.change_value=0
        state.qtd_items=0
        state.qtd_payments=0
        //products -- disconts
        state.items.forEach(product => {
            var temp_discont = 0
            if(product.disconts.lenght !== 0){
                product.disconts.forEach(discont => {
                    state.discont_value += discont.disconts_calculated
                    temp_discont        += discont.disconts_calculated
                })
            }
            state.total_value   += product.total - temp_discont
            state.products_value += product.total 
            state.qtd_items++
        })
        //pagamento -- change_value
        if(state.payments.length > 0){
            state.payments.forEach(payment=>{
                state.value += payment.value
                state.qtd_payments++ 
            })
        }
        state.change_value = (state.payments_value - state.total_value)
        state.change_value =+(state.change_value.toFixed(2))
        //validar a venda
        state.valid_sale = true
        state.status = "Finalizada"
        if(typeof state.items === 'undefined'){state.valid_sale = false; state.status=' Não há item nesta venda.'}
        if(state.change_value >= 0 && state.payments_value === 0){state.valid_sale = false; state.status=' Não há pagamentos nesta venda.'}
        if(state.total_value < 0 ){state.valid_sale = false; state.status=' venda com o total negativo.'}
        if(state.products_value <=0){state.valid_sale = false; state.status=' venda com o total de products zerado.'}
        if(state.discont_value > state.products_value){state.valid_sale = false; state.status=' valor de discont maior que o valor total da venda.'}
        if(state.change_value <0){state.valid_sale = false; state.status=' valor de pagamento menor que o valor total da venda.'}
        if(state.force_customer && state.cliente.tipo !== state.force_customer){state.valid_sale = false; state.status=`necessário informar um ${state.force_customer} nesta venda.`}
    
        console.log('VENDA ->',state)
    },
    // discontS ...
    addDiscontsToProducts(state){
        state.status = 'em disconts'
        state.discont_value = 0 
        var tempTotal = 0
        state.items.forEach((product)=>{
            tempTotal += product.total
        })
        if(typeof state.disconts !== 'undefined'){
            //loop products
            state.items.forEach((product)=>{
                product.disconts = []
                //loop disconts
                state.disconts.forEach((discont)=>{
                    //discont em todos os itens
                    if(discont.all_products){
                        let totalproduct = product.total
                        //em %
                        if(discont.percent){
                            let discont_value   = (discont.value / 100) * totalproduct;
                            product.disconts.push({
                                code            :discont.code,
                                description     :discont.description,
                                price           :discont_value,
                                value           :discont.value,
                                percent         :discont.percent
                            })
                        }
                        //em R$
                        else{
                            //obter o total de products
                            var percent_product = product.total/ tempTotal;
                            var discontPercent = discont.valor * percent_product
                            product.disconts.push({
                                code        :discont.code,
                                description :discont.description,
                                price       :discontPercent,
                                value       :'',
                                percent     :discont.percent
                            })
                        }
                        //discont em um SKU especifico
                    }else{
                        if(discont.sku === product.sku){
                            let totalproduct = product.total
                            //em %
                            if(discont.percent){
                                let discont_value   = (discont.value / 100) * totalproduct ;
                                product.disconts.push({
                                    code            :discont.cade,
                                    description     :discont.description,
                                    price           :discont_value,
                                    value           :discont.value,
                                    percent         :discont.percent
                                })
                            }
                            //em R$
                            else{
                                product.disconts.push({
                                    code            :discont.code,
                                    price           :discont.value,
                                    description     :discont.description,
                                    value           :'',
                                    percent         :discont.percent
                                })
                            }
                        }
                    }
                   state.force_customer = discont.with_client? discont.with_client : false
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