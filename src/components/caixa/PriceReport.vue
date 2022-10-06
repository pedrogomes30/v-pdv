<template>
  <v-menu
        v-model="reportMenu"
        :close-on-content-click="false"
        :nudge-width="200"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-icon 
                size="18" 
                v-bind="attrs" 
                v-on="on"
                title='Reportar diferença de preço'
                color='red'
                >fa-solid fa-triangle-exclamation
            </v-icon>  
        </template>
        <v-card>
        <v-list>
        <v-list-item>
            <v-list-item-avatar rouded color="red">
                <v-icon color="white"> fa-solid fa-triangle-exclamation</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
            <v-list-item-title>Informar preço errado</v-list-item-title>
        </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list class="pa-3">
            <v-list-item-subtitle>SKU: {{item.sku}}</v-list-item-subtitle>
            <v-list-item-subtitle>Descrição: {{item.description}}</v-list-item-subtitle>
            <v-list-item-subtitle>Categoria: {{nameCategory(item.category)}}</v-list-item-subtitle>
            <v-list-item-subtitle>Fornecedor: {{item.provider.toUpperCase()}}</v-list-item-subtitle>
            <v-list-item-subtitle class='pt-3 pl-6'>Preço Atual: {{valueFormat(item.price)}}</v-list-item-subtitle>
            <v-currency-field 
              label="Valor correto" 
              clearable
              prefix='R$'
              color="var(--primary)"
              class='px-3'
              id="price"
              prepend-icon='fa fa-dollar-sign'
              v-model="right_price"
            />
        </v-list>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="reportMenu = false">Cancelar</v-btn>
        <v-btn color="var(--primary)" text @click="report()">reportar</v-btn>
        </v-card-actions>
        </v-card>
    </v-menu>
</template>
<script>
    import {setWrongPrice} from '../../services/api/productsApi'
    import alert from '../../services/errorHandler'
export default {
    name:"PriceReport",
    props:{
        item:{}
    },
    computed: {
        categorys() {
            return this.$store.state.productStore.categorys;
        },
        store() {
            return this.$store.state.auth.cashier_session.store.store_name;
        },
    },
    data:()=>({    
        reportMenu:false,
        right_price:0.00,
    }),
    methods:{
        nameCategory(categoria) {
            let exists = this.categorys.findIndex(x => x.id === categoria);
            return this.categorys[exists].name;
        },
        valueFormat(value) {
            if(typeof(value) !== 'undefined')
            return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
        },
        async report(){
            var id = this.item.id
            var item_reported = {
                store: this.store,
                right_price:this.right_price
            }
            await setWrongPrice(item_reported,id)
            this.reportMenu = false
            alert('success','Preço de produto reportado')
        }
    }
    
}
</script>

<style>
    
</style>