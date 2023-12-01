
const state = {
    qtd_items: 0,
    qtd_payments: 0,
    forceLabel: null,
    payment_method: '',
    valid_sale: false,
    number: '',
    id: '',
    sale_date: '',
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
        service.recalculateSale(state);
    },
    incrementQuantity(state, product) {
        const existingProduct = state.items.find(item => item.sku === product.sku);
        if (existingProduct) {
            existingProduct.quantity++;
            existingProduct.total = service.calculateProductValues(existingProduct);
        }
        
        service.recalculateSale(state);
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
        service.recalculateSale(state);
    },
    removeItem(state, product) {
        const index = state.items.findIndex(item => item.sku === product.sku);
        if (index !== -1) {
            state.items.splice(index, 1);
        }
        service.recalculateSale(state);
    },
    clearItems(state) {
        state.items = [];
    },
    adddiscontToProduct(state, { product, discont }) {
        const existingProduct = state.items.find(item => item.sku === product.sku);
        if (existingProduct) {
            if (!existingProduct.disconts) {
                existingProduct.disconts = [];
            }
            existingProduct.disconts.push(discont);
        }
        service.recalculateSale(state);
    },
    removediscontFromProduct(state, { product, discontCode }) {
        const existingProduct = state.items.find(item => item.sku === product.sku);
        if (existingProduct && existingProduct.disconts) {
            existingProduct.disconts = existingProduct.disconts.filter(discont => discont.code !== discontCode);
        }
        service.recalculateSale(state);
    },


    //cupons mutation submodule
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
        state.forceLabel = discont.label;
        service.recalculateSale(state);
    },
    removecupoms (state, discont){
        state.status = 'em cupoms'
        let exists = state.cupoms.findIndex(x => x.id === discont.id);
        if(exists !== -1){
            state.cupoms.splice(exists,1)
        }else{
            alert('impossivel remover discont')
        }
        service.recalculateSale(state);
    },
    cleardisconts(state) {
        state.cupoms = [];
        service.recalculateSale(state);
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
        service.recalculateSale(state);
    },
    removePayment(state, payment){
        state.status = 'em pagamento'
        let exists = state.payments.findIndex(x => x.method_id === payment.method_id);
        if(exists !== -1){
            state.payments.splice(exists,1)
        }else{
            alert('impossivel remover este apgamento')
        }
        service.recalculateSale(state);
    },
    clearMethods(state) {
        state.payments = [];
        service.recalculateSale(state);
    },


    //person mutation 
    addCustomer(state, customer){
        console.log(customer);
        state.customer = customer
        service.recalculateSale(state);
    },
    removeCustomer(state){
        state.customer = null;
        service.recalculateSale(state);
    },
    //customer and salesman
    clearPerson(state){   
        state.customer = null;
        state.salesman = null;
        service.recalculateSale(state);
    },


    //sale mutation submodule
    addObs(state, obs){
        state.obs = obs
        service.recalculateSale(state);
    },
    cleanThisSale(state) {
        state.change_value = 0;
        state.qtd_items = 0;
        state.qtd_payments = 0;
        state.forceLabel = null;
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
        product.total = product.price * product.quantity;
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
        product.total = product.price * product.quantity;
        return new Promise(resolve => {
            commit('incrementQuantity', product);
            resolve();
        });
    },
    decrementProductCart({ commit }, product){
        product.total = product.price * product.quantity;
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
    adddiscont({ commit }, { product, code, value }) {
        const discont = { code, value };
        commit('adddiscontToProduct', { product, discont });
      },
    removediscont({ commit }, { product, discontCode }) {
        commit('removediscontFromProduct', { product, discontCode });
    },


    //cupoons action submodule
    addCupom({ commit }, discont) {
        commit('addcupoms', discont);
    },
    removeCupom({ commit }, discont) {
        commit('removecupoms', discont);
    },
    clearCupoms({ commit }) {
        commit('cleardisconts');
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


    //person action submodule   
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
    clearCustomerSalesman({commit}){
        return new Promise(resolve =>{
            commit('clearPerson')
            resolve()
        })
    },

    //salle action submodule
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
    calculateItemsValue(items) {
        return items.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0).toFixed(2);
    },
    calculateProductValues(product) {
        const itemTotal = product.price * product.quantity;
        if (product.disconts) {
            const totaldiscont = product.disconts.reduce((total, discont) => total + discont.value, 0);
            return itemTotal - totaldiscont;
        }
        return itemTotal;
    },
    recalculateSale(state){
        //calculate disconts_array and set each product discont
        const discontCalculated  = service.calculatedisconts(state); //this will return a array [items, disconts, discont_value]
        state.discont_value = discontCalculated[0];
        state.items = discontCalculated[1];
        state.products_value = service.calculateItemsValue(state.items)
        state.total_value = state.items.reduce((total, item) => total + parseFloat(item.total), 0).toFixed(2);
        state.payments_value = state.payments.reduce((total, payment) => total + parseFloat(payment.method_value), 0).toFixed(2);
        state.change_value = (state.payments_value - state.products_value).toFixed(2);
        state.valid_sale = state.change_value >= 0; 
        // state.total_value = 99999;
        
        console.log("TESTE RECALCULATE SALE", state)
    },
    calculatedisconts(state) {
        let discontValue = 0;
        let disconts = state.cupoms;
        let itemsTotal = state.products_value;
        let items = JSON.parse(JSON.stringify(state.items));
        let discontValueNonPercent = 0;
        disconts.forEach(discont => {
            if(discont.percent){
                discontValue += itemsTotal * (discont.value/100);
            }else{
                discontValueNonPercent += discont.value;
                discontValue += discont.value;
            }
        });    
            
        //calculate discont per item, per porcentage and fixed value
        items.forEach(item => {
            item.disconts = [];
            let total = item.quantity * item.price;
            let totalDiscont = total;
            disconts.forEach(discont => {
                if (discont.percent) {
                    let discontForItem = total * (discont.value / 100);
                    totalDiscont -= discontForItem;
                    item.disconts.push({ ...discont, value: discontForItem.toFixed(2) });
                } else {
                    if (discontValueNonPercent === 0) {
                        throw new Error('Desconto do tipo valor está zerado.');
                    }
                    let itemPercentOfSale = total / itemsTotal;
                    let discontForItem = itemPercentOfSale * discontValueNonPercent;
                    totalDiscont -= discontForItem / item.quantity;
                    item.disconts.push({ ...discont, value: discontForItem });
                }
            });
            item.total = totalDiscont.toFixed(2);
        });
        if(discontValue > itemsTotal){
            throw new Error('Desconto maior que o valor da venda');
        }
        return [discontValue,items];
    },
    
    calculatePayments(state){
        return state
    },
    processCustomerLabel(state){
        if(state.customer && state.customer.label){
            state.customer_label = state.customer.name
            state.forceCustomer
        }else{
            state.customer_label = 'Cliente não informado'
        }
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