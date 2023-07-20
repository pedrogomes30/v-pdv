<template>
    <div class="product-container ">
        <ul class="list-group">
            <li v-for="product in cartItems" :key="product.id" class="list-group-item ">
            <div class="row info-products-card p-0 m-0 d-flex align-items-center" >
                <div class="col-auto info-products-icon" >
                    <i class="bi bi-box cart px-2"></i>
                </div>
                <div class="col info-products-details">
                <div>{{ product.description }}</div>
                <div>{{ product.sku }}</div>
                </div>
                <div class="col-auto disconts">
                    <div v-for="discont in product.disconts" :key="discont.code">
                        <h6>{{discont.code}}</h6>
                        <h6>{{discont.value}}</h6>
                    </div>
                </div>
                <div class="col-auto info-products-price">
                <h6>{{product.quantity}}x R$ {{ listPrice(product.price) }}</h6>
                <b><h5>R$ {{ listPrice(product.price * product.quantity) }}</h5></b>
                </div>
            </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import price from "../../services/price"

export default {
    name:'CartList',
    computed: {
        ...mapState('cart', {
            cartItems: state => state.items,
        }),
    },
    data() {
        return {
            
        };
    },
    methods:{
        listPrice(value){
            return price.listPrice(value);
        },
    }
}
</script>

<style scoped>

.product-container {
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