<template>
    <v-row no-gutters dense>
        <v-col cols="9" align-self="center" >
            <v-card id='totalizadorCard'>
                <v-card-title >
                    <v-list-item-avatar rouded color="var(--primary">
                        <v-icon color="white"> fa fa-equals</v-icon>
                    </v-list-item-avatar>
                    Total da Venda
                </v-card-title>
                <v-card no-gutters dense>
                    <div class='pl-2 pr-2'>
                        <v-row no-gutters dense><v-icon size='15' class='pa-1' color="var(--primary)">fa fa-boxes</v-icon>
                            Total produtos <v-spacer></v-spacer>{{valueFormat(valorProdutos)}}</v-row>
                        <v-row no-gutters dense><v-icon size='15' class='pa-1' color="var(--primary)">fa fa-ticket</v-icon>
                            Total descontos <v-spacer></v-spacer>-{{valueFormat(valorDesconto)}}</v-row>
                         <v-row no-gutters dense><v-icon size='15' class='pa-1' color="var(--primary)">fa fa-money-bill</v-icon>
                            Total pagamentos <v-spacer></v-spacer>{{valueFormat(valorPagamentos)}}</v-row>
                    </div>
                    </v-card>
            </v-card>
        </v-col>
        <v-col cols="3" class="pl-1 pt-1">
            <v-card height="100%" width="100%" :color="troco >= 0? '#51bd5c': '#d94343'" dark>
                <v-card-text style="text-align:center">
                    <v-icon size='20' class='pa-1' color="white">fa fa-equals</v-icon>
                    <h4>
                    TOTAL
                    </h4> 
                    <v-spacer></v-spacer>
                    <h3>
                        <b>{{valueFormat(valorVenda)}}</b>
                    </h3>
                    <div v-if="troco < 0 ">
                        <h4 >Faltam</h4>  <v-spacer></v-spacer><h3><b>{{valueFormat(troco)}}</b></h3>
                    </div> 
                   <div v-else>                        
                        <h4 >Troco</h4>  <v-spacer></v-spacer><h3><b>{{valueFormat(troco)}}</b></h3>
                   </div>  
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name:'TotalizadorCard',
    computed:{
        valorProdutos(){
            return this.$store.state.caixa.valorProdutos 
        },
        valorPagamentos(){
            return this.$store.state.caixa.valorPagamentos
        },
        valorDesconto(){
            return this.$store.state.caixa.valorDesconto
        },
        valorVenda(){
            return this.$store.state.caixa.valorVenda
        },
        troco(){
            return this.$store.state.caixa.troco
        },
    },
    data:()=>({    
        colorPayment: '#d94343',
    }),
    methods:{
        valueFormat(value){
            return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        },
        changeColors(){
            this.colorPayment = this.troco>=0?"#51bd5c":'#d94343'
        }
    }
}
</script>

<style>
#totalizadorCard{
    margin-top:1%
}
</style>