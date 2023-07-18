<template>
<div class='basePage'>
  <!-- cabeçalho -->
  <v-row no-gutters dense style='max-height:20%'>
    <v-col cols="auto" align-self="center" >
      <v-list-item>
        <v-list-item-avatar rouded color="var(--primary">
          <v-icon color="white"> fa fa-cart-arrow-down</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <h1 class="white--text">Vendas</h1>
        </v-list-item-content>
      </v-list-item>
    </v-col>
  </v-row>
  <SalesCard />
</div>
</template>

<script>
  
import SalesCard from '../components/historicoVendas/SalesCard.vue'
  export default {
    name: 'HistorySalePage',

    components: {
      SalesCard,
    },
  }
</script>