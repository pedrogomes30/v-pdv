<template>
  <div class="base-content">
    <div class="row h-100">
      <div class="col-6">
        <div class="product-list-wrapper">
          <ProductList />
        </div>
      </div>
      <div class="col-1 v-divider"></div>
      <div class="col-5">
        Conteúdo da coluna 3
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from '@/components/ProductsComponents/ProductList.vue'

export default {
  name: 'CashierView',
  components: {
    ProductList
  }
}
</script>

<style scoped>
.product-list-wrapper {
  overflow-y: auto;
}

</style>