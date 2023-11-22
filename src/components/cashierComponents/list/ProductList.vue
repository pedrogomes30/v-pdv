<template>
  <div class="product-list p-0">
    <!-- search -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Pesquisar produtos..."
        class="form-control "
        @keypress.enter="hotAddProduct()"
        autofocus
      />
      <button @click="updateProducts" class="mx-1 btn btn-primary">
        <i class="bi bi-arrow-repeat px-2"></i>
      </button>
    </div>
    <!-- category -->
    <div class="category-container p-0">
      <select v-model="selectedCategory" class="form-select">
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
          <div class="row info-products-card d-flex align-items-center" @click="addToCart(product)">
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
    <div class="d-flex justify-content-center align-items-center pagination-items p-0 m-0 ">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-primary btn-sm">
        <i class="bi bi-chevron-left px-2"></i>
      </button>
      <span v-for="page in getDisplayedPages()"
        :key="page" 
        class='px-1'
        @click="goToPage(page)" 
        :class="{ 'btn btn-primary rounded': page === currentPage, ' btn-sm': page !== currentPage }">
        {{ page }}
      </span>
      <button @click="nextPage" :disabled="currentPage * productsPerPage >= products.length" class="btn btn-primary btn-sm ">
        <i class="bi bi-chevron-right px-2"></i>
      </button>
    </div>
  </div>
</template>


<script>
import products from "../../../services/database/products";
import {getProduct} from "../../../services/api/products";
import price from "../../../services/price"
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      searchQuery: '',
      connection:true,
      selectedCategory: null,
      products: [],
      categories: [],
      currentPage: 1,
      productsPerPage: 100,
    };
  },
  async created(){
    await this.updateProducts();
  },
  computed: {
    filteredProducts() {
      const query = this.searchQuery.toLowerCase();
      let filtered = this.products;
      if (!isNaN(this.searchQuery) && this.searchQuery.length === 13) {
        return filtered.filter((product) => product.sku === this.searchQuery);
      }

      //search by description
      if (query) {
        filtered = filtered.filter(
          (product) =>{
            if(null !== product.description){
              return product.description.toLowerCase().includes(query)
            }
          }
        );
      }
      //filter by category
      if (this.selectedCategory) {
        filtered = filtered.filter(
          (product) => product.categoria_id === this.selectedCategory
        );
      }

      const startIndex = (this.currentPage - 1) * this.productsPerPage;
      const endIndex = startIndex + this.productsPerPage;

      return filtered.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.products.length / this.productsPerPage);
    },
  },
  methods: {
    ...mapActions('currentSale', ['addToCart']),
    async updateProducts(force = false) {
      let productData = await products.get();
      if (productData.length === 0 || force) {
        this.$global.load = true;
        this.$eventBus.emit('load', this.$global.load);
        if (force) {
          await products.clear();
        }
        productData = await getProduct();
        await products.save(productData);
        this.$global.load = false;
        this.$eventBus.emit('load', this.$global.load);
      }

      if (Array.isArray(productData)) {
        this.categories = productData[0].category;
        this.products = productData[0].products;
      } else if (typeof productData === 'object') {
        this.categories = productData.category;
        this.products = productData.products;
      }
    },
    hotAddProduct(){
      let filtered = this.products;
      if (!isNaN(this.searchQuery) && this.searchQuery.length === 13) {
        let product =  filtered.filter((product) => product.sku === this.searchQuery);
        this.addToCart(product[0]);
        this.searchQuery = '';
        return false;
      }
    },
    getDisplayedPages() {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const displayCount = 10; // Número de páginas para exibir no intervalo
    const half = Math.floor(displayCount / 2);

    if (totalPages <= displayCount) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage <= half) {
      return Array.from({ length: displayCount }, (_, i) => i + 1);
    } else if (currentPage >= totalPages - half) {
      return Array.from({ length: displayCount }, (_, i) => totalPages - displayCount + i + 1);
    } else {
      const startPage = currentPage - half;
      return Array.from({ length: displayCount }, (_, i) => startPage + i);
    }
  },
    listPrice(value){
      return price.listPrice(value);
    },
    filterProducts(categoryId) {
      this.selectedCategory = categoryId;
      this.filteredProducts();
    },
    sendToCart(product){
      console.log('CLICK ON', product);
    },
    nextPage() {
      this.currentPage++;
    },
    goToPage(page) {
      this.currentPage = page;
    },
    prevPage() {
      this.currentPage--;
    },

  },
  components: {
  },
  
};
</script>

<style scoped>
.product-list {
  color: var(--bs-light);
  padding: 1rem;
  display: flex;
  height: 94vh;
  flex-direction: column;
  font-size: 0.70rem;
  border:none;
}
.list-group-item{
  border:none;
  border-bottom: 1px solid black;
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

.pagination-items{
  background-color: transparent;
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

.rounded{
  border-radius: 100%;
}
.product-container {
  background: none;
  flex-grow: 1;
  max-height: 75%;
  overflow-y: auto;
  border-radius: 10px;
  border: 1px solid black;
}


</style>
