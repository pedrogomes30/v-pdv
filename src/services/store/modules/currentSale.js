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
    cupoms: [
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
    recalculateSale(state){
        console.log(state,'')
    },
    setForceLabel(state){
        state.forceLabel = true
        service.total(state)
    },
    removeForceLabel(state){
        state.forceLabel = false
        service.total(state)
    }    
}
export default {
  state,
  getters,
  actions,
  mutations,
  service
};