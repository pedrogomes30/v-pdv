<template>
    <!-- PRODUTOS DA SELECIONADOS DA VENDA -->
    <div id='produtosSelecionados' >
        <v-card min-height="600">
        <v-card-subtitle>Produtos da Venda</v-card-subtitle>
        <v-data-table
        :headers="header"
        :items="itensSelecionados"
        disable-filtering
        calculate-widths
        :hiddenheader="(qtdItens<=10)?'hide-default-header':''"
        :hiddenfooter="(qtdItens<=10)?'hide-default-footer':''"
        
        dense
        :items-per-page="10"
        >
        <template v-slot:item="row">
            <tr>
            <td>{{row.item.sku}}</td>
            <td>{{row.item.descricao}}</td>
            <td>{{row.item.valor}}</td>
            <td>  
                <v-icon size="10" color="red" @click="qtdSub(row)" >fa fa-minus</v-icon>
            </td>
            <td>{{row.item.quantidade}}</td>
            <td>  
                <v-icon size="10" color="green" @click="qtdAdd(row)" >fa fa-plus</v-icon>
            </td>
            <td>{{row.item.total}}</td>
            </tr>
        </template>
        </v-data-table>          
        </v-card>
    </div>
</template>
<script>
export default {
    name: 'ProdutoSelecionadoCard',
    props:{
        
    },
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
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                { text: 'Descricao', value: 'descricao' },
                { text: 'variacao', value: 'desc_variacao' },
                { text: 'referencia', value: 'referencia' },
                { text: 'cod. barras', value: 'cod_barras' },
            ],

        }
    },
    methods:{
        qtdAdd(produto){
            console.log("ADICIONAR",produto.item)
            this.$store.dispatch('addItensSelecionados',produto.item)
        },
        qtdSub(produto){
            console.log("MENOS",produto.item)
            this.$store.dispatch('removeItensSelecionados',produto.item)
        }
    }
}
</script>
<style>
#produtosSelecionados{
  margin-left: 1%;
  margin-top: 1%;
}
</style>