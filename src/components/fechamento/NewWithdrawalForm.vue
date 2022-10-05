<template>
  <v-dialog
    transition="dialog-top-transition"
    max-width="800"
    v-model="active"
    >
      <template v-slot:activator="{ on, attrs }">
          <v-btn 
          color='red' 
          dark
          v-bind="attrs"
          v-on="on"
          class='ma-3 pa-3'
          fab
          title="salvar uma nova sangria"
          >
              <v-icon size="35" class="">fa-solid fa-money-bill-transfer</v-icon>
          </v-btn>
      </template>
      <template>  
        <v-card>
          <v-list-item-subtitle class="text-h4 d-flex justify-center align-center pa-4">
            <v-icon size="40"  color="var(--primary)"  title="Fechamento não verificado" class='pr-5'> fa-solid fa-money-bill-transfer</v-icon>
            <b>Nova Sangria de Caixa</b>
          </v-list-item-subtitle >
          <v-divider class="mr-3 ml-3"></v-divider>
          <div class="pa-6">
            <v-select
              label="Motivo da sangria"
              autofocus
              hide-details="auto"
              item-text="name"
              item-value="id"
              color="var(--primary)"
              v-model='account'
              :items="accounts"
              :hint="hint"
              prepend-icon='fa fa-table-list'
              class='pa-2'
              :rules="rules.account"
              persistent-hint
              @change='changeAccount()'
            />
            <v-currency-field 
              label="valor" 
              clearable
              prefix='R$'
              id="price"
              color="var(--primary)"
              class='pr-2 pl-1'
              text-color="var(--primary)"
              prepend-icon='fa fa-dollar-sign'
              v-model="withdrawal_cache['value']"
            />
            <v-text-field
              label="Observação"
              hide-details="auto"
              v-model="withdrawal_cache['obs']"
              class='pa-2'
              color="var(--primary)"
              prepend-icon='fa fa-note-sticky'>                
            </v-text-field>
          </div>
          <div class="d-flex flex-row-reverse pa-5" >
            <v-btn color="green" dark @click="createWithdrawal()">Finalizar<v-icon size="25" class="pl-5">fa-solid fa-check</v-icon> </v-btn>
            <v-btn text @click="active=!active">Cancel</v-btn>     
          </div>
        </v-card>
      </template>
    </v-dialog>
</template>

<script>
import { format } from 'date-fns'
import {getWithdrawalAccount, saveWithdrawal} from '../../services/api/withdrawalApi'
export default {
    name:'NewWithdrawalForm',
    computed:{
      methods(){
        return this.$store.state.auth.cashier_session.payment_methods
      },
      cashier_session(){
        return this.$store.state.auth.cashier_session
      },
      
    },
    data:()=>({    
        number: '',
        loading: false,
        active: false,
        accounts:[],
        hint:'',
        account:[],
        withdrawal_cache:[],
        rules: {
          value: [
              val => (val || '' || val <= 0 || typeof(val)==='undefined').length > 0 || 'necessário informar o valor!!'
          ],
          account: [
              val => (val || '' || val <= 0 ).length > 0 || 'necessário informar a conta!'
          ],
        },
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
    }),
    methods:{
      validLabel(){
        console.log(this.withdrawal_cache['value'])
      },
      valueFormat(value=false){
        if(typeof(value) === 'number')
          return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
      },  
      changeAccount(){
        let exists = this.accounts.findIndex(x => x.id === this.account);
        if(exists !== -1){
          this.withdrawal_cache['account'] = this.accounts[exists]
          this.hint = `${this.withdrawal_cache['account']['number']} - ${this.withdrawal_cache['account']['name']} -> ${this.withdrawal_cache['account']['description']}`
        }
        return "fa fa-triangle-exclamation"
      },
      getMethodId(method){
        let exists = this.methods.findIndex(x => x.method_alias === method);
        if(exists !== -1){
          return this.methods[exists].method_id
        }
      },
      createWithdrawal(){
        var withdrawal = {
          id:'',
          ref_date: format(new Date(), "yyyy-MM-dd"),
          value: this.withdrawal_cache.value,
          obs: typeof(this.withdrawal_cache.obs) === 'undefined' ? '' : this.withdrawal_cache.obs,
          cashier: this.cashier_session.cashier_id,
          store:this.cashier_session.store.store_id,
          payment_method: this.getMethodId('Dinheiro'),
          withdrawal_account:this.withdrawal_cache['account']['id'],
          user:this.cashier_session.user_id
        }
        saveWithdrawal(withdrawal)
        this.withdrawal_cache = []
        this.active = false
      }           
    },
      async beforeMount() {
        this.loading = true
        this.accounts = await getWithdrawalAccount();
        this.loading = false
      },
}
</script>

<style>
  #price {
      color:var(--primary);
  }
</style>