<template>
  <div class="base-content">
    <div class="row  p-0">
      <div class="col-6">
        <ProductList />
      </div>
      <div class="col-6 ">
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

.detail-card{
  height: 50vh;
}
.resume-card{
  height: 19vh;
}
.actions-card{
  height: 10vh;
}
</style>