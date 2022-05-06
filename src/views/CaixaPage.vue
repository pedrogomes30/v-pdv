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
        <v-row justify="space-around" class='pl-3 pr-3' >
          <!-- MENU DE OBSERVAÇÂO DA VENDA -->
            <v-menu
              v-model="menuObs"
              :close-on-content-click="false"
              :nudge-width="200"
              >
              <template v-slot:activator="{ on, attrs }">
                  <v-btn  
                    height="14.5vh" 
                    width="15%" 
                    color='grey' 
                    dark  
                    v-bind="attrs" 
                    v-on="on"
                    title="adicionar uma observação"
                    @click='aditObs' >
                    <v-icon color="white" size='20'> fa fa-list</v-icon>
                  </v-btn>      
              </template>
              <v-card>
                <v-list>
                <v-list-item>
                    <v-list-item-avatar rouded color="var(--primary">
                        <v-icon color="white"> fa fa-list</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title>Observação da venda</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list>
                <v-textarea
                    label="código do cupom"
                    hide-details="auto"
                    v-model="observacao"
                    class='pa-2'
                    counter="200"
                    prepend-icon='fa fa-list'>                
                </v-textarea>
                </v-list>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="menuObs = false">Cancelar</v-btn>
                <v-btn color="var(--primary)" text @click="salvarObs(observacao)">salvar</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
            <!-- fim -->
            <!-- MENU DE TROCA DE PRODUTO -->
            <v-menu
              v-model="menuTroca"
              :close-on-content-click="false"
              :nudge-width="200"
              >
              <template v-slot:activator="{ on, attrs }">
                  <v-btn  
                    height="14.5vh" 
                    width="15%" 
                    color='grey' 
                    dark  
                    v-bind="attrs" 
                    v-on="on"
                    title="troca produto"
                    @click='aditObs' >
                    <v-icon color="white" size='20'> fa fa-boxes-packing</v-icon>
                  </v-btn>   
              </template>
              <v-card>
                <v-list>
                <v-list-item>
                    <v-list-item-avatar rouded color="var(--primary">
                        <v-icon color="white"> fa fa-boxes-packing</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title>Troca de produto</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list>
                  <v-text-field
                      label="SKU do produto"
                      hide-details="auto"
                      v-model="produtoTroca.SKU"
                      hide-spin-buttons
                      class='pa-2'
                      type='number'
                      counter="13"
                      prepend-icon='fa fa-box'
                      autofocus>                
                  </v-text-field>
                  <v-text-field
                      label="Quantidade"
                      hide-details="auto"
                      type='number'
                      v-model="produtoTroca.quantidade"
                      class='pa-2'
                      prepend-icon='fa fa-boxes'>                
                  </v-text-field>
                  <v-text-field
                      label="Valor"
                      hide-details="auto"
                      type='number'
                      disabled
                      :value="produtoTroca.valor"
                      class='pa-2'
                      prepend-icon='fa fa-money-bill'>                
                  </v-text-field>
                  <v-select
                    v-model="produtoTroca.motivo"
                    :items="motivoTroca"
                    color="pink"
                    label="Motivo da troca"
                    class='pa-2'
                    required
                    prepend-icon='fa fa-question'
                  ></v-select>
                  <v-switch
                    v-model="trocaPorSku"
                    label="não sei o SKU do produto da troca"
                    color="var(--primary)"
                    class='pa-2'
                  ></v-switch>
                  </v-list>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="menuTroca = false">Cancelar</v-btn>
                <v-btn color="var(--primary)" text @click="salvarObs(observacao)">salvar</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
            <!-- fim -->
            
            <v-btn height="14.5vh" width="15%"  color='red' dark   title="cancelar a venda" @click="onCancelOrder()">
              <v-icon color="white" size='20'> fa fa-ban</v-icon>
            </v-btn>
            <v-btn height="14.5vh" width="52%"  color='green' dark :disabled="!vendaValida" >
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
    vendaValida(){
      return this.$store.state.caixa.vendaValida
    },
    obs(){
        return this.$store.state.caixa.obs
    },    
  },
  data:()=>({    
    menuObs:false,
    menuTroca:false,
    trocaPorSku:false,
    produtoTroca:{
      SKU:'',
      quantidade:1,
      valor:1.99,
      motivo:'',
    },
    motivoTroca:[
      'danificado',
      'fora da validade',
      'desistência do cliente',
    ],
    rules:{
      validCodigo:[true],
      validSKU:[true],
      animal:[val => (val || '').length > 0 || 'motivo obrigatório!'],
      value: [val => (val || '').length > 0 || 'necessário informar o produto!'],
    },
    observacao:'',
  }),
  methods:{    
    addPayment:()=>{
      
    },
    onCancelOrder(){
      this.$store.dispatch('limparVenda')
    },
    onProductChange(){
      console.log('há, vou troca produto')
    },
    salvarObs(obs){
      if(obs.length <=200){
        this.$store.dispatch('observacao',obs)
        this.menuObs = false
        this.observacao = ''
      }
    },
    aditObs(){
      this.observacao = this.obs
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