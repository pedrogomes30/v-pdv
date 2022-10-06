<template>
    <v-row no-gutters dense>
        <v-col cols="12" align-self="center" >
            <v-card id='totalizadorCard'>
                <v-card-title >
                    <v-list-item-avatar rouded color="var(--primary">
                        <v-icon color="white"> fa fa-equals</v-icon>
                    </v-list-item-avatar>
                    Total da Venda
                </v-card-title>
                <div class='pl-2 pr-2'>
                    <v-row no-gutters dense><v-icon size='15' class='pa-1' color="var(--primary)">fa fa-boxes</v-icon>
                        Total produtos <v-spacer></v-spacer>{{valueFormat(sale.products_value)}}</v-row>
                    <v-row no-gutters dense><v-icon size='15' class='pa-1' color="var(--primary)">fa fa-ticket</v-icon>
                        Total descontos <v-spacer></v-spacer>-{{valueFormat(sale.discont_value)}}</v-row>
                    <v-divider></v-divider>
                    <v-row no-gutters dense><v-icon size='15' class='pa-1' color="var(--primary)">fa fa-equals</v-icon>
                        <b>Total da venda</b><v-spacer></v-spacer><b>{{valueFormat(sale.total_value)}}</b></v-row>
                    <v-row no-gutters dense><v-icon size='15' class='pa-1' color="var(--primary)">fa fa-money-bill</v-icon>
                        Total pago <v-spacer></v-spacer>{{valueFormat(sale.payments_value)}}</v-row>
                    <v-divider></v-divider>
                    <v-row no-gutters color='red' dark dense v-if="sale.change_value <0" class="text-h4 red--text d-flex flex-row-reverse">
                        <v-icon size='35' class='pa-1 ml-3' color="red">fa-solid fa-down-long</v-icon> 
                        <b class="pl-6">{{valueFormat(sale.change_value)}}</b>
                        à pagar 
                    </v-row>
                    <v-row no-gutters color='green' dark dense v-else class="text-h4 green--text d-flex flex-row-reverse">
                        <v-icon size='35' class='pa-1 ml-3' color="green">fa-solid fa-up-long</v-icon>
                        <b class="pl-6">{{valueFormat(sale.change_value)}}</b>
                        troco
                    </v-row>
                </div>
                </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name:'TotalCard',
    computed:{
        sale(){
            return this.$store.state.cashierStore 
        },
    },
    data:()=>({    
        colorPayment: '#d94343',
    }),
    methods:{
        valueFormat(value){
            return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        },
    }
}
</script>

<style>
#totalizadorCard{
    margin-top:1%
}
#restante {
    font-size:1.6em;
}
#restante b{
    color:#F44336;
}
#troco {
    font-size:1.6em;
}
#troco b{
    color:#4CAF50;
}
</style>