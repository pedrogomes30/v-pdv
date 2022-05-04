<template> 
<v-container fluid >
  <v-row no-gutters dense >
    <!-- cabeçalho -->
    <v-col cols="auto" align-self="center" >
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
    <v-col cols="auto" align-self="end">
      <v-container id='clienteVendedor'>  
        <ClienteVendedorCard />
      </v-container>
    </v-col>
    <!--  -->
  </v-row>
    <!-- PAINEL PRINCIPAL -->
    <v-row no-gutters dense justify="start">
      <!-- esquerda -->
      <v-col cols='7' >
        <ProdutosCard />
      </v-col>
      <!-- direita -->
      <v-col cols='5'  id="tabMenu">
        <TabCaixaCard />
      </v-col>
    </v-row>   
    
</v-container>

</template>

<script>
import ProdutosCard from '../components/caixa/ProdutoCard.vue'
import ClienteVendedorCard from '../components/caixa/ClienteVendedorCard.vue'
import TabCaixaCard from '../components/caixa/TabCaixaCard.vue'

export default {
  name: 'caixaPage',
  setup(){
      
    },    
  computed:{
      
  },
  data:()=>({    
    venda:{
      pagamentos:[
          
        ],
    },
  }),
  methods:{    
    addPayment:()=>{
      
    },
  },
  components: {
      ProdutosCard,
      ClienteVendedorCard,
      TabCaixaCard
  },
}
</script>

<style>

#headerPage{
  padding:0.5%;
}
#tabMenu{
    padding-left: 0.5%;
}



</style>