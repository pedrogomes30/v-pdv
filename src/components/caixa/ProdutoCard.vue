<template>
    <!-- PRODUTOS -->
    <v-card elevation="0" id="productCard" permanent min-height="100%">
    <v-card-title>Produtos<v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="procurar..."
        single-line
        hide-details
        dense
        autofocus
        @keyup.enter="searchProduct(search)">
        ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="header"
        :items="produtos"
        :search="search"        
        dense
        :items-per-page="20"
        @click:row="productSelect">
        <template v-slot:items="row">
            <tr>
            <td>
                <v-icon right color="pink" size="15">fa fa-box</v-icon>
            </td>
            <td>{{row.item.SKU}}</td>
            <td>{{row.item.descricao}} {{row.item.desc_variacao}}</td>
            <td>{{row.item.categoria_produto}}</td>
            <td >{{noPrice(row.item.preco)}}</td>
            </tr>
        </template>
    </v-data-table>
    </v-card>
</template>

<script>

export default {
    
    name : 'ProdutoCard',    
    computed:{
        produtos(){
            return this.$store.state.produto.produtos
        },
        itensSelecionados(){
            return this.$store.state.caixa.itensSelecionados
        },
    },
    data:()=>{
        return {
           search: '',
           header:[
               {
                 text: 'Sku',
                 align: 'start',
                 sortable: false,
                 value: 'SKU',
               },
               { text: 'Descricao', value: 'descricao' },
               { text: 'Categoria', value: 'categoria_produto' },
               { text: 'Preco(R$)', value: 'preco' },
           ],
       } 
    },
    methods:{
        productSelect(item){
            this.$store.dispatch('includeItensSelecionados',item)       
        },
        searchProduct(search){
            let exists = this.produtos.findIndex(x => x.SKU === search);
            search = this.produtos[exists]
            this.$store.dispatch('includeItensSelecionados',search)   
            this.search = ''
        },
        noPrice(price){
            return typeof price !== 'undefined' ? price:1
        }
    }
}

</script>

<style>
#productCard{
  padding: 0.5%;
  min-height:100% important;
  min-width:100% important;
  background-color: white;
}
</style>