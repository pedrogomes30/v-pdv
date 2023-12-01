<template>
  <div class="total-info mt-1 px-3 pt-2">
    <div class="total-item">
      <i class="bi bi-cart-fill"></i>
      <span>Total Produtos:</span>
      <span>{{ listPrice(currentSale.products_value) }}</span>
    </div>
    <div class="total-item">
      <i class="bi bi-currency-dollar"></i>
      <span>Total Descontos:</span>
      <span>{{ listPrice(currentSale.discont_value) }}</span>
    </div>
    <div class="total-item">
      <i class="bi bi-currency-dollar"></i>
      <span>Total da Venda:</span>
      <span>{{ listPrice(currentSale.total_value) }}</span>
    </div>
    <div class="total-item">
      <i class="bi bi-currency-dollar"></i>
      <span>Total Pago:</span>
      <span>{{ listPrice( currentSale.payments_value) }}</span>
    </div>
    <div class="total-item diff">
      <i class="bi bi-exclamation-triangle-fill"></i>
      <span>Diferença:</span>
      <span :class="{ highlight: diference > 0 }" >R$ {{ listPrice( currentSale.total_value - currentSale.payments_value) }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import price from "@/services/price" 

export default {
  name: 'CashierDetailsHandler',
  computed: {
    ...mapState('currentSale', {
      currentSale: state => state
    }),
  },
  data() {
    return {
      searchQuery: '',
    };
  },
  methods:{
    listPrice(value){
      return price.listPrice(value);
    },
  }
};
</script>

<style scoped>
.total-info {
  color: var(--bs-light);
  display: flex;
  flex-direction: column;
  height: 20%;
  width: 100%;
  font-size: 0.70rem;
  border: 1px solid black;
  border-radius: 10px;
}

.total-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}

.total-item i {
  margin-right: 5px;
}

.total-item.diff {
  font-weight: bold;
}

.total-item.diff .highlight {
  color: red;
}
</style>
