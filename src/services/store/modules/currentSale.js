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
    },
    getItems(state) {
        return state.items;
    },
};

const mutations = {
    //cart submodule
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
    //customer submodule



    addObs(state, obs){
        state.obs = obs
    },
    cleanThisSale(state) {
        console.log('limpando venda 2+')
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
        // calll customer clear
        
        // state.customer = {};
        state.salesman = {};
        state.payments = [];
        state.items = [];
        state.cupoms = [];
    },

    
};

const actions = {
    //cart submodule
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

    


    addObs({commit},obs){
        return new Promise(resolve =>{
            commit('addObs',obs)
            resolve(obs)
        })
    },
    
    cleanSale({commit}){
        return new Promise(resolve =>{
            console.log('limpando venda')
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