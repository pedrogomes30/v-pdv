<template>
<div class='basePage'>
  <!-- cabeçalho -->
  <v-row no-gutters dense style='max-height:20%'>
    <v-col cols="auto" align-self="center" >
      <v-list-item>
        <v-list-item-avatar rouded color="var(--primary">
          <v-icon color="white"> fa fa-percent</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <h1 class="white--text">Promoções</h1>
        </v-list-item-content>
      </v-list-item>
    </v-col> 
    <v-col cols="auto" align-self="center" >
    </v-col> 
  <!--  -->
  </v-row>
  <v-row no-gutters dense>
    <ProdutoCard />
  </v-row>
</div>
</template>

<script>
  
import ProdutoCard from '../components/caixa/ProductCard.vue';
  export default {
    name: 'ProductPick',

    components: {
      ProdutoCard,
    },
    
  }
</script>