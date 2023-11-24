const state = {
    change_value: 0,
    qtd_items: 0,
    qtd_payments: 0,
    forceCustomer: false,
    payment_method: '',
    valid_sale: false,
    number: '',
    id: '',
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
    invoice: false,
    invoice_serie: '',
    invoice_number: '',
    invoice_coupon: '',
    customer: {},
    salesman: {},
    payments: [],
    items: [],
    cupoms: []
}

const getters = {
    getCurrentSale(state) {
        return state;
    },
    getItems(state) {
        return state.items;
    },
    getCupoms(state) {
        return state.cupoms;
    },
    getPayments(state) {
        return state.payments;
    },
};

const mutations = {
    //cart mutation submodule
    addItem(state, product) {
        product.total = service.calculateProductValues(product);
        state.items.push(product);
    },
    incrementQuantity(state, product) {
        const existingProduct = state.items.find(item => item.sku === product.sku);
        if (existingProduct) {
            existingProduct.quantity++;
            existingProduct.total = service.calculateProductValues(existingProduct);
        }
    },
    decrementQuantity(state, product) {
        const existingProduct = state.items.find(item => item.sku === product.sku);
        if (existingProduct) {
            existingProduct.quantity--;
            existingProduct.total = service.calculateProductValues(existingProduct);
            if(existingProduct.quantity <= 0){
                const index = state.items.findIndex(item => item.sku === product.sku);
                if (index !== -1) {
                    state.items.splice(index, 1);
                }
            }
        }
    },
    removeItem(state, product) {
        const index = state.items.findIndex(item => item.sku === product.sku);
        if (index !== -1) {
            state.items.splice(index, 1);
        }
    },
    clearItems(state) {
        state.items = [];
    },
    addDiscountToProduct(state, { product, discount }) {
        const existingProduct = state.items.find(item => item.sku === product.sku);
        if (existingProduct) {
            if (!existingProduct.discounts) {
                existingProduct.discounts = [];
            }
            existingProduct.discounts.push(discount);
        }
    },
    removeDiscountFromProduct(state, { product, discountCode }) {
        const existingProduct = state.items.find(item => item.sku === product.sku);
        if (existingProduct && existingProduct.discounts) {
            existingProduct.discounts = existingProduct.discounts.filter(discount => discount.code !== discountCode);
        }
    },


    //cupoons mutation submodule
    addcupoms(state, discont){
        if(discont.acumulate === 1){
            state.cupoms.push(discont)
        }else if(state.cupoms.length > 0){
            let exists = state.cupoms.findIndex(x => x.code === discont.code);
            if(exists !== -1){
                throw new Error('Cupom já adicionado')
            }else{
                state.cupoms.push(discont)
            }
        }else{
            state.cupoms.push(discont)
        }
        switch(discont.label){
            case 'client': state.forceCustomer = true; break;
            case 'funcionario': state.forceEmployee = true; break;
            case 'funcionarioParc': state.forceEmployeeParc = true; break;
            default: break;
        }
    },
    removecupoms (state, discont){
        state.status = 'em cupoms'
        let exists = state.cupoms.findIndex(x => x.id === discont.id);
        if(exists !== -1){
            state.cupoms.splice(exists,1)
        }else{
            alert('impossivel remover discont')
        }
    },
    clearDiscounts(state) {
        state.cupoms = [];
    },


    //payment mutation submodule
    addPayments(state, payment){
        state.status = 'em pagamento'
        let exists = state.payments.findIndex(x => x.method_id === payment.method_id);
        if(exists !== -1 ){
            state.payments[exists].method_value = parseFloat(payment.method_value.replace(/\D/g, ''))/100;
        }else{
            payment.method_value = parseFloat(payment.method_value.replace(/\D/g, ''))/100;
            state.payments.push(payment);
        }
        console.log('addpayment',state.payments)
    },
    removePayment(state, payment){
        state.status = 'em pagamento'
        let exists = state.payments.findIndex(x => x.method_id === payment.method_id);
        if(exists !== -1){
            state.payments.splice(exists,1)
        }else{
            alert('impossivel remover este apgamento')
        }
    },
    clearMethods(state) {
        state.payments = [];
    },
    //


    addObs(state, obs){
        state.obs = obs
    },
    cleanThisSale(state) {
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
        state.salesman = {};
        state.payments = [];
        state.items = [];
        state.cupoms = [];
    },

    
};

const actions = {
    //cart action submodule
    addToCart({ state, commit }, product) {
        return new Promise(resolve => {
            const existingProduct = state.items.find(item => item.sku === product.sku);
    
            if (existingProduct) {
                commit('incrementQuantity', existingProduct);
            } else {
                const productWithQuantity = { ...product, quantity: 1, disconts:[], total:0 };
                commit('addItem', productWithQuantity);
            }
            resolve();
        });
    },
    incrementProductCart({ commit }, product){
        return new Promise(resolve => {
            commit('incrementQuantity', product);
            resolve();
        });
    },
    decrementProductCart({ commit }, product){
        return new Promise(resolve => {
            commit('decrementQuantity', product);
            resolve();
        });
    },
    removeFromCart({ commit }, product) {
        return new Promise(resolve => {
            commit('removeItem', product);
            resolve();
        });
    },
    clearCart({ commit }) {
        return new Promise(resolve => {
            commit('clearItems');
            resolve();
        }); 
    },
    addDiscount({ commit }, { product, code, value }) {
        const discount = { code, value };
        commit('addDiscountToProduct', { product, discount });
      },
    removeDiscount({ commit }, { product, discountCode }) {
        commit('removeDiscountFromProduct', { product, discountCode });
    },


    //cupoons action submodule
    addCupom({ commit }, discont) {
        commit('addcupoms', discont);
    },
    removeCupom({ commit }, discont) {
        commit('removecupoms', discont);
    },
    clearCupoms({ commit }) {
        commit('clearDiscounts');
    },
      

    //payment action submodule
    addPayment({commit},pagamento){
        return new Promise(resolve =>{
            commit('addPayments',pagamento)
            resolve(pagamento)
        })
    },
    removePayment({commit},pagamento){
        return new Promise(resolve =>{
            commit('removePayment',pagamento)
            resolve(pagamento)
        })
    },
    clearPayments({commit}) {
        return new Promise(resolve =>{
            commit('clearMethods')
            resolve()
        })
    },

    addObs({commit},obs){
        return new Promise(resolve =>{
            commit('addObs',obs)
            resolve(obs)
        })
    },
    
    cleanSale({commit}){
        return new Promise(resolve =>{
            commit('cleanThisSale',state);
            resolve()
        })
    },   
};


//calculateds functions
const service ={
    calculateProductValues(product) {
        const itemTotal = product.price * product.quantity;
        if (product.discounts) {
            const totalDiscount = product.discounts.reduce((total, discount) => total + discount.value, 0);
            return itemTotal - totalDiscount;
        }
        return itemTotal;
    },
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
    },
    
    

}
export default {
    namespaced: true, 
    state,
    getters,
    actions,
    mutations,
    service
};