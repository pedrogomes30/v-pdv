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
                v-model='onPayment.method'
                item-text="method_alias"
                item-value="method_alias"
                :items="payment_method"
                color="var(--primary)"
                @input="changeIcon(onPayment.method)"
                :prepend-icon='payIcon'
                class='pa-2'>
            </v-select>
            <h5 class='pl-3'>
                <v-icon  size='20'> fa fa-dollar-sign</v-icon>
                Valor:
                <Money
                    label="Valor(R$)"   
                    v-model="onPayment.valor"
                    v-bind="money"
                    :rules="rules.value"
                    @focus="onPayment.valor = 0"
                    color="var(--primary)"
                    class='pl-2 pr-2'>
                </Money>
            </h5>
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
                @click="newPayment(onPayment)"
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
            :items="Payments"
            hide-default-footer
            hide-default-header
            @click:row="editPay"
            id="scroll-onPayment"
            style="height: 25vh;padding-left:3px;padding-right:3px "
            class="overflow-y-auto"
        >
            <template v-slot:item="row">
                <tr>
                    <td><v-icon size="15" color="blue" @click="editPay(row.item)" >fa fa-pencil</v-icon></td>
                    <td><v-icon :color='red'>{{row.item.icon}}</v-icon></td>
                    <td>{{row.item.method}}</td>
                    <td>{{valueFormat(row.item.valor)}}</td>
                    <td><v-icon size="15" color="red" @click="removePay(row.item)" >fa fa-xmark</v-icon></td>
                </tr>
            </template>
        </v-data-table>
        
    </v-card>
</template>

<script>
import {Money} from 'v-money'

export default {
    name:'PagamentoCard',
    computed:{
        Payments(){
            return this.$store.state.cashierStore.payments
        },
        payment_method(){
            return this.$store.state.auth.cashier_session.payment_methods
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
                    val => (val || '' || val <= 0 ).length > 0 || 'necessário informar o valor!!'
                ],
                method: [
                    val => (val || '').length > 0 || 'necessário informar o methodo!'
                        ],
                },
            menu:false,
            paymentMethods:['Dinheiro','Cartão Crédito à Vista','Cartão Crédito à parcelado','Cartão Débito','Pix','Crédito Funcionário'],
            onPayment:{
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
            },
        }
    },
    methods:{
        newPayment(onPayment){
            console.log(onPayment.valor)
            if(onPayment.valor > 0 && onPayment.valor <= 10000){
                onPayment.datePay = new Date().toLocaleDateString()
                this.$store.dispatch('addPayment',onPayment)
                this.onPayment = {
                    method:'',
                    valor:0.00,
                    icon:''
                }
                this.menu = false;
            }else{
                alert('Pagamento inválido!')
                this.onPayment = {
                    method:'',
                    valor:0.00,
                    icon:''
                }
            }
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
            this.onPayment.icon = icon
           this.payIcon = icon
        },
        editPay(editPayment){
            this.onPayment = editPayment
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