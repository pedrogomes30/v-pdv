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
    products_value: 0,
    payments_value: 0,
    discont_value: 0,
    total_value: 0,
    invoice:false,
    invoice_serie:'',
    invoice_number:'',
    invoice_coupon:'',
    //ads
    customer: {},
    salesman: {},
    payments: [],
    items:[],
    cupoms: []
};

const getters = {
    getCurrentSale(state) {
        return state;
    }
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
    cleanSale(state) {
        state.change_value = 0;
        state.qtd_items = 0;
        state.qtd_payments = 0;
        state.forceCustomer = false;
        state.payment_method = '';
        state.valid_sale = false;
        state.number = '';
        state.id = '';
        state.sale_date = '';
        state.store = '';
        state.cashier = '';
        state.employee_cashier = '';
        state.employee_sale = false;
        state.obs = '';
        state.products_value = 0;
        state.payments_value = 0;
        state.discont_value = 0;
        state.total_value = 0;
        state.invoice = false;
        state.invoice_serie = '';
        state.invoice_number = '';
        state.invoice_coupon = '';
        //ads
        state.customer = {};
        state.salesman = {};
        state.payments = [];
        state.items = [];
        state.cupoms = [];
    },

    
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
    namespaced: true, 
    state,
    getters,
    actions,
    mutations,
    service
};