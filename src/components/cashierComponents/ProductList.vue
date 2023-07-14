<template>
  <div class="product-list p-0">
    <!-- search -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Pesquisar produtos..."
        class="form-control "
      />
      <button @click="updateProducts" class="mx-1 btn btn-primary">
        <i class="bi bi-arrow-repeat px-2"></i>
      </button>
    </div>
    <!-- category -->
    <div class="category-container p-0">
      <select v-model="selectedCategory" class="form-select ">
        <option value="">Todas as categorias</option>
        <option v-for="category in categories" :value="category.id" :key="category.id">
          <span>
             <i class="bi bi-arrow-repeat px-2"></i>
            {{ category.name }}
          </span>
        </option>
      </select>
    </div>
    <!-- product list -->
    <div class="product-container my-3">
      <ul class="list-group ">
        <li v-for="product in filteredProducts" :key="product.id" class="list-group-item ">
          <div class="row info-products-card p-0 m-0 d-flex align-items-center" @click="sendToCart(product)">
            <div class="col-auto info-products-icon" >
              <template v-if="product.website">
                <!-- Se houver um link no campo "product.website", exibe a imagem -->
                <img :src="product.website" alt="Product Image" class="product-image">
              </template>
              <template v-else>
                <!-- Se o campo "product.website" estiver vazio, exibe o ícone -->
                <i class="bi bi-box info-icon px-2"></i>
              </template>
            </div>
            <div class="col info-products-details">
              <div>{{ product.description }}</div>
              <div>{{ product.sku }} - {{product.provider}} </div>
            </div>
            <div class="col-auto info-products-price">
              <b><h5>R$ {{ listPrice(product.price) }}</h5></b>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- pagination -->
    <nav aria-label="Page navigation  p-0">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" aria-label="Previous" @click="prevPage">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="pageNumber in totalPages" :key="pageNumber" class="page-item" :class="{ active: pageNumber === currentPage }">
          <a class="page-link" href="#" @click="goToPage(pageNumber)">{{ pageNumber }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" aria-label="Next" @click="nextPage">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script>
import products from "../../services/database/products";
import {getProduct} from "../../services/api/products";
import price from "../../services/price"

export default {
  data() {
    return {
      searchQuery: '',
      connection:true,
      selectedCategory: null,
      products: [],
      categories: [],
    };
  },
  async created(){
    await this.updateProducts();
  },
  computed: {
    filteredProducts() {
      const query = this.searchQuery.toLowerCase();
      if (!query && !this.selectedCategory) {
        return this.products;
      }
      let filtered = this.products;
      if (query) {
        filtered = filtered.filter((product) =>
          product.description.toLowerCase().includes(query)
        );
      }
      if (this.selectedCategory) {
        filtered = filtered.filter((product) => product.category === this.selectedCategory);
      }
      return filtered;
    },
  },
  methods: {
    async updateProducts(force = false) {
      let productData = await products.get();
      if (productData.length === 0 || force) {
        this.$global.load = true;
        this.$eventBus.emit('load', this.$global.load);
        if (force) {
          await products.clear();
        }
        productData = await getProduct();
        console.log('TRY DB', productData);
        await products.save(productData);
        this.$global.load = false;
        this.$eventBus.emit('load', this.$global.load);
      }

      if (Array.isArray(productData)) {
        this.categories = productData[0].category;
        this.products = [];//productData[0].products;
      } else if (typeof productData === 'object') {
        this.categories = productData.category;
        this.products = [];//productData.products;
      }
    },
    listPrice(value){
      return price.listPrice(value);
    },
    filterProducts(categoryId) {
      this.selectedCategory = categoryId;
    },
    sendToCart(product){
      console.log('CLICK ON', product);
    }
  },
  components: {
  },
  
};
</script>

<style scoped>
.product-list {
  background-color: var(--bs-dark);
  color: var(--bs-light);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 0.70rem;
}

.info-icon {
  font-size: 1.20rem; 
  color: var(--bs-primary);
}

.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.search-input {
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  margin-right: 1rem;
}

.update-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: var(--bs-primary);
  color: var(--bs-light);
  cursor: pointer;
}

.product-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-item {
  padding: 0.5rem;
  border: none;
  background-color: var(--bs-dark-2);
  margin-bottom: 0.5rem;
}

.category-select {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border: var(--bs-gray-900);
}

.list-group{
  border:none;
}

.product-container {
  flex-grow: 1;
  max-height: 100%;
  overflow-y: auto;
  border-radius: 10px;
  border: 1px solid black;
}


</style>
