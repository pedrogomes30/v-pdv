<template>
  <div class="base-content">
    <div class="row h-100 p-0">
      <div class="col-6 ">
        <ProductList />
      </div>
      <div class="col-6 h-100">
        <CashierDetailsHandler class='detail-card'/> 
        <SaleResume class='resume-card'/>
        <CashierActions class='actions-card'/>
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
.detail-card{
  height: 60%;
}
.resume-card{
  height: 30%;
}
.actions-card{
  height: 10%;
}
</style>