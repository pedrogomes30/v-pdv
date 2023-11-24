<template>
    <div class="discont-container ">
        <ul class="list-group">
            <li v-for="cupom in cupoms" :key="cupom.code" class="list-group-item ">
                <div class="row info-products-card d-flex align-items-center" >
                    <div class="col-auto info-products-details">
                        <i class="bi bi-box cart px-2"></i>
                    </div>
                    <div class="col info-products-details">
                        <div>{{ cupom.description }}</div>
                        <div>{{ cupom.code }}</div>
                    </div>
                    <div v-if="!cupom.percent" class="col-auto info-products-price">
                        <h6>- R$ {{ listPrice(cupom.value) }}</h6>
                    </div>
                    <div v-else class="col-auto info-products-price">
                        <h6>- {{ cupom.value }}%</h6>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import price from "../../../services/price"
import { mapState, mapActions } from 'vuex';
export default {
    name:'CartList',
    computed: {
        ...mapState('currentSale', {
            cupoms: state => state.cupoms,
        }),
        ...mapActions(
            'currentSale',['removeDiscont'],
        ),
    },
    data() {
        return {
        searchQuery: '',
        connection:true,
        selectedCategory: null,
        
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