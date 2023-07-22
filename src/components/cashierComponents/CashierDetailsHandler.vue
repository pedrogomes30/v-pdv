<template>
  <div class="cashier-info p-1">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark info-menu p-0 m-0 ">
      <div class="col-9 container-fluid d-flex justify-content-center  info-handler py-1">
        <ul class="navbar-nav">

          <li class="nav-item px-2">
            <a class="nav-link" :class="{ 'selected': activeComponent === 'carrinho' }" title='Carrinho' @click="showComponent('carrinho')">
              <i class="bi bi-cart-fill"></i> 
            </a>
          </li>

          <li class="nav-item px-2">
            <a class="nav-link" :class="{ 'selected': activeComponent === 'cupom' }" title='Cupom' @click="showComponent('cupom')">
              <i class="bi bi-ticket-fill" ></i> 
            </a>
          </li>

          <li class="nav-item px-2">
            <a class="nav-link" :class="{ 'selected': activeComponent === 'pagamento' }" title='Pagamento' @click="showComponent('pagamento')">
              <i class="bi bi-cash"></i> 
            </a>
          </li>

          <li class="nav-item px-2">
            <a class="nav-link " :class="{ 'selected': activeComponent === 'clienteVendedor' }" title='Cliente/Vendedor' @click="showComponent('clienteVendedor')">
              <i class="bi bi-people-fill"></i> 
            </a>
          </li>

        </ul>
      </div>

      <div class='v-divider'></div>

      <div class='col-3 d-flex justify-content-center align-items-center '>
        <i 
          v-for="action in activeAction" 
          :key="action.label" 
          :class="action.icon + ' ' +  action.iconColor" 
          class='px-2'
          @click="action.action"
          :title="action.label"
        />
      </div>
    </nav>

    <div class="component-container mb-2 ">
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
import {  mapActions } from 'vuex';

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
      activeComponent: 'carrinho',
      activeAction: [
          {
            icon: 'bi bi-cart-x ',
            action: 'clearCart',
            iconColor: 'text-danger',
            label: 'Limpar Carrinho'
          },
        ],
      actions: {
        carrinho: [
          {
            icon: 'bi bi-cart-x ',
            action: 'clearCart',
            iconColor: 'text-danger',
            label: 'Limpar Carrinho'
          },
        ],
        cupom: [
          {
            icon: 'bi bi-ticket ',
            action: 'addCupon',
            iconColor: 'text-success',
            label: 'Adicionar Cupom'
          },
          {
            icon: 'bi bi-x-lg ',
            action: 'clearCupons',
            iconColor: 'text-danger',
            label: 'Limpar Cupons'
          },
        ],
        pagamento: [
          {
            icon: 'bi bi-cash ',
            action: 'addPayment',
            iconColor: 'text-success',
            label: 'Adicionar Cupom'
          },
          {
            icon: 'bi bi-x-lg  ',
            action: 'clearPayments',
            iconColor: 'text-danger',
            label: 'Limpar Pagamentos'
          },
        ],
        clienteVendedor: [
          {
            icon: 'bi bi-person  ',
            action: 'clearCustomerSeller',
            iconColor: 'text-success',
            label: 'Incluir Cliente'
          },
          {
            icon: 'bi bi-person-fill  ',
            action: 'clearCustomerSeller',
            iconColor: 'text-success',
            label: 'Incluir Vendedor'
          },
          {
            icon: 'bi bi-x-lg  ',
            action: 'clearCustomerSeller',
            iconColor: 'text-danger',
            label: 'Limpar Cliente/Vendedor'
          },
        ],
      }
    };
  },

  methods: {
    showComponent(componentName) {
      this.activeComponent = componentName;
      this.activeAction = this.actions[this.activeComponent]
    },
    ...mapActions(
      'cart',['clearCart'],
    ),
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

.info-handler i{
  font-size: 1.2rem;
}
.component-container {
  height: 85%;
  border-radius: 10px;
  border: 1px solid black;
  color:var(--bs-gray-200);
}

.selected:not([href="/"]) {
  background: var(--bs-primary);
  border-radius: 10px;
  color: var(--bs-gray-200); 
  transition: background-color 0.3s, font-size 0.3s;
  border: 1px solid black;
}


.selected a {
  color: var(--bs-gray-200);
  font-size: 1.1rem; 
  padding-right:0.40rem;
}
</style>
