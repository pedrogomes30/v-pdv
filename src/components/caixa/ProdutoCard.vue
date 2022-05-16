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
        <v-card-text>
            <v-data-table   
                :items="produtos"
                :search="search" 
                :headers="header"
                fixed-header
                calculate-widths
                dense                
                :items-per-page="50"
                style="height: 71vh;"
                class="overflow-y-auto"
                >
                <template  v-slot:item="row" >
                    <tr @click='productSelect(row.item)'>
                        <td><v-icon size="20" color="var(--primary)"   >fa fa-box </v-icon>
                        </td>
                        <td class='ma-0 pa-0 pr-1'>{{row.item.SKU}}</td>
                        <td class='ma-0 pa-0'>{{row.item.descricao}} {{row.item.desc_variacao}}</td>
                        <td class='ma-0 pa-0'><v-chip v-if="haveChips(row.item)" class='ma-1' color="var(--primary)" dark>{{row.item.marca}} {{row.item.fornecedor}}</v-chip></td>
                        <td class='ma-0 pa-0'><v-chip class='ma-1' :color="changeColorCategory(row.item.categoria_produto)">{{row.item.categoria_produto}}</v-chip></td>
                        <td class='ma-0 pa-0 justify-center'><b>{{noPrice(row.item.preco)}}</b></td>
                    </tr>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
 
export default {
    
    name : 'ProdutoCard',    
    computed:{
        produtos(){
            return this.$store.state.produto.produtos
        },
        categorias(){
            return this.$store.state.produto.categorias
        },
        itensSelecionados(){
            return this.$store.state.caixa.itensSelecionados
        },
    },
    data:()=>{
        return {
           search: '',
           header:[
               { text: '',align: 'start',sortable: false,value: ''},
               { text: 'Sku',align: 'start',sortable: false,value: 'SKU'},
               { text: 'Descricao',align: 'start', value: 'descricao' },
               { text: 'marca / fornecedor', align: 'start', value: 'marca' },
               { text: 'Categoria',align: 'center', value: 'categoria_produto' },
               { text: 'Preco(R$)', align: 'center', value: 'preco' },
           ],
          
       } 
    },
    methods:{
        productSelect(item){
            console.log('row selected',item)
            this.$store.dispatch('includeItensSelecionados',item)       
        },
        searchProduct(search){
            let exists = this.produtos.findIndex(x => x.SKU === search);
            search = this.produtos[exists]
            this.$store.dispatch('includeItensSelecionados',search)   
            this.search = ''
        },
        noPrice(price){
            return typeof price !== 'undefined' ? price:this.valueFormat(9.99)
        },
        valueFormat(value){
        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
      },
      changeColorCategory(categoria){
          let exists = this.categorias.findIndex(x => x.categoria === categoria);
          return this.categorias[exists].cor
      },
      haveChips(item){
          console.log(item.fornecedor, item.marca)
          if(item.fornecedor === '' || item.fornecedor === null  && item.marca == '' || item.marca == null){
            return false
          }
          return true
      }
    }
}

</script>

<style>
#productCard{
    min-width: 100%;
}
</style>