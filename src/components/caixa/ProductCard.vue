<template>
    <!-- products -->
    <v-card elevation="0" id="productCard" >
        <v-card-title>
            <v-list-item-avatar rouded color="var(--primary">
                <v-icon color="white"> fa fa-boxes</v-icon>
            </v-list-item-avatar>
            Produtos
            <v-spacer></v-spacer>
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="procurar..."
            single-line
            dense
            autofocus
            @keyup.enter="searchProduct(search)">
            ></v-text-field>
            <v-btn 
                icon 
                title="Atualizar Produtos" 
                right
                center
                :loading="loading"
                @click="updateproducts(true)">
                <v-icon color="green">fa-solid fa-arrows-rotate</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text>
            <v-data-table   
                :items="products"
                :search="search" 
                :headers="header"
                fixed-header
                calculate-widths
                dense                
                :items-per-page="50"
                style="height: 71vh;"
                class="overflow-y-auto"
                :loading=loading
                loading-text="Carregando produtos..."
                >
                <template  v-slot:item="row" >
                    <tr @click='newItem(row.item)'>
                        <!-- <td><v-icon size="20" color="var(--primary)"   >fa fa-box </v-icon>   </td> -->
                        <td class='ma-0 pa-0 pr-1'>{{row.item.sku}}</td>
                        <td class='ma-0 pa-0'>{{row.item.description}}</td>
                        <td class='ma-0 pa-0'>{{row.item.provider}}</td>
                        <td class='ma-0 pa-0'>{{nameCategory(row.item.category)}}</td>
                        <td class='ma-0 pa-0 justify-center'><b>{{valueFormat(row.item.price)}}</b></td>
                    </tr>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
import {getProducts} from '../../services/api/productsApi'
export default {
    
    name : 'ProductsCard',    
    computed:{
        products(){
            return this.$store.state.productStore.products
        },
        categorys(){
            return this.$store.state.productStore.categorys
        },
    },
    data:()=>{
        return {
           search: '',
           loading:false,
           header:[
               { text: 'Sku',align: 'start',sortable: false,value: 'sku'},
               { text: 'Descricao',align: 'start', value: 'description' },
               { text: 'marca / fornecedor', align: 'start', value: 'provider' },
               { text: 'Categoria',align: 'center', value: 'category' },
               { text: 'Preco(R$)', align: 'center', value: 'price' },
           ],          
       } 
    },
    methods:{
        newItem(item){
            this.$store.dispatch('addItem',item)       
        },
        searchProduct(search){
            let exists = this.products.findIndex(x => x.sku === search);
            if( exists !== -1){
                search = this.products[exists]
                this.$store.dispatch('addItem',search)   
                this.search = ''
            }
        },
        valueFormat(value){
        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        },
        nameCategory(categoria){
            let exists = this.categorys.findIndex(x => x.id === categoria);
            return this.categorys[exists].name
        },
        async updateproducts(update){
            try{
                if(this.products.length <= 0 || update){
                    this.loading    = true
                    var newProducts = await getProducts();
                    this.$store.dispatch('updateProducts',newProducts );
                    this.loading    = false
                }
            }catch(e){
                alert(e)
            }
        }
    },
    async beforeMount(){
        this.updateproducts(false)
    },

}

</script>

<style>
#productCard{
    min-width: 100%;
}
</style>