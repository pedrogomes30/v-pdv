<template>
    <div class="discont-container ">
        <ul class="list-group">
            <li v-for="payment in payments" :key="payment.method" class="list-group-item ">
                <div class="row info-products-card p-0 m-0 d-flex align-items-center" >
                    <div class="col info-products-details">
                        <div><i :class="payment.icon" class='pe-2'></i>{{ payment.method }}</div>
                    </div>
                    <div class="col-auto info-products-price">
                        <h6>R$ {{ listPrice(payment.value) }}</h6>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import price from "../../../services/price";
import { mapState, mapActions } from 'vuex';

export default {
    name:'PaymentList',
    computed: {
        ...mapState('payments', {
            payments: state => state.payments,
        }),
    },
    data() {
        return {
        searchQuery: '',
        connection:true,
        selectedCategory: null,
        methodIlustrator: [
            {
                methodId: 1,
                icon: 'bi bi-credit-card',
                value: 0
            },
            {
                method: 2,
                icon: 'bi bi-credit-card-2-back-fill',
                value: 0
            },
            {
                method: 'dinheiro',
                icon: 'bi bi-cash',
                value: 0
            },
            {
                method: 'pix',
                icon: 'bi bi-wallet',
                value: 0
            },
        ]
        };
    },
    methods:{
        listPrice(value){
            return price.listPrice(value);
        },
        ...mapActions(
            'payments',['removePayment', 'addPayment'],
        ),
    }
}
</script>

<style scoped>

.discont-container {
  flex-grow: 1;
  max-height: 100%;
  overflow-y: auto;
  border-radius: 10px;
}

.list-group-item{
    border: none;
    border-bottom: 1px solid black;
}

</style>