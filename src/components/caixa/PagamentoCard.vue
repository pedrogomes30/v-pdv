<template>
    <v-card >
        <v-card-title>
            <v-list-item-avatar rouded color="var(--primary">
                <v-icon color="white"> fa fa-sack-dollar</v-icon>
            </v-list-item-avatar>
            Pagamentos
        <v-spacer></v-spacer>
        
        <!--  -->
        <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
        >
        <template v-slot:activator="{ on, attrs }">
            <v-icon
            color="green"
            dark
            v-bind="attrs"
            v-on="on"
            >fa fa-plus
            </v-icon>
        </template>
        <v-card>
            <v-list>
            <v-list-item>
                <v-list-item-avatar rouded color="var(--primary">
                    <v-icon color="white"> fa fa-sack-dollar</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                <v-list-item-title>informar pagamento</v-list-item-title>
                </v-list-item-content>                
            </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
            <v-select
                label="Forma de pagamento"
                hide-details="auto"
                v-model='payment.method'
                :items="paymentMethods"
                @input="changeIcon(payment.method)"
                :prepend-icon='payIcon'
                class='pa-2'>
            </v-select>
            <money
                label="Valor(R$)"   
                v-model="payment.valor"
                v-bind="money"
                :rules="rules.forma"
                class='pa-2'>
            </money>
            </v-list>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text
                @click="menu = false"
            >
                Cancelar
            </v-btn>
            <v-btn
                color="var(--primary)"
                text
                @click="newPayment(payment)"
            >
                salvar
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
        <!--  -->
        </v-card-title>
        <v-data-table 
            :headers="header" 
            :items="pagamentos"
            hide-default-footer
            hide-default-header
            @click:row="editPay"
            style="max-height: 49vh;min-height: 49vh; "
        >
            <template v-slot:item="row">
                <tr>
                    <td><v-icon size="15" color="blue" @click="editPay(row.item)" >fa fa-pencil</v-icon></td>
                    <td><v-icon>{{row.item.icon}}</v-icon></td>
                    <td>{{row.item.method}}</td>
                    <td>{{valueFormat(row.item.valor)}}</td>
                    <td><v-icon size="15" color="red" @click="removePay(row.item)" >fa fa-xmark</v-icon></td>
                </tr>
            </template>
        </v-data-table>
        <v-row no-gutters dense>
                <v-card-subtitle >
                    <v-icon size='15' class='pa-1' color="var(--primary)">fa fa-equals</v-icon>
                    Total Produtos 
                    <br>{{valueFormat(valorProdutos)}}
                </v-card-subtitle>
                <v-spacer></v-spacer>
                <v-card-subtitle>
                    <v-icon size='15' class='pa-1' color="var(--primary)">fa fa-equals</v-icon>
                    Total Pagamentos 
                    <br>{{valueFormat(valorPagamentos)}}
                </v-card-subtitle>                
            </v-row>
    </v-card>
</template>

<script>
import {Money} from 'v-money'

export default {
    name:'PagamentoCard',
    computed:{
        pagamentos(){
            return this.$store.state.caixa.pagamentos
        },
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
    data:()=>{
        return{
            header:[
                {
                    text: '',
                    align: 'start',
                    sortable: false,
                    value: 'icon',
                },
                { text: 'forma pgto.', value: 'method' },
                { text: 'valor(R$)', value: 'valor' },
            ],

            rules: {
                value: [
                    val => (val || '').length > 0 || 'necessário informar o methodo!'
                ],
                method: [
                    val => (val || '').length > 0 || 'necessário informar o methodo!'
                        ],
                },
            menu:false,
            paymentMethods:['Dinheiro','Cartão Crédito à Vista','Cartão Crédito à parcelado','Cartão Débito','Pix','Crédito Funcionário'],
            payment:{
                method:'',
                datePay:'',
                valor:0.00,
                icon:'',
                },
            payIcon:'fa fa-ban',
            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false
            }
        }
    },
    methods:{
        newPayment(payment){
            payment.datePay = new Date().toLocaleDateString()
            this.$store.dispatch('addPayment',payment)
            this.payment = {
                method:'',
                valor:0.00,
                icon:''
            }
            this.menu = false;
        },
        changeIcon(method){
            const icons= [
                {method:"Dinheiro",icon:'fa-solid fa-money-bill'},
                {method:"Cartão Crédito à Vista",icon:'fa-solid fa-credit-card'},
                {method:"Cartão Crédito à parcelado",icon:'fa-solid fa-money-check'},
                {method:"Cartão Débito",icon:'fa-solid fa-money-check-dollar'},
                {method:"Pix",icon:'fa-brands fa-pix'},
                {method:"Crédito Funcionário",icon:'fa-solid fa-id-card'}
            ]
            var icon = icons.find(x => x.method === method).icon
            this.payment.icon = icon
           this.payIcon = icon
        },
        editPay(editPayment){
            this.payment = editPayment
            this.menu = true
        },
        removePay(rowItem){
            this.$store.dispatch('removePayment',rowItem)
            console.log(rowItem)
        },
        valueFormat(value){
            return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        }
    },
    components: {
        Money,
    },
}
</script>

<style>

</style>