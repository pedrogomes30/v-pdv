<template>
    <!-- PRODUTOS DA SELECIONADOS DA VENDA -->
        <v-card>
            <v-card-title>
                <v-list-item-avatar rouded color="var(--primary">
                    <v-icon color="white"> fa fa-cart-shopping</v-icon>
                </v-list-item-avatar>
                Carrinho
                <v-spacer></v-spacer>
                 <v-icon  
                    color="red" 
                    title="esvaziar carrinho"
                    @click="cleanCart">fa fa-xmark
                </v-icon>
            </v-card-title>
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
                style="height: 25vh;padding-left:3px;padding-right:3px "
                class="overflow-y-auto"
                >
                <template v-slot:item="row">
                    <tr >
                        <td >
                            <v-icon size="15" color="red" @click="removeItem(row)" >fa fa-xmark </v-icon>
                        </td>
                        <td class='pa-0'> 
                            {{row.item.sku}}<br>
                            <b>{{row.item.description}}</b></td>
                        <td>
                            <v-container class='pa-0' id="microButtons">
                                <v-icon size="10" color="green" @click="qtdAdd(row)" >fa fa-plus</v-icon>
                                {{row.item.quantidade}} 
                                <v-icon size="10" color="red" @click="qtdSub(row)" >fa fa-minus</v-icon>
                                <h6>x{{valueFormat(row.item.valor)}}</h6>
                            </v-container>
                        </td>
                        <td>
                            <div>
                                <h6>
                                    {{valueFormat(row.item.total)}}
                                </h6>
                                <div v-if='row.item.disconts !== undefined '>
                                    <div v-for="desconto in row.item.disconts" :key="desconto.codigo">
                                        <h6 style="color:red;" :title="getDescTitle(desconto)">{{valueFormat(desconto.value)}}-</h6>
                                    </div>
                                </div>
                                <h5>
                                    <b>{{calculoDesconto(row.item)}}</b>
                                </h5>
                            </div>
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
      valorVenda(){
          return this.$store.state.caixa.valorVenda
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
            try{
                return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            }catch(exception){
                console.log(exception)
                return ''
            }
        },
        getDescTitle(desconto){
            return desconto.codigo+': '+desconto.descricao
        },
        calculoDesconto(produto){
            if(produto.descontos.lenght != 0 ){
                var tempDesconto = 0
                produto.descontos.forEach(desconto=>{
                    tempDesconto += desconto.valor
                })
                return this.valueFormat(produto.total - tempDesconto)
            }else{
                return this.valueFormat(produto.total)
            }
        }

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