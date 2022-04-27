<template>
    <!-- PRODUTOS DA SELECIONADOS DA VENDA -->
        <v-card min-height="100%" max-height="100%">
        <v-card-subtitle>Produtos da Venda</v-card-subtitle>
        <v-data-table
        :headers="header"
        :items="itensSelecionados"
        disable-filtering
        
        :hiddenheader="(qtdItens<=10)?'hide-default-header':''"
        :hiddenfooter="(qtdItens<=10)?'hide-default-footer':''"
        
        dense
        :items-per-page="10"
        >
        <template v-slot:item="row">
            <tr>
            <td>
                <v-icon size="10" color="red" @click="qtdSub(row,false)" >fa fa-xmark</v-icon>
            </td>
            <td>
                {{row.item.SKU}}
            </td>
            <td>{{row.item.descricao}} {{row.item.desc_variacao}}</td>
            <td>
                <v-card id="microButtons">
                    <v-icon size="10" color="green" @click="qtdAdd(row)" >fa fa-plus</v-icon>
                    {{row.item.quantidade}}
                    <v-icon size="10" color="red" @click="qtdSub(row,true)" >fa fa-minus</v-icon>
                </v-card>
            </td>
            <td>{{row.item.valor}}</td>
            <td>{{row.item.total}}</td>
            </tr>
        </template>
        </v-data-table>          
        </v-card>
</template>
<script>
export default {
    name: 'ProdutoSelecionadoCard',
    computed:{
      itensSelecionados(){
          return this.$store.state.caixa.itensSelecionados
      },
      qtdItens(){
          return this.$store.state.caixa.qtdItens
      },
    },
    data:()=>{
        return{
            header:[
                {},
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                { text: 'Descricao', value: 'descricao' },
                { text: 'quantidade', value: 'quantidade' },
                { text: 'valor(R$)', value: 'valor' },
                { text: 'total', value: 'Total' },
            ],

        }
    },
    methods:{
        qtdAdd(produto){
            produto.item.quantidade++
            this.$store.dispatch('qtdItensSelecionados',produto.item)
        },
        qtdSub(produto,removes){
            produto.item.quantidade = removes ? produto.item.quantidade -1 : 0
            this.$store.dispatch('qtdItensSelecionados',produto.item)
        }
    }
}
</script>
<style>
#produtosSelecionados{
  margin-left: 1%;
  margin-top: 1%;
}
#microButtons{
  display: flex;
  align-content:space-between ;
  justify-content: center;
}
#microButtons .v-icon{
  padding:5px;
}
</style>