<template>
  <div class="product-list w-100">
    <!-- search -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Pesquisar produtos..."
        class="form-control w-75"
      />
      <button @click="updateProducts" class="mx-1 btn btn-primary">
        <i class="bi bi-arrow-repeat px-2"></i>
      </button>
    </div>
    <!-- category -->
    <div class="category-container">
      <select v-model="selectedCategory" class="form-select w-75">
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
    <ul class="product-items">
      <li v-for="product in filteredProducts" :key="product.id" class="product-item">
        {{ product.name }}
      </li>
    </ul>
  </div>
</template>


<script>
import product from "../../services/database/products";
import {getProduct} from "../../services/api/products";
export default {
  data() {
    return {
      searchQuery: '',
      selectedCategory: null,
      products: [],
      categories: [],
    };
  },
  async created(){
    let productData = await product.get();
    if(productData.lenght <0){
      productData = await getProduct();
      product.save(productData);
    }
    console.log(productData);
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
          product.name.toLowerCase().includes(query)
        );
      }
      if (this.selectedCategory) {
        filtered = filtered.filter((product) => product.categoryId === this.selectedCategory);
      }
      return filtered;
    },
  },
  methods: {
    updateProducts() {
      // Lógica para atualizar a lista de produtos
      // Exemplo de chamada de API ou manipulação de dados
      // Aqui você pode adicionar sua própria lógica de atualização
      console.log('Produtos atualizados');
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


</style>
