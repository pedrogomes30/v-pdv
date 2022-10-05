<template>
    <!-- productS DA SELECIONADOS DA VENDA -->
        <div height='100%' class="d-flex flex-column align-center justify-center">
            <v-data-table
            :headers="header"
            :items="Items"
            disable-filtering
            fixed-header
            calculate-widths
            dense
            hide-default-header
            hide-default-footer
            :items-per-page="-1"
            id="scroll-cart"
            style="height:30vh;width:100%;padding-left:3px;padding-right:3px "
            class="overflow-y-auto"
            >
            <template v-slot:item="row">
                <tr v-if="row.item.id !== 0" >
                    <td >
                        <v-icon size="20" color="red" @click="removeItem(row)" class='ma-0 pa-0' >fa fa-xmark </v-icon>
                    </td>
                    <td > 
                        {{row.item.sku}}<br>
                        <b>{{row.item.description}}</b></td>
                        <td>
                            <v-container id="miniButtons" >
                                <h5>{{valueFormat(row.item.value)}}</h5>
                                <v-icon size="10" color="green" @click="qtdAdd(row)" class='mr-1'>fa fa-plus</v-icon>
                                {{row.item.quantity}} 
                                <v-icon size="10" color="red" @click="qtdSub(row)" class='ml-1'>fa fa-minus</v-icon>
                            </v-container>
                    </td>
                    <td>
                        <div>
                            <h5>
                                {{valueFormat(row.item.price * row.item.quantity)}}
                            </h5>
                            <div v-if='row.item.disconts !== undefined '>
                                <div v-for="discont in row.item.disconts" :key="discont.code">
                                    <h5 style="color:red;" :title="getDescTitle(discont)">{{valueFormat(discont.price)}}-</h5>
                                </div>
                            </div>
                            <h4>
                                <b>{{valueFormat(row.item.total)}}</b>
                            </h4>
                        </div>
                    </td>                    
                </tr>
            </template>
        </v-data-table>  
        <v-btn fab small>
            <v-icon
                @click="cleanCart"
                color="red"
                title="esvaziar carrinho"
                size="25"
                >
                fa fa-trash
            </v-icon>
        </v-btn>
    </div>
</template>
<script>
export default {
    name: 'productSelecionadoCard',
    computed:{
      Items(){
        return this.$store.state.cashierStore.items
      },
    },
    data:()=>{
        return {
           header:[
               { text: '',align: 'center',sortable: false,value: ''},
               { text: 'Produto',align: 'center', value: 'description' },
               { text: 'preço / quantidade', align: 'center', value: 'price' },
               { text: 'total / descontos', align: 'center', value: 'total' },
           ],          
       } 
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

#miniButtons{
  padding: 0;
  margin: 0;
}

</style>