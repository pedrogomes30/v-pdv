<template>
    <div height='100%' class="d-flex flex-column align-center justify-center">
        <!--  -->
        <v-data-table 
        :headers="header" 
        :items="payments"
        hide-default-footer
        hide-default-header
        @click:row="editPay"
        id="scroll-onPayment"
        style="height: 29vh;width: 100%;padding-left:3px;padding-right:3px;"
        class="overflow-y-auto"
        >
            <template v-slot:item="row">
                <tr>
                    <td><v-icon size="15" color="blue" @click="editPay(row.item)" >fa fa-pencil</v-icon></td>
                    <td><v-icon >{{changeList(row.item.method_alias)}}</v-icon></td>
                    <td>{{row.item.method_alias}}</td>
                    <td>{{valueFormat(row.item.method_value)}}</td>
                    <td><v-icon size="15" color="red" @click="removePay(row.item)" >fa fa-xmark</v-icon></td>
                </tr>
            </template>
        </v-data-table>
        <v-divider></v-divider>
    <v-row style="width:100%" class='px-3 pt-1'>
        <v-select
            label="Forma de pagamento"
            hide-details="auto"
            v-model='onPayment.method_alias'
            item-text="method_alias"
            item-value="method_alias"
            :items="payment_method"
            style="max-width:45%"
            class="mr-3"
            color="var(--primary)"
            autofocus
            @input="changeIconSelect(onPayment.method_alias,true)"
            :prepend-icon='payIcon'>
        </v-select>
        <v-currency-field 
        label="valor" 
        clearable
        prefix='R$'
        color="var(--primary)"
        style="max-width:40%;color:var(--primary)"
        prepend-icon='fa fa-dollar-sign'
        @keyup.native.enter="newPayment(onPayment)"
        v-model="onPayment.method_value"/>
        <v-btn
            color="green"
            width="10%"
            class='ml-3 mt-3'
            @click="newPayment(onPayment)"
        ><v-icon color="white">fa fa-plus</v-icon>
        </v-btn>
    </v-row>
</div>
</template>

<script>
    // import {Money} from 'v-money'

export default {
    name:'PagamentoCard',
    computed:{
        payments(){
            return this.$store.state.cashierStore.payments
        },
        payment_method(){
            return this.$store.state.auth.cashier_session.payment_methods
        },
    },
    data:()=>{
        return{
            icons: [
                {method:"Dinheiro",                 icon:'fa-solid fa-money-bill'},
                {method:"Cartão De Credito a Vista",icon:'fa-solid fa-credit-card'},
                {method:"Cartão De Crédito Prazo",  icon:'fa-solid fa-money-check'},
                {method:"Cartão De Débito",         icon:'fa-solid fa-money-check-dollar'},
                {method:"Crédito Loja",             icon:'fa-solid fa-building-columns'},
                {method:"Carteira Digital",         icon:'fa-solid fa-wallet'},
                {method:"cashback",                 icon:'fa-solid fa-rotate-left'},
                {method:"Pix",                      icon:'fa-brands fa-pix'},
                {method:"Crédito Funcionário",      icon:'fa-solid fa-user-tag'}
            ],
            header:[
                {
                    text: '',
                    align: 'start',
                    sortable: false,
                    value: 'method_icon',
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
            onPayment:{
                    method_id:'',
                    method_description:'',
                    method_alias:'',
                    method_issue:0,
                    method_date:'',
                    method_value:0.00,
                    method_icon:'',
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
            if(onPayment.method_value >= 0 && onPayment.method_value <= 10000){
                var value   = onPayment.method_value
                let exists  = this.payment_method.findIndex(x => x.method_alias === onPayment.method_alias);
                if(exists !== -1){
                    onPayment               = this.payment_method[exists]
                    onPayment.method_value  = value;
                    onPayment.method_date   = new Date().toLocaleDateString()
                    this.$store.dispatch('addPayment',onPayment)
                    this.onPayment = {
                        method_id:'',
                        method_description:'',
                        method_alias:'',
                        method_issue:0,
                        method_date:'',
                        method_value:0.00,
                        method_icon:'',
                    }
                    this.menu = false;
                }else{
                    console.log('methodo não encontrado')
                }
            }else{
                alert('Pagamento inválido!')
                this.onPayment = {
                    method_id:'',
                    method_description:'',
                    method_alias:'',
                    method_issue:0,
                    method_date:'',
                    method_value:0.00,
                    method_icon:'',
                }
            }
        },
        changeIconSelect(method){
            //iconChange
            let exists = this.icons.findIndex(x => x.method === method.trim());
            //icone
            if(exists !== -1){
                this.onPayment.method_icon = this.icons[exists].icon
                this.payIcon = this.icons[exists].icon
            }else{
                console.log('methodo não encontrado')
            }
            //reset payment to edit
            let edit = this.payments.findIndex(x => x.method_alias === method);
            if(edit !== -1){
                this.onPayment = Object.assign({}, this.payments[edit]) 
            }else{
                this.onPayment.method_value = 0.00
            }            
        },
        changeList(method){
            let exists = this.icons.findIndex(x => x.method === method.trim());
            var result = ''
            if(exists !== -1){
                result = this.icons[exists].icon
            }else{
                console.log('methodo não encontrado')
            }
            return result
        },
        editPay(editPayment){
            this.onPayment = editPayment
            this.menu = true
        },
        removePay(rowItem){
            this.$store.dispatch('removePayment',rowItem)
        },
        valueFormat(value){
            return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        },
    },
    components: {
        // Money,
    },
}
</script>

<style>

</style>