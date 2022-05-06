<template>
    <!-- PRODUTOS -->
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
        </v-card-title>
        <v-data-table   
            :headers="header"
            :items="produtos"
            :search="search" 
            dense
            :items-per-page="50"
            @click:row="productSelect"
            style="height: 71vh;padding-left:3px;padding-right:3px;font-size:0.2em;"
            class="overflow-y-auto"
            
            >
            <template  v-slot:items="row" >
                <tr >
                    <td >
                        <h6>ICON</h6>
                        <v-icon size="15" color="red"  >fa fa-xmark </v-icon>
                    </td>
                    <td><h6>{{row.item.SKU}}</h6></td>
                    <td>{{row.item.descricao}} {{row.item.desc_variacao}}</td>
                    <td>{{row.item.marca}} {{row.item.fornecedor}}</td>
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
               { text: 'Sku',align: 'start',sortable: false,value: 'SKU'},
               { text: 'Descricao', value: 'descricao' },
               { text: 'marca / fornecedor', value: 'marca' },
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
}
</style>