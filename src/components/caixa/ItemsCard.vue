<template>
    <!-- productS DA SELECIONADOS DA VENDA -->
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
                
                :items="Items"
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
                    <tr v-if="row.item.id !== 0" >
                        <td >
                            <v-icon size="15" color="red" @click="removeItem(row)" >fa fa-xmark </v-icon>
                        </td>
                        <td class='pa-0'> 
                            {{row.item.sku}}<br>
                            <b>{{row.item.description}}</b></td>
                        <td>
                            <h6>{{valueFormat(row.item.value)}} X</h6>
                            <v-container class='pa-0' id="microButtons">
                                <v-icon size="10" color="green" @click="qtdAdd(row)" >fa fa-plus</v-icon>
                                {{row.item.quantity}} 
                                <v-icon size="10" color="red" @click="qtdSub(row)" >fa fa-minus</v-icon>
                            </v-container>
                        </td>
                        <td>
                            <div>
                                <h6>
                                    {{valueFormat(row.item.total)}}
                                </h6>
                                <div v-if='row.item.disconts !== undefined '>
                                    <div v-for="discont in row.item.disconts" :key="discont.code">
                                        <h6 style="color:red;" :title="getDescTitle(discont)">{{valueFormat(discont.price)}}-</h6>
                                    </div>
                                </div>
                                <h5>
                                    <b>{{valueFormat(row.item.total)}}</b>
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
    name: 'productSelecionadoCard',
    computed:{
      Items(){
        return this.$store.state.cashierStore.items
      },
    },
    methods:{
        qtdAdd(product){
            product.item.quantity++
            this.$store.dispatch('qtdItem',product.item)
        },
        qtdSub(product){
            product.item.quantity--
            if((product.item.quantity) <= 0){
                this.$store.dispatch('removeItem',product.item)
            }else{
                this.$store.dispatch('qtdItem',product.item)
            }
        },
        removeItem(product){
            this.$store.dispatch('removeItem',product.item)
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
        getDescTitle(discont){
            return discont.code+': '+discont.description
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