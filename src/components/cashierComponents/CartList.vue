<template>
    <div class="product-container ">
        <ul class="list-group ">
            <li v-for="product in products" :key="product.id" class="list-group-item ">
            <div class="row info-products-card p-0 m-0 d-flex align-items-center" >
                <div class="col-auto info-products-icon" >
                <template v-if="product.website">
                    <!-- Se houver um link no campo "product.website", exibe a imagem -->
                    <img :src="product.website" alt="Product Image" class="product-image">
                </template>
                <template v-else>
                    <!-- Se o campo "product.website" estiver vazio, exibe o ícone -->
                    <i class="bi bi-box cart px-2"></i>
                </template>
                </div>
                <div class="col info-products-details">
                <div>{{ product.description }}</div>
                <div>{{ product.sku }}</div>
                </div>
                <div class="col-auto info-products-price">
                <b><h5>R$ {{ listPrice(product.price) }}</h5></b>
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
        products: [
            {
                description: 'Produto 1',
                sku: 'SKU-001',
                price: 9.99
            },
            {
                description: 'Produto 2',
                sku: 'SKU-002',
                price: 19.99
            },
            {
                description: 'Produto 3',
                sku: 'SKU-003',
                price: 29.99
            },
            {
                description: 'Produto 4',
                sku: 'SKU-004',
                price: 39.99
            },
            {
                description: 'Produto 5',
                sku: 'SKU-005',
                price: 49.99
            },
            {
                description: 'Produto 6',
                sku: 'SKU-006',
                price: 59.99
            },
            {
                description: 'Produto 7',
                sku: 'SKU-007',
                price: 69.99
            },
            {
                description: 'Produto 8',
                sku: 'SKU-008',
                price: 79.99
            },
            {
                description: 'Produto 9',
                sku: 'SKU-009',
                price: 89.99
            },
            {
                description: 'Produto 10',
                sku: 'SKU-010',
                price: 99.99
            }
        ],
        categories: [],
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
  border: 1px solid black;
}
</style>