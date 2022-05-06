<template> 
<div>
  <!-- cabeçalho -->
  <v-row no-gutters dense style='max-height:20%'>
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
    <v-row no-gutters dense>
      <!-- esquerda -->
      <v-col cols='7' >
        <ProdutosCard />
      </v-col>
      <!-- direita -->
      <v-col cols='5'  id="tabMenu">
        <TabCaixaCard />
        <TotalizadorCard />
        <v-row    align-content="space-around" class='pt-5 pl-4 pr-4 '>
            <v-btn  height="8vh" width="30%" bottom color='grey' dark >
              <v-icon color="white" size='15'> fa fa-list</v-icon> observação
            </v-btn>   
            <v-spacer></v-spacer>       
            <v-btn height="8vh" width="68%" bottom color='green' dark >
              <v-icon color="white" size='15'> fa fa-check</v-icon>FINALIZAR
            </v-btn>
        </v-row>
      </v-col>
    </v-row>   
</div>

</template>

<script>
import ProdutosCard from '../components/caixa/ProdutoCard.vue'
import ClienteVendedorCard from '../components/caixa/ClienteVendedorCard.vue'
import TabCaixaCard from '../components/caixa/TabCaixaCard.vue'
import TotalizadorCard from '../components/caixa/TotalizadorCard.vue'

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
      TabCaixaCard,
      TotalizadorCard
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