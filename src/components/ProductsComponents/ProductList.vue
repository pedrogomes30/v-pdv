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
    <div class="category-container">
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
    <div class="py-1 h-divider"></div>
    <!-- product list -->
    <div class="product-container">
      <ul class="list-group pt-1">
        <li v-for="product in filteredProducts" :key="product.id" class="list-group-item">
          {{ product.description }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import products from "../../services/database/products";
import {getProduct} from "../../services/api/products";
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
      if(productData.length == 0 || force){
        this.$global.load = true;
        this.$eventBus.emit('load', this.$global.load);
        if(force){
          await products.clear();
        }
        productData = await getProduct();
        console.log('TRY DB',productData);
        await products.save(productData);
        this.$global.load = false;
        this.$eventBus.emit('load', this.$global.load);
      }
      this.categories = productData[0].category
      this.products = productData[0].products
      console.log(productData[0]);
      },
    filterProducts(categoryId) {
      this.selectedCategory = categoryId;
    },
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
  border-radius: 4px;
  background-color: var(--bs-dark-2);
  margin-bottom: 0.5rem;
}

.category-select {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border: var(--bs-gray-900);
}

.product-container {
  flex-grow: 1;
  max-height: 100%;
  overflow-y: auto;
}

.list-group {
  margin-bottom: 0; /* Remover margem inferior para evitar espaço extra */
}

</style>
