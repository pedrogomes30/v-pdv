<template>
<div class='basePage'> 
  <!-- header -->
  <v-row no-gutters dense>
    <v-col cols="cols-10" align-self="center" >
      <v-list-item>
        <v-list-item-avatar rouded color="var(--primary">
          <v-icon color="white"> mdi-cart-check</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <h1 class="white--text">FECHAMENTOS DE CAIXA</h1>
        </v-list-item-content>
      </v-list-item>
    </v-col>  
  </v-row>
  <!-- body -->
  <v-row>
   <v-col cols="8">
    <ClosureSlide />
   </v-col>
   <v-col cols="2" class="ml-3">
    <NewClosureCard />
   </v-col>
  </v-row>
</div>
</template>

<script>
  import ClosureSlide from '../components/fechamento/ClosureSlide.vue';
  import NewClosureCard from '../components/fechamento/NewClosure.vue';

  export default {
    name: 'ClosurePage',
    data:()=>({
        
    }),
    components: {
    NewClosureCard,
    ClosureSlide,
},
  }
</script>