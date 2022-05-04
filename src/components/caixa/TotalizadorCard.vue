<template>
    <v-card height="69.7vh" >
        <v-card-title >
            <v-list-item-avatar rouded color="var(--primary">
                <v-icon color="white"> fa fa-equals</v-icon>
            </v-list-item-avatar>
            Subtotal
        </v-card-title>
        <v-container>
            <h6>
                Total Produtos
                <v-spacer></v-spacer>
                R$ {{valorProdutos}}
            </h6>        
            <h6>
                total de descontos 
                <v-spacer></v-spacer>
                R$ {{valorDesconto}}
            </h6>
            <h6>
                Pagamentos 
                <v-spacer></v-spacer>
                R$ {{valorPagamentos}}
            </h6>
            <h6>
                Troco
                <v-spacer></v-spacer>
                R$ {{troco}}
            </h6>
        </v-container>
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
    },
    data:()=>({    
        troco:0,
    }),
}
</script>

<style>

</style>