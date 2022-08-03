<template> 
<div class='basePage'> 
  <!-- header -->
  <v-row no-gutters dense style='max-height:20%'>
    <v-col cols="cols-8" align-self="center" >
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
    <v-col cols="cols-2" align-self="center">
        <CustomerCard />
    </v-col>
    <v-col cols="cols-2" align-self="center">
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
        <v-row justify="space-around" class='pl-3 pr-3' >
          <!-- menu -->
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
                    <v-icon color="white" size='35'> fa fa-list</v-icon>
                  </v-btn>      
              </template>
              <v-card>
                <v-list>
                <v-list-item>
                    <v-list-item-avatar rouded color="var(--primary">
                        <v-icon color="white"> fa fa-list</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title>Observação da sale</v-list-item-title>
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
                <v-btn color="var(--primary)" text @click="saveObs(observacao)">salvar</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
            <!-- fim -->
            <!-- MENU DE TROCA DE PRODUTO -->
            <v-menu
              v-model="changeMenu"
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
                    <v-icon color="white" size='35'> fa fa-boxes-packing</v-icon>
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
                    v-model="changeBySku"
                    label="troca SEM sku do produto"
                    color="var(--primary)"
                    class='pa-2'
                  ></v-switch>
                  <v-text-field
                      label="SKU do produto"
                      hide-details="auto"
                      color="var(--primary)"
                      v-model="productChange.sku"
                      hide-spin-buttons
                      class='pa-2'
                      type='number'
                      counter="13"
                      :disabled="changeBySku"
                      :rules="changeBySku !== true ? rules.SKU : [true]"
                      @change="changeProductsBySku()"
                      prepend-icon='fa fa-box'
                      autofocus>                
                  </v-text-field>
                  <v-text-field
                      label="Quantidade"
                      hide-details="auto"
                      type='number'
                      color="var(--primary)"
                      v-model="productChange.quantity"
                      class='pa-2'
                      prepend-icon='fa fa-boxes'>                
                  </v-text-field>
                  <v-currency-field 
                    label="valor" 
                    clearable
                    prefix='R$'
                    color="var(--primary)"
                    class='pr-2'
                    prepend-icon='fa fa-dollar-sign'
                    :disabled="!changeBySku"
                    v-model="productChange.value"/>
                  <v-select
                    v-model="productChange.description"
                    :items="justifyChange"
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
                <v-btn text @click="changeMenu = false">Cancelar</v-btn>
                <v-btn color="var(--primary)" text @click="newChange()">salvar</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
            <!-- fim -->
            
            <v-btn height="14.5vh" width="15%"  color='red' dark   title="cancelar a sale" @click="onCancelOrder()">
              <v-icon color="white" size='35'> fa fa-ban</v-icon>
            </v-btn>
              <FinishSaleBt />
        </v-row>
        <v-row dense no-gutters class='pt-6' justify="center" v-if="sale.status !== 'Finalizada'">
          <v-spacer></v-spacer>
          <h5  class="white--text ml-3 mr-3 "> {{sale.status}}</h5>
          <v-icon color='white'>fa fa-exclamation</v-icon>
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
import FinishSaleBt from '../components/caixa/FinishSaleBt.vue'
import TotalCard from '../components/caixa/TotalCard.vue'
import { format } from 'date-fns'

export default {
  name: 'caixaPage',
  setup(){
      
    },    
  computed:{
    sale(){
      return this.$store.state.cashierStore
    },
    products(){
      return this.$store.state.productStore.products
    },
  },
  data:()=>({    
    menuObs:false,
    changeMenu:false,
    changeBySku:false,
    productChange:{
      with_client: "",
      code: "#TROC",
      description: "Cupom de troca do SKU: ",
      value: 10,
      all_products: 0,
      acumulate: 0,
      percent: 0,
      quantity: 1,
      sku:''
    },
    justifyChange:[
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
      this.$store.dispatch('cleanSale')
    },
    onProductChange(){
    },
    saveObs(obs){
      if(obs.length <=200){
        this.$store.dispatch('addObs',obs)
        this.menuObs = false
        this.observacao = ''
      }
    },
    aditObs(){
      this.observacao = this.sale.obs
    },
    changeProductsBySku(){
      let itemIndex     = this.sale.items.findIndex(x => x.sku === this.productChange.sku);
      console.log('in set sku',itemIndex)
      //check items add first
      if(itemIndex !== -1){
        var result = (this.sale.items[itemIndex].total / this.sale.items[itemIndex].quantity)
        console.log('troca calculo',this.sale.items[itemIndex].total,this.sale.items[itemIndex].quantity,result)
        this.productChange.value = result
        this.productChange.description = 'troca referente ao SKU: ' + this.sale.items[itemIndex].sku
      }else{
        this.rules.SKU = ['sku não encontrado no carrinho!']
      }
    },
    newChange(){
      if(this.productChange.value>0 && this.productChange.value<=10000){this.productChange.value = this.productChange.quantity * this.productChange.value
        var newChange = Object.assign({}, this.productChange) 
        this.productChange.description = this.productChange.sku ===''?
            'Cupom de troca ao produto não identificado. motivo:'+this.productChange.description:
            this.productChange.description
        this.$store.dispatch('addDisconts',newChange)
        this.productChange = 
        {
          with_client: "",
          code: "#TROC",
          description: "Cupom de troca do SKU: ",
          value: 10,
          all_products: 0,
          acumulate: 0,
          percent: 0,
          quantity: 1,
          sku:''
        }
        this.changeMenu  = false
        this.changeBySku = false
      }else{
        alert('valor de troca inválida')
      }
    },
    async finalizarsale(){
      try{
        this.sale.status     = "processando...";
        var newsale          = Object.assign({}, this.sale) //create a obj clone, not reference
        newsale.dtsale       = format(new Date(), "yyyy-MM-dd kk:mm")
        newsale.status       = "Finalizada";
        newsale.caixa        = this.usuario.caixaNome;
        newsale.loja         = this.usuario.loja;
        newsale.lojaAbr      = this.usuario.abreviacao;
        newsale.funcCaixa    = this.usuario.nomeUsuario;

        this.$store.dispatch('newsale',newsale)
        await setTimeout(() => {
          this.$store.dispatch('limparsale')
          }, 500);
          
      }catch(e){
        console.log('console.finalizando sale',e)
      }
    }
  },
  components: {
      ProductCard,
      CustomerCard,
      SalesmanCard,
      TabCashierSubmenu,
      TotalCard,
      FinishSaleBt,
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