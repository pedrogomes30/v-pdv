<template>
     <v-menu
        v-model="changeMenu"
        :close-on-content-click="false"
        :nudge-width="200"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn  
            height="100%" 
            width="15%" 
            color='grey' 
            dark  
            v-bind="attrs" 
            v-on="on"
            title="troca produto"
            >
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
            v-show='is_manager'
            @click="cleanSku()"
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
            id="price"
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
</template>

<script>
import alert from '../../services/errorHandler'
export default {
    name:'ChangeCard',
    computed:{
      is_manager(){
        return this.$store.state.auth.cashier_session.is_manager
      },
      sale(){
          return this.$store.state.cashierStore
          },
          products(){
          return this.$store.state.productStore.products
          },
      },
    data:()=>(
      {
        changeMenu:false,
        changeBySku:false,
        productChange:{
          with_client: "",
          code: "#TROC",
          description: "Cupom de troca do SKU: ",
          value: 0,
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
      rules:{
        validCodigo:[true],
        validSKU:[true],
        motivo:[val => (val || '').length > 0 || 'motivo obrigatório!'],
        value: [val => (val || '' || 0).length > 0 || 'necessário informar o valor do produto!'],
        quantidade: [val => (val || '' || 0).length > 0 || 'quantidade obrigatoria!'],
        SKU: [val => (val || '').length > 0 || 'necessário informar sku do produto!'],
        },
    }),
    methods:{
        changeProductsBySku(){
          let itemIndex     = this.sale.items.findIndex(x => x.sku === this.productChange.sku);
          //check items add first
          if(itemIndex !== -1){
            var result = (this.sale.items[itemIndex].total / this.sale.items[itemIndex].quantity)
            this.productChange.value = result
            this.productChange.description = 'troca referente ao SKU: ' + this.sale.items[itemIndex].sku
            alert('success','Desconto de troca adicionado ao carrinho.')
          }else{
            alert('error','SKU não encontrado no carrinho.')
            this.rules.SKU = ['sku não encontrado no carrinho.']
          }
        },
        cleanSku(){
          this.productChange.sku = !this.changeBySku ? this.productChange.sku : ''
        },
        newChange(){
          if(this.productChange.value>0 && this.productChange.value<=10000){this.productChange.value = this.productChange.quantity * this.productChange.value
            this.productChange.description = this.productChange.sku ===''?
            'Cupom de troca ao produto não identificado. motivo:'+this.productChange.description:
            this.productChange.description
            var newChange = Object.assign({}, this.productChange) 
            this.$store.dispatch('addDisconts',newChange)
            this.productChange = 
            {
              with_client: "",
              code: "#TROC",
              description: "Cupom de troca do SKU: ",
              value: 0,
              all_products: 0,
              acumulate: 0,
              percent: 0,
              quantity: 1,
              sku:''
            }
            alert('success','Desconto de troca adicionado ao carrinho.')
            this.changeMenu  = false
            this.changeBySku = false
          }else{
            alert('error','valor de troca inválida')
          }
      }
    }
  }
</script>

<style>

</style>