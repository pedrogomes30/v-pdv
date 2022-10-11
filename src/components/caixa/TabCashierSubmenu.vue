<template>
  <v-card >
    <v-slide-x-transition>
    <v-tabs
        v-model="tabs"
        centered
        class="d-flex justify-center align-center"
      >
      <v-hover v-model="menuHover['carrinho']" >
        <v-tab color="var(--primary)" @keyup="tabs=tabs">   
          <v-icon color="var(--primary)" size='30' class="pr-3"  > fa fa-cart-shopping</v-icon>
          <v-slide-x-transition>
            <span   v-show="menuHover['carrinho']" >Carrinho</span>    
          </v-slide-x-transition>      
        </v-tab>
      </v-hover> 
      
      <v-hover v-model="menuHover['descontos']" >
        <v-tab>
          <v-icon color="var(--primary)" size='30' class="pr-3" > fa fa-tags</v-icon>    
          <v-slide-x-transition>
            <span   v-show="menuHover['descontos']" >Descontos</span>    
          </v-slide-x-transition> 
        </v-tab>
      </v-hover>
      <v-hover v-model="menuHover['pagamentos']" >
        <v-tab>
          <v-icon color="var(--primary)" size='30' class="pr-3" > fa fa-sack-dollar</v-icon>
          <v-slide-x-transition>
              <span   v-show="menuHover['pagamentos']" >Pagamentos</span>    
            </v-slide-x-transition> 
          </v-tab>
        </v-hover>
        
        <v-hover v-model="menuHover['cliente']" >
          <v-tab>
            <v-icon color="var(--primary)" size='30' class="pr-3" > fa-solid fa-user-group</v-icon>
            <v-slide-x-transition>
              <span   v-show="menuHover['cliente']" >Cliente / Vendedor</span>    
            </v-slide-x-transition> 
          </v-tab>
        </v-hover>
      </v-tabs >
    </v-slide-x-transition>
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
        <h3 class='pl-6'>Vendedor está temporariamente indisponível</h3>
        <!-- <SalesmanCard /> -->
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import ItemCard from './ItemsCard.vue'
  import DiscontCard from './DiscontCard.vue'
  import PaymentCard from './PaymentCard.vue'
import CustomerCard from './CustomerCard.vue'
// import SalesmanCard from './SalesmanCard.vue'
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
        menuHover:[],     
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
    // SalesmanCard
}
  }
</script>
<style>
</style>