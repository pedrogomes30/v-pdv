<template>
   <v-dialog
    transition="dialog-top-transition"
    max-width="800"
    v-model="active"
    >
    <template v-slot:activator="{ on, attrs }">
        <v-btn 
        height="14.5vh" 
        width="52%"  
        color='green' 
        dark
        v-bind="attrs"
        v-on="on"
        :disabled="!sale.valid_sale"
        >
        <v-row class="text-h5 pa-10">
            Continuar
            <v-spacer></v-spacer>
            <v-icon size="30">fa-solid fa-arrow-right</v-icon>
        </v-row>
    </v-btn>
</template>
<template v-slot:default="dialog">
    <LoadComponent :overlay="loading"/>
        <v-card>
        <v-toolbar
            color="var(--primary)"
            dark
            class="text-h5 pa-0"
        >Confirmar Venda</v-toolbar>
        <v-card-text dense class="pa-1">
            <template>
                <v-row class='ma-4 justify-center'>
                    <v-card center width="25%">
                        <v-card-text><v-icon size='45' class='pa-0' color="var(--primary)">fa fa-boxes</v-icon></v-card-text>
                        <v-card-text><span>PRODUTOS</span></v-card-text>   
                        <v-card-text><h3>{{valueFormat(sale.products_value)}}</h3></v-card-text>
                    </v-card>                                   
                    <v-card center width="25%">
                        <v-card-text><v-icon size='45' class='pa-0' color="var(--primary)">fa fa-equals</v-icon></v-card-text>
                        <v-card-text><span> TOTAL DA VENDA</span></v-card-text>   
                        <v-card-text><h3>{{valueFormat(sale.total_value)}}</h3></v-card-text>
                    </v-card>                                   
                    <v-card center width="25%">
                        <v-card-text><v-icon size='45' class='pa-0' color="var(--primary)">fa fa-money-bill</v-icon></v-card-text>
                        <v-card-text><span>PAGAMENTOS</span></v-card-text>   
                        <v-card-text><h3>{{valueFormat(sale.payments_value)}}</h3></v-card-text>
                    </v-card>                                   
                    <v-card center width="25%">
                        <v-card-text><v-icon size='45' class='pa-0' color="var(--primary)">fa-solid fa-money-bill-transfer</v-icon></v-card-text>
                        <v-card-text><span>TROCO</span></v-card-text>   
                        <v-card-text><h3>{{valueFormat(sale.change_value)}}</h3></v-card-text>
                    </v-card>                                   
                </v-row>
            </template>
            <template>
                <v-expansion-panels class='pa-4'>
                    <!-- INFO SALE -->
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <span>Informção da Venda</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row>
                                <v-col cols="6"><span>Loja: <b>{{session.store.store_name}}</b></span></v-col>
                                <v-col cols="6"><span>Operador de caixa: <b>{{session.user_name}}</b></span></v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6"><span>Número: <b>{{session.number}}</b></span></v-col>
                                <v-col cols="6"><span>Caixa: <b>{{session.cashier_name}}</b></span></v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6"><span>Cliente: <b>{{sale.customer.name}}</b></span></v-col>
                                <v-col cols="6"><span>Vendedor:<b>{{sale.salesman.name}}</b></span></v-col>
                            </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <!-- ITEM INFO -->
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <span>Items da Venda</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <tr v-for="item in sale.items" :key='item.id' >
                                <td class='pa-3'>
                                    <span><b>{{item.sku}}</b><br>{{item.description}}</span>
                                </td>
                                <td class='pa-3'>
                                    <span><b>{{item.quantity}}und </b><br>{{valueFormat(item.value)}}</span>
                                </td>
                                <td class='pa-3'>
                                    <h4><b>{{valueFormat(item.total)}}</b></h4>     
                                </td>   
                            </tr>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <!-- PAYMENT INFO -->
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <span>Pagamentos da Venda</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <tr v-for="item in sale.payments" :key='item.method_id' >
                                <td class='pa-3'>
                                    <span><b>{{item.method_alias}}</b></span>
                                </td>
                                <td class='pa-3'>
                                    <h4><b>{{valueFormat(item.method_value)}}</b></h4>     
                                </td>   
                            </tr>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <!-- DISCONTS INFO -->
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <span>Descontos da Venda</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <tr v-for="item in sale.disconts" :key='item.id' >
                                <td class='pa-3'>
                                    <span><b>{{item.code}}</b></span>
                                </td>
                                <td class='pa-3'>
                                    <span><b>{{item.description}}</b></span>
                                </td>
                                <td class='pa-3'>
                                    <h4><b>{{item.percent ? item.value+' %' : valueFormat(item.value)}}</b></h4>     
                                </td>   
                            </tr>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>               
            </template>
        </v-card-text>
        <v-card-actions class="justify-end">
            <v-btn
            dark
            @click="dialog.value = false"
            >Fechar
            <v-icon
                right
                dark
            >
            fa-xmark
            </v-icon>
            </v-btn>
            <v-btn
                color='green'
                @click="createSale"
                dark
                >Finalizar 
                <v-icon
                    right
                    dark
                >
                fa-check
                </v-icon>
            </v-btn>
        </v-card-actions>
        </v-card>
    </template>
    </v-dialog>
</template>

<script>
import generateSale from '../../services/SaleServices/createSale'
import LoadComponent from '../SysComponents/LoadComponent.vue'
export default {
    name: "FinishSaleBt",
    computed: {
        sale() {
            return this.$store.state.cashierStore;
        },
        session() {
            return this.$store.state.auth.cashier_session;
        },
        sales() {
            return this.$store.state.salesStore.sales;
        },
    },
    data: () => ({
        number: "",
        loading: false,
        active: false,
    }),
    methods: {
        valueFormat(value) {
            return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
        },
        async createSale() {
            this.loading = true;
            var sale = Object.assign({}, this.sale);
            var session = Object.assign({}, this.session);
            var newSale = await generateSale(sale, this.sales, session);
            await this.dispatchSale(newSale);
            this.active = false;
            this.loading = false;
        },
        async dispatchSale(newSale) {
            await this.$store.dispatch("newSale", newSale);
            await this.$store.dispatch("cleanSale");
        }
    },
    components: { LoadComponent }
}
</script>

<style>

</style>