<template>
  <div>
    <!-- <div class="card " v-if="null !== customer">
      <div class="card-body row">
        <div class='col-auto d-flex align-items-center'>
            <i class="bi bi-person-circle per-icon "></i>
        </div>
        <div class='col'>
            <h5 class="card-title">
            Vendedor
            </h5>
            <p class="card-text">
            <strong>Nome do Vendedor:</strong> {{ salesman.name }}
            </p>
            <p class="card-text">
            <strong>CPF do Vendedor:</strong> {{ salesman.document }}
            </p>
        </div>
      </div>
    </div> -->

    <div class="card"  v-if="customer && !isObjectEmpty(customer)">
      <div class="card-body row">
        <div class='col-auto d-flex align-items-center'>
          <i class="bi bi-person-circle per-icon "></i>
        </div>
          <div class='col'>
            <h5 class="card-title">
              Cliente
            </h5>
            <p class="card-text">
              <strong>Nome do Cliente:</strong> {{ customer.name }}
            </p>
            <p class="card-text">
              <strong>CPF:</strong> {{ customer.document }}
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {  
  name: 'CustomerSellerList',
  computed: {
    ...mapState('currentSale', {
      customer: state => state.customer,
      // salesman: state => state.salesman,
    }),
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions('currentSale', ['removeCustomer']),
    isObjectEmpty(obj) {
      return Object.keys(obj).length === 0;
    },
  },
};
</script>

<style scoped>
.per-icon{
    font-size: 2rem;
}
</style>
