<template>
    <div class="product-container ">
        <ul class="list-group">
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
            price: 9.99,
            quantity: 1,
            discounts: [
                {
                    code: 'DESC10',
                    value: 1.00,
                    description: 'Desconto de 10%'
                },
                {
                    code: 'DESC20',
                    value: 2.00,
                    description: 'Desconto de 20%'
                }
            ]
        },
        {
            description: 'Produto 2',
            sku: 'SKU-002',
            price: 19.99,
            quantity: 1,
            discount: []
        },
        {
            description: 'Produto 3',
            sku: 'SKU-003',
            price: 29.99,
            quantity: 1,
            discount: []
        },
        {
            description: 'Produto 4',
            sku: 'SKU-004',
            price: 39.99,
            quantity: 1,
            discount: []
        },
        {
            description: 'Produto 5',
            sku: 'SKU-005',
            price: 49.99,
            quantity: 1,
            discount: []
        },
        {
            description: 'Produto 6',
            sku: 'SKU-006',
            price: 59.99,
            quantity: 1,
            discount: []
        },
        {
            description: 'Produto 7',
            sku: 'SKU-007',
            price: 69.99,
            quantity: 1,
            discount: []
        },
        {
            description: 'Produto 8',
            sku: 'SKU-008',
            price: 79.99,
            quantity: 1,
            discount: []
        },
        {
            description: 'Produto 9',
            sku: 'SKU-009',
            price: 89.99,
            quantity: 1,
            discounts: [
                {
                    code: 'DESC15',
                    value: 3.00,
                    description: 'Desconto de 15%'
                },
                {
                    code: 'DESC25',
                    value: 4.00,
                    description: 'Desconto de 25%'
                }
            ]
        },
        {
            description: 'Produto 10',
            sku: 'SKU-010',
            price: 99.99,
            quantity: 1,
            discount: []
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
}

.list-group-item{
    border: none;
    border-bottom: 1px solid black;
}
</style>