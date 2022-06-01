<template> 
<div class='basePage'> 
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
                    label="Observação"
                    hide-details="auto"
                    v-model="observacao"
                    color="var(--primary)"
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
                  <v-switch
                    v-model="trocaPorSku"
                    label="troca SEM sku do produto"
                    color="var(--primary)"
                    class='pa-2'
                  ></v-switch>
                  <v-text-field
                      label="SKU do produto"
                      hide-details="auto"
                      color="var(--primary)"
                      v-model="produtoTroca.SKU"
                      hide-spin-buttons
                      class='pa-2'
                      type='number'
                      counter="13"
                      :disabled="trocaPorSku === true"
                      :rules="trocaPorSku !== true ? rules.SKU : [true]"
                      @change="procurarSkuTroca()"
                      prepend-icon='fa fa-box'
                      autofocus>                
                  </v-text-field>
                  <v-text-field
                      label="Quantidade"
                      hide-details="auto"
                      type='number'
                      color="var(--primary)"
                      v-model="produtoTroca.quantidade"
                      class='pa-2'
                      prepend-icon='fa fa-boxes'>                
                  </v-text-field>
                  <h5 class='pl-3'>
                  <v-icon  size='20'> fa fa-dollar-sign</v-icon> 
                  Valor: 
                  <Money
                      v-bind="money"
                      :disabled="trocaPorSku === false"
                      v-model="produtoTroca.valor"
                      class='pa-2'
                      prepend-icon='fa fa-money-bill'>                
                  </Money>
                  </h5>
                  <v-select
                    v-model="produtoTroca.motivo"
                    :items="motivoTroca"
                    :rules="rules.motivo"
                    color="var(--primary)"
                    label="Motivo da troca"
                    class='pa-2'
                    required
                    prepend-icon='fa fa-question'
                  ></v-select>
                  </v-list>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="menuTroca = false">Cancelar</v-btn>
                <v-btn color="var(--primary)" text @click="novaTroca()">salvar</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
            <!-- fim -->
            
            <v-btn height="14.5vh" width="15%"  color='red' dark   title="cancelar a venda" @click="onCancelOrder()">
              <v-icon color="white" size='20'> fa fa-ban</v-icon>
            </v-btn>
            <v-btn height="14.5vh" width="52%"  color='green' dark :disabled="!venda.vendaValida" @click='finalizarVenda()'>
              FINALIZADO
            </v-btn>
        </v-row>
        <v-row dense no-gutters class='pt-6' justify="center" v-if="venda.status !== 'Finalizada'">
          <v-spacer></v-spacer>
          <h5  class="white--text ml-3 mr-3 "> {{venda.status}}</h5>
          <v-icon color='white'>fa fa-exclamation</v-icon>
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
import {Money} from 'v-money'
import { format } from 'date-fns'

export default {
  name: 'caixaPage',
  setup(){
      
    },    
  computed:{
    venda(){
      return this.$store.state.caixa
    },   
    produtos(){
        return this.$store.state.produto.produtos
    },  
    usuario(){
        return this.$store.state.auth
    },  
  },
  data:()=>({    
    menuObs:false,
    menuTroca:false,
    trocaPorSku:false,
    produtoTroca:{
      SKU: '', 
      codigo: '#TROCA',
      descricao:'',
      todosProdutos:true,
      comCliente :false,
      porcentagem:false,
      acumulativo:true,
      valor:0,
      quantidade:1,
    },
    motivoTroca:[
      'danificado',
      'fora da validade',
      'desistência do cliente',
    ],
    money: {
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
      precision: 2,
      masked: false
    },
    rules:{
      validCodigo:[true],
      validSKU:[true],
      motivo:[val => (val || '').length > 0 || 'motivo obrigatório!'],
      value: [val => (val || '' || 0).length > 0 || 'necessário informar o valor do produto!'],
      quantidade: [val => (val || '' || 0).length > 0 || 'quantidade obrigatoria!'],
      SKU: [val => (val || '').length > 0 || 'necessário informar sku do produto!'],
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
      this.observacao = this.venda.obs
    },
    procurarSkuTroca(){
      let indice = this.produtos.findIndex(x => x.SKU === this.produtoTroca.SKU);
      var produto = this.produtos[indice]
      this.produtoTroca.valor = produto.valor
      this.produtoTroca.descricao = 'troca referente ao SKU: '+produto.SKU
    },
    novaTroca(){
      if(this.produtoTroca.valor>0 && this.produtoTroca.valor<=10000){this.produtoTroca.valor = this.produtoTroca.quantidade * this.produtoTroca.valor
        console.log(this.produtoTroca.valor)
        this.produtoTroca.descricao = this.produtoTroca.SKU ==='' ? 'referente ao produto não identificado' : 'referente ao produto '+this.produtoTroca.SKU
        this.$store.dispatch('addDescontos',this.produtoTroca)
        this.produtoTroca = 
        {
          SKU: '', 
          codigo: '#TROCA',
          descricao:'',
          todosProdutos:true,
          comCliente :false,
          porcentagem:false,
          acumulativo:true,
          valor:0,
          quantidade:1,
        }
        this.menuTroca = false
        this.trocaPorSku=false
      }else{
        alert('valor de troca inválida')
      }
    },
    async finalizarVenda(){
      try{
        this.venda.status     = "processando...";
        var newVenda          = Object.assign({}, this.venda) //create a obj clone, not reference
        newVenda.dtVenda      = format(new Date(), "yyyy-MM-dd kk:mm")
        newVenda.status       = "Finalizada";
        newVenda.caixa        = this.usuario.caixaNome;
        newVenda.loja         = this.usuario.loja;
        newVenda.lojaAbr      = this.usuario.abreviacao;
        newVenda.funcCaixa    = this.usuario.nomeUsuario;

        this.$store.dispatch('newVenda',newVenda)
        await setTimeout(() => {
          this.$store.dispatch('limparVenda')
          }, 500);
          
      }catch(e){
        console.log('console.finalizando venda',e)
      }
    }
  },
  components: {
      ProdutosCard,
      ClienteVendedorCard,
      TabCaixaCard,
      TotalizadorCard,
      Money
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