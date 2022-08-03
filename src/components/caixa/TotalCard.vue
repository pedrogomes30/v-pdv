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
                    <v-row no-gutters color='red' dark dense v-if="sale.change_value <0" id='restante'>
                        restante 
                        <v-spacer></v-spacer>
                        <v-icon size='20' class='pa-1' color="red">fa-solid fa-down-long</v-icon>
                         <b>{{valueFormat(sale.change_value)}}</b>
                    </v-row>
                    <v-row no-gutters color='green' dark dense v-else id='troco'>
                        troco
                        <v-spacer></v-spacer>
                        <v-icon size='20' class='pa-1' color="green">fa-solid fa-up-long</v-icon>
                            <b>{{valueFormat(sale.change_value)}}</b>
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
        changeColors(){
            this.colorPayment = this.sale.change_value>=0?"#51bd5c":'#d94343'
        }
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