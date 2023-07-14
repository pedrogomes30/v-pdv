<template>
  <div class="base-content">
    <div class="row h-100 p-0">
      <div class="col-6 product-columns ">
        <ProductList />
      </div>
      <div class="col-6">
        <CashierDetailsHandler /> 
        <SaleResume />
        <CashierActions />
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from '@/components/cashierComponents/ProductList.vue'
import CashierDetailsHandler from '../components/cashierComponents/CashierDetailsHandler.vue'
import SaleResume from '../components/cashierComponents/SaleResume.vue'
import CashierActions from '../components/cashierComponents/CashierActions.vue'

export default {
  name: 'CashierView',
  components: {
    ProductList,
    CashierDetailsHandler,
    SaleResume,
    CashierActions
  }
}
</script>

<style scoped>

.product-columns{
  height: 100%;
}
</style>