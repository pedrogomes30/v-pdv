<template>
    <v-card id='totalizadorCard'>
        <v-card-title >
            <v-list-item-avatar rouded color="var(--primary">
                <v-icon color="white"> fa fa-equals</v-icon>
            </v-list-item-avatar>
            Subtotal
        </v-card-title>
        <v-card no-gutters dense>
            <div class='pl-2 pr-2'>
                <v-row no-gutters dense><v-icon size='15' class='pa-1' color="var(--primary)">fa fa-boxes</v-icon>
                    Total produtos <v-spacer></v-spacer>{{valueFormat(valorProdutos)}}</v-row>
                <v-row no-gutters dense><v-icon size='15' class='pa-1' color="var(--primary)">fa fa-ticket</v-icon>
                    Total descontos <v-spacer></v-spacer>-{{valueFormat(valorDesconto)}}</v-row>
                <v-divider></v-divider>
                <v-row no-gutters dense><v-icon size='15' class='pa-1' color="var(--primary)">fa fa-equals</v-icon>
                    Subtotal <v-spacer></v-spacer>{{valueFormat(valorVenda)}}</v-row>
                <v-row no-gutters dense><v-icon size='15' class='pa-1' color="var(--primary)">fa fa-money-bill</v-icon>
                    Total pagamentos <v-spacer></v-spacer>{{valueFormat(valorPagamentos)}}</v-row>
                <v-row no-gutters dense><v-icon size='15' class='pa-1' color="var(--primary)">fa fa-minus</v-icon>
                    troco <v-spacer></v-spacer>{{valueFormat(troco)}}</v-row>
            </div>
            </v-card>
    </v-card>
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
            return this.$store.state.caixa.valorDesconto
        },
    },
    data:()=>({    

    }),
    methods:{
        valueFormat(value){
            return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        }
    }
}
</script>

<style>
#totalizadorCard{
    margin-top:1%
}
</style>