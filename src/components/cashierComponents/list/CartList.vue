<template>
    <div class="cart-container ">
        <ul class="list-group">
            <li v-for="product in cartItems" :key="product.id" class="list-group-item p-2 m-0 ">
            <div class="info-products-card d-flex align-items-center w-100 px-2" >
                <div class="col-2">
                    <i class="bi bi-eraser text-danger pe-2 normalize-action" @click="removeFromCart(product)"></i>
                    <i class="bi bi-box cart px-2 normalize-action"></i>
                </div>

                <div class="col-7">
                    {{ product.description }} <br>
                    {{ product.sku }}
                </div>

                <div v-if='product.disconts.length > 0 ' class="col-2 disconts">
                    <div v-for="discont in product.disconts" :key="discont.code">
                        <h6>{{discont.code}}</h6>
                        <h6>{{discont.value}}</h6>
                    </div>
                </div>

                <div class="col-2 quantity">
                    <span> R$ {{ listPrice(product.price) }} </span><br>
                    <i class="bi bi-chevron-left " @click="decrementProductCart(product)"></i>
                    {{product.quantity}} 
                    <i class="bi bi-chevron-right " @click="incrementProductCart(product)"></i>
                </div>

                <div class="col-1 info-products-price ">                
                    <b><h6>R$ {{ listPrice(product.total) }}</h6></b>
                </div>
            </div>
            </li>
        </ul>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import price from "../../../services/price"

export default {
    name:'CartList',
    computed: {
        ...mapState('currentSale', {
            cartItems: state => state.items,
        }),
    },
    methods:{
        ...mapActions(
            'currentSale',['removeFromCart', 'decrementProductCart', 'incrementProductCart'],
        ),
        listPrice(value){
            return price.listPrice(value);
        },
    }
}
</script>

<style scoped>

.cart-container {
  flex-grow: 1;
  overflow-y: auto;
  border-radius: 10px;
  font-size: 0.7rem;
  height: 100%;
}


.list-group-item{
    border: none;
    border-bottom: 1px solid black;
}

</style>