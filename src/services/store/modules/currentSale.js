const state = {
    change_value:0,
    qtd_items:0,
    qtd_payments:0,
    forceCustomer:false,
    payment_method:'',
    valid_sale:false,
    number: '',
    id:'',
    sale_date: '',
    store: '',
    cashier: '',
    employee_cashier: '',
    employee_sale: false,
    obs: '',
    sys_obs:'',
    products_value: 0,
    payments_value: 0,
    discont_value: 0,
    total_value: 0,
    invoice:false,
    invoice_serie:'',
    invoice_number:'',
    invoice_coupon:'',
    invoice_xml:'',
    customer: {
        // modulo person
    },
    salesman: {
         // modulo person
    },
    payments: [
        // modulo payment
    ],
    items:[
        // modulo cart
    ],
    disconts: [
        // modulo discont
    ]
};

const actions = {
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
};
const mutations = {
    addObs(state, obs){
        state.obs = obs
    },
    // LIMPAR A VENDA
    cleanSale(state){
        state.change_value = 0
        state.qtd_items = 0
        state.qtd_payments = 0
        state.forceCustomer = false
        state.payment_method = ''
        state.valid_sale = false
        state.number =  ''
        state.sale_date =  ''
        state.store =  ''
        state.cashier =  ''
        state.employee_cashier =  ''
        state.employee_sale =  false
        state.obs =  ''
        state.sys_obs =  ''
        state.invoice = false
        state.products_value =  0
        state.payments_value =  0
        state.discont_value =  0
        state.total_value =  0
        state.nfce = {
            serie : '',
            number : '',
            cupom_pdf  :'',
            nfce_xml : ''
        }
        state.customer =  {
            // document:  "1",
            // name :  "Cliente não identificado",
            // email :  "",
            // phone :  "",
            // type :  "",
            // store_partiner_id :  "",
            // store_partiner_name :  ""
        }
        state.salesman =  {
            // document  : "2",
            // name  : "Vendedor não identificado",
            // email :  "",
            // phone : "",
            // type :  "",
            // store_partiner_id :  "",
            // store_partiner_name :  "",
        }
        state.payments =  []
        state.items = []
        state.disconts = []
        service.total(state)
    },
    
};
const getters = {
    getItems(state){
        return state.items
    }
};
const service ={
    total(state){
        state.products_value=0
        state.payments_value=0
        state.discont_value=0
        state.total_value=0
        state.change_value=0
        state.qtd_items=0
        state.qtd_payments=0
        //products -- disconts
        state.items.forEach(product => {
            if(product.disconts.lenght !== 0){
                product.disconts.forEach(discont => {
                    state.discont_value += discont.price
                })
            }
            state.total_value           += product.total
            state.products_value        += product.quantity * product.price 
            state.qtd_items++
        })
        //pagamento -- change_value
        if(state.payments.length > 0){
            state.payments.forEach(payment=>{
                state.payments_value += payment.method_value
                state.qtd_payments++ 
            })
        }
        state.change_value = (state.payments_value - state.total_value)
        state.change_value =+(state.change_value.toFixed(2))
        //validar a venda
        state.valid_sale = true
        state.status = "Finalizada"
        if(typeof(state.items) === 'undefined'){state.valid_sale = false; state.status=' Não há item nesta venda.'}
        if(state.change_value >= 0 && state.payments_value === 0){state.valid_sale = false; state.status=' Não há pagamentos nesta venda.'}
        if(state.total_value < 0 ){state.valid_sale = false; state.status=' venda com o total negativo.'}
        if(state.products_value <=0){state.valid_sale = false; state.status=' venda com o total de products zerado.'}
        if(state.discont_value > state.products_value){state.valid_sale = false; state.status=' valor de discont maior que o valor total da venda.'}
        if(state.change_value <0){state.valid_sale = false; state.status=' valor de pagamento menor que o valor total da venda.'}
        if(state.forceCustomer && state.customer.type !== state.forceCustomer){state.valid_sale = false; state.status=`necessário informar um ${state.forceCustomer} nesta venda.`}
    },
    // discontS ...
    addDiscontsToProducts(state){
        state.status = 'em disconts'
        state.discont_value = 0 
        var tempTotal = 0
        state.items.forEach((product)=>{
            tempTotal += product.total
        })
        if(typeof(state.disconts) !== 'undefined'){
            //loop products
            state.items.forEach((product)=>{
                product.disconts = []
                product.total = product.price * product.quantity
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
                            product.total -= discont_value
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
                            product.total -= discontPercent
                        }
                        //discont em um SKU especifico
                    }else{
                        if(discont.sku === product.sku){
                            let totalproduct = product.total
                            //em %
                            if(discont.percent){
                                let discont_value   = (discont.value / 100) * totalproduct ;
                                product.disconts.push({
                                    code            :discont.code,
                                    description     :discont.description,
                                    price           :discont_value,
                                    value           :discont.value,
                                    percent         :discont.percent
                                })
                                product.total -= discont_value
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
                                product.total -= discont.value
                            }
                        }
                    }
                   state.forceCustomer = discont.with_client? discont.with_client : false
                })
            })
            this.total(state)
        }
    },
    removeForceCustomer(state){
        state.forceCustomer = false
        service.total(state)
    },
    
}
export default {
  state,
  getters,
  actions,
  mutations,
  service
};