<template>
    <!-- PRODUTOS DA SELECIONADOS DA VENDA -->
        <v-card >
            <v-card-title>
                <v-list-item-avatar rouded color="var(--primary">
                    <v-icon color="white"> fa fa-cart-shopping</v-icon>
                </v-list-item-avatar>
                Carrinho
                <v-spacer></v-spacer>
            </v-card-title>
            <v-card-subtitle>
                <v-row no-gutters>
                    <v-icon size='20'  color="var(--primary)"> fa fa-equals</v-icon>
                    Total {{valueFormat(valorProdutos)}}
                    <v-spacer></v-spacer>
                    <v-icon  
                        color="red" 
                        title="esvaziar carrinho"
                        @click="cleanCart">fa fa-xmark</v-icon>
                </v-row>
            </v-card-subtitle>
            <div>
                <v-data-table
                
                :items="itensSelecionados"
                disable-filtering
                fixed-header
                calculate-widths
                dense
                hide-default-footer
                :items-per-page="-1"
                id="scroll-cart"
                style="height: 52vh;padding-left:3px;padding-right:3px "
                class="overflow-y-auto"
                >
                <template v-slot:item="row">
                    <tr >
                        <td >
                            <v-icon size="15" color="red" @click="removeItem(row)" >fa fa-xmark </v-icon>
                        </td>
                        <td class='pa-0'> 
                            {{row.item.SKU}}   
                        </td>
                        <td>{{row.item.descricao}}</td>
                        <td>
                            <v-container class='pa-0' id="microButtons">
                                <v-icon size="10" color="green" @click="qtdAdd(row)" >fa fa-plus</v-icon>
                                {{row.item.quantidade}} 
                                <v-icon size="10" color="red" @click="qtdSub(row)" >fa fa-minus</v-icon>
                            </v-container>
                        </td>
                        <td>
                            {{valueFormat(row.item.valor)}}
                            <b>{{valueFormat(row.item.total)}}</b>
                        </td>                    
                    </tr>
                </template>
                </v-data-table>  
            </div>
        </v-card>
</template>
<script>
export default {
    name: 'ProdutoSelecionadoCard',
    computed:{
      itensSelecionados(){
          return this.$store.state.caixa.itensSelecionados
      },
      valorProdutos(){
          return this.$store.state.caixa.valorProdutos
      },
     
    },
    data:()=>{
        return{
            

        }
    },
    methods:{
        qtdAdd(produto){
            produto.item.quantidade++
            this.$store.dispatch('qtdItensSelecionados',produto.item)
        },
        qtdSub(produto){
            produto.item.quantidade--
            if((produto.item.quantidade) <= 0){
                this.$store.dispatch('removeItensSelecionados',produto.item)
            }else{
                this.$store.dispatch('qtdItensSelecionados',produto.item)
            }
        },
        removeItem(produto){
            this.$store.dispatch('removeItensSelecionados',produto.item)
        },
        cleanCart(){    
            this.$store.dispatch('cleanCart')
        },
        valueFormat(value){
            return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        },
    }
}
</script>
<style>

#microButtons{
  display: flex;
  align-content:space-between ;
  justify-content: center;
}
#microButtons .v-icon{
  padding:5px;
}
</style>