<template>
  <v-card >
      <v-tabs
        v-model="tabs"
        centered
        class="d-flex justify-center align-center"
      >
        <v-tab color="var(--primary)" @keyup="tabs=tabs">          
            <v-icon color="var(--primary)"> fa fa-cart-shopping</v-icon>
            <v-spacer></v-spacer>
            Carrinho
        </v-tab>
        <v-tab>
            <v-icon color="var(--primary)"> fa fa-tags</v-icon>            
            <v-spacer></v-spacer>
            Descontos
        </v-tab>
        <v-tab>
            <v-icon color="var(--primary)"> fa fa-sack-dollar</v-icon>
            <v-spacer></v-spacer>
            Pagamentos
        </v-tab>
        <v-tab>
            <v-icon color="var(--primary)"> fa-solid fa-user-group</v-icon>
            <v-spacer></v-spacer>
            Cliente / Vendedor
        </v-tab>
      </v-tabs >
        <v-divider></v-divider>
      <v-tabs-items v-model="tabs" style='min-height: 36vh; max-height:36vh'>
      <v-tab-item>
        <ItemCard />
      </v-tab-item>
      <v-tab-item>
        <DiscontCard />
      </v-tab-item>
      <v-tab-item>
        <PaymentCard />
      </v-tab-item>
      <v-tab-item >
        <CustomerCard />
        <v-spacer></v-spacer>
        <SalesmanCard />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import ItemCard from './ItemsCard.vue'
  import DiscontCard from './DiscontCard.vue'
  import PaymentCard from './PaymentCard.vue'
import CustomerCard from './CustomerCard.vue'
import SalesmanCard from './SalesmanCard.vue'
  export default {
    name:'TabCaixaCard',
    computed:{
        qtdItens(){
        return this.$store.state.caixa.qtdItens
      },
    },
    data () {
      return {
        tabs: null,       
      }
    },
    mounted() {
        this._keyListener = function(e) {
            if (e.key === "c" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault(); 
                this.tabs = 0
            }
            if (e.key === "d" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault(); 
                this.tabs = 1
            }
            if (e.key === "p" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault(); 
                this.tabs = 2
            }
            if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault(); 
                this.tabs = 3
            }
        };
        document.addEventListener('keydown', this._keyListener.bind(this));
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this._keyListener);
    },
    components:{
    ItemCard,
    DiscontCard,
    PaymentCard,
    CustomerCard,
    SalesmanCard
}
  }
</script>
<style>
</style>