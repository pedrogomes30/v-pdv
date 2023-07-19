<template>
    <div class="discont-container ">
        <ul class="list-group">
            <li v-for="discont in disconts" :key="discont.code" class="list-group-item ">
                <div class="row info-products-card p-0 m-0 d-flex align-items-center" >
                    <div class="col-auto info-products-details">
                        <i class="bi bi-box cart px-2"></i>
                    </div>
                    <div class="col info-products-details">
                        <div>{{ discont.description }}</div>
                        <div>{{ discont.code }}</div>
                    </div>
                    <div class="col-auto info-products-price">
                        <h6>- R$ {{ listPrice(discont.value) }}</h6>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import price from "../../services/price"

export default {
    name:'CartList',
    data() {
        return {
        searchQuery: '',
        connection:true,
        selectedCategory: null,
        disconts: [
            {
                code: 'EXEM-2',
                value: '3.00',
                description: 'use for test discont system',
                allProducts: false
            },
        ]
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