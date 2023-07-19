<template>
  <div class="cashier-info p-1">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark info-menu">
      <div class="container-fluid d-flex justify-content-around">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" @click="showComponent('carrinho')">
              <i class="bi bi-cart-fill"></i> Carrinho
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="showComponent('cupom')">
              <i class="bi bi-badge-ad-fill"></i> Cupom
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="showComponent('pagamento')">
              <i class="bi bi-credit-card-2-front-fill"></i> Pagamento
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="showComponent('clienteVendedor')">
              <i class="bi bi-people-fill"></i> Cliente/Vendedor
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="component-container mb-2">
      <CartList v-if="activeComponent === 'carrinho'" />
      <CupomList v-if="activeComponent === 'cupom'" />
      <PaymentsList v-if="activeComponent === 'pagamento'" />
      <CustomerSelerList v-if="activeComponent === 'clienteVendedor'" />
    </div>
  </div>
</template>

<script>
import CartList from './CartList.vue';
import CupomList from './CupomList.vue';
import PaymentsList from './PaymentsList.vue';
import CustomerSelerList from './CustomerSelerList.vue';

export default {
  name: 'CashierDetailsHandler',
  components: {
    CartList,
    CupomList,
    PaymentsList,
    CustomerSelerList
  },
  data() {
    return {
      activeComponent: 'carrinho'
    };
  },
  methods: {
    showComponent(componentName) {
      this.activeComponent = componentName;
    }
  }
};
</script>

<style scoped>
.cashier-info {
  color: var(--bs-light);
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid black;
  border-radius: 10px;
}


.component-container {
  height: 85%;
  border-radius: 10px;
  border: 1px solid black;
  color:var(--bs-gray-200);
}
</style>
