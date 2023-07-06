<template>
  <div class="base-content">
    <div class="row h-100 row-wrapper">
      <div class="col-6 product-columns ">
        <ProductList />
      </div>
      <div class="col-1 v-divider product-columns"></div>
      <div class="col-5 product-columns">
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
.row-wrapper {
  width: 100%;
}

.product-columns{
  height: 100%;
}
</style>