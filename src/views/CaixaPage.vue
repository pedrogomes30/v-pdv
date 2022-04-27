<template>
    <div :style="{background: $vuetify.theme.themes.dark.background}" >
      <div id="caixaBasePage">
      <v-col cols='12' no-gutters>

      <v-row no-gutters >
        <v-col cols='6' >
          <ProdutosCard />
        </v-col>
        <!-- CLIENTE E VENDEDOR -->
        <v-col cols='6'>
          <ClienteVendedorCard />
          
        <div id='produtosSelecionados' >
          <ProdutoSelecionadoCard  />
        </div>
          <!-- Pagamentos -->
          <div id='pagamentoRealizado'>
            <v-card min-height="100">
              <v-row no-gutters justify="center" align-content="center">
                <v-card-subtitle>Pagamentos</v-card-subtitle>
                <v-spacer></v-spacer>
                <v-icon size="20" color="green" title="adicionar pagamento" class="pa-4" @click="addPayment()" >fa fa-plus</v-icon>
              </v-row>
              <v-data-table 
                :headers="headers.pagamento" 
                :items="venda.pagamentos"
                hide-default-footer
                hide-default-header
                >
                <template v-slot:item="row">
                  <tr>
                    <td>{{row.item.id}}</td>
                    <td>{{row.item.tipo}}</td>
                    <td>{{row.item.valor}}</td>
                    <td>{{row.item.icon}}</td>
                    <td>  
                      <v-icon size="10" color="red" @click="itensSelecionados(row.item)" >fa fa-xmark</v-icon>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </div>
          <!-- Totalizadores -->
          <div id='totalizador'>
            <v-card min-height="100">
                <v-card-title >Subtotal</v-card-title>
              <v-row>
                <v-card-subtitle>Total Produtos</v-card-subtitle>
                <v-spacer></v-spacer>
                <v-card-subtitle class="pa-4">R$ {{}}</v-card-subtitle>
              </v-row>
              <v-row>
                <v-card-subtitle>total de descontos</v-card-subtitle>
                <v-spacer></v-spacer>
                <v-card-subtitle class="pa-4">R$ {{}}</v-card-subtitle>
              </v-row>
              <v-row>
                <v-card-subtitle>Pagamentos</v-card-subtitle>
                <v-spacer></v-spacer>
                <v-card-subtitle class="pa-4">R$ {{}}</v-card-subtitle>
              </v-row>
            </v-card>
          </div>
      </v-col>

    </v-row>
    <v-row no no-gutters align-content="end">
      <!-- BOTOES -->
      <v-col cols="12">
        <v-card id="buttonCard">
          <v-btn>
            CUPONS
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
      </v-col>
      </div>
  </div>

</template>

<script>
// import SideMenu from '../components/caixa/ResumoVenda.vue';
import ProdutosCard from '../components/caixa/ProdutoCard.vue'
import ProdutoSelecionadoCard from '../components/caixa/ProdutoSelecionadoCard.vue'
import ClienteVendedorCard from '../components/caixa/ClienteVendedorCard.vue'
export default {
  name: 'caixaPage',
  setup(){
    
    },    
  computed:{
      
  },
  data:()=>({
    // variaveis globais do PDV
    headers: [{
      
      pagamentos:[
        {
          text: 'tipo',
          align: 'start',
          sortable: false,
          value: 'tipo',
        },
        { text: 'valor(R$)', value: 'valor' },
        { text: 'Icon', value: 'icon' },
      ]
    }],
    //variaveis da venda
    venda:{
      pagamentos:[
          {id:1,tipo:'dinheiro',valor:40.00,icon:'fa fas-card'},
          {id:2,tipo:'cartao',valor:40.00,icon:'fa fas-card'},
        ],
      
      
    },
  }),
  methods:{
    
    addPayment:()=>{
      
    },
  },
  components: {
      ProdutosCard,
      ProdutoSelecionadoCard,
      ClienteVendedorCard,
  },
}
</script>

<style>
#caixaBasePage{
  min-height:70%;
  min-width: 98%;
  margin:0.5%;
  background-color: var(--background);
}


#buttonCard{
  height:98%;
  width: 98%;
  margin-top: 1%;
  background-color: white;
}
#clienteVendedor{
  margin-left: 1%;
}

#pagamentoRealizado{
  margin-left: 1%;
  margin-top: 1%;
}
#totalizador{
  margin-left: 1%;
  margin-top: 1%;
}
#produtosSelecionados{
  margin-left: 1%;
  margin-top: 1%;
  max-height: 100%;
}
</style>