<template> 
<div class='basePage'> 
  <!-- header -->
  <v-row no-gutters dense>
    <v-col cols="cols-10" align-self="center" >
      <v-list-item>
        <v-list-item-avatar rouded color="var(--primary">
          <v-icon color="white"> fa fa-cart-plus</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <h1 class="white--text">CAIXA</h1>
        </v-list-item-content>
      </v-list-item>
    </v-col>  
    <v-spacer></v-spacer>
    <v-col cols="cols-1" align-self="center">
        <CustomerCard />
    </v-col>
    <v-col cols="cols-1" align-self="center">
        <SalesmanCard />
    </v-col>
  <!--  -->
  </v-row>
    <!-- main card -->
    <v-row no-gutters dense>
      <!-- left -->
      <v-col cols='7' >
        <ProductCard />
      </v-col>
      <!-- right -->
      <v-col cols='5'  id="tabMenu">
        <TabCashierSubmenu />
        <TotalCard />
        <v-row dense no-gutters class='pt-0' justify="center" v-if="sale.status !== 'Finalizada'">
          <v-spacer></v-spacer>
          <h5  class="white--text ml-3 mr-3 "> {{sale.status}}</h5>
        </v-row>
        <v-row justify="space-around" class='pl-3 pr-3' >
          <ObsCard />
          <ChangeCard />            
          <v-btn height="14.5vh" width="15%"  color='red' dark   title="cancelar a venda" @click="onCancelOrder()">
            <v-icon color="white" size='35'> fa fa-ban</v-icon>
          </v-btn>
          <DetailSaleCard />
        </v-row>
      </v-col>
    </v-row>   
</div>
</template>
<script>
import ProductCard from '../components/caixa/ProductCard.vue'
import CustomerCard from '../components/caixa/CustomerCard.vue'
import SalesmanCard from '../components/caixa/SalesmanCard.vue'
import TabCashierSubmenu from '../components/caixa/TabCashierSubmenu.vue'
import DetailSaleCard from '../components/caixa/DetailSaleCard.vue'
import TotalCard from '../components/caixa/TotalCard.vue'
import ObsCard from '../components/caixa/ObsCard.vue'
import ChangeCard from '../components/caixa/ChangeCard.vue'

export default {
  name: 'caixaPage',   
  computed:{
    sale(){
      return this.$store.state.cashierStore
    },
  },
  methods:{    
    onCancelOrder(){
      this.$store.dispatch('cleanSale')
    },
  },
  components: {
      ProductCard,
      CustomerCard,
      SalesmanCard,
      TabCashierSubmenu,
      TotalCard,
      DetailSaleCard,
      ObsCard,
      ChangeCard
  },
}
</script>
<style>
#headerPage{
  padding:0.5%;
}
#tabMenu{
    padding-left: 0.5%;
    margin-bottom: 1%;
}
</style>