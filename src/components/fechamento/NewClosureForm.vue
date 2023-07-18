<template>
  <v-dialog
    transition="dialog-top-transition"
    max-width="1000"
    v-model="active"
    >
      <template v-slot:activator="{ on, attrs }">
          <v-btn 
          color='green' 
          dark
          v-bind="attrs"
          v-on="on"
          class='ma-3 pa-3'
          rounded
          fab
          title='Realizar novo fechamento de caixa'
          >
            <v-icon size="35" >fa-solid fa-check</v-icon>
          </v-btn>
      </template>
      <template>  
        <LoadComponent :overlay="loading" />
        <v-stepper v-model="e6" vertical >
          <v-list-item-subtitle class="text-h4 d-flex justify-center align-center pa-4">
            <v-icon size="40" class='pr-5' color="var(--primary)"  title="Fechamento não verificado"> mdi-cart-check</v-icon>
            <b>Novo Fechamento</b>
          </v-list-item-subtitle >
          <v-divider class="mr-3 ml-3"></v-divider>
          <!-- default -->
          <div v-for="(method, mkey) in payments" :key='mkey'>
            <v-stepper-step :complete="e6 > mkey" :step='mkey' @click="e6 = mkey" color="var(--primary)" class="d-flex justify-center">
                <h4>{{method.method_alias}}<h4 class="text-right"> {{valueFormat(closure_cache[method.method_alias])}}</h4></h4>
            </v-stepper-step>
            <v-stepper-content :step="mkey">
              <v-card color="var(--backgroundLight)" class="mb-12 d-flex justify-center flex-column" height="150px" >
                <v-list-item-subtitle class="text-h4 d-flex justify-center align-center">
                  <v-icon size="40" class="ma-3" color="var(--primary)" > {{getPaymentIcon(method.method_alias)}}</v-icon>
                  {{method.method_alias}}
                </v-list-item-subtitle >
                <v-currency-field 
                  label="valor" 
                  autofocus
                  clearable
                  prefix='R$'
                  color="var(--primary)"
                  class='pr-2 pl-4'
                  prepend-icon='fa fa-dollar-sign'
                  rule="value"
                  v-model="closure_cache[method.method_alias]"
                  v-on:keyup.native.enter="stepCalculate()"
                  v-on:keyup.native.tab="stepCalculate()"
                  />
              </v-card>
              <v-btn color="var(--primary)" dark @click="stepCalculate(method,e6,mkey)">Próximo</v-btn>
              <v-btn text>Cancel</v-btn>
            </v-stepper-content>
          </div>
            <v-text-field
              :autofocus="e6 == steps"
              label="observação:"
              hide-details="auto"
              v-model="closure_cache['obs']"
              class='pa-2'
              color="var(--primary)"
              prepend-icon='fa fa-note-sticky'
              v-on:keyup.native.enter="stepCalculate()">                
            </v-text-field>
          <div class="d-flex flex-row-reverse pr-5" v-if="finished">
            <v-btn color="green" dark @click="createClosure()">Finalizar<v-icon size="25" class="pl-5">fa-solid fa-check</v-icon> </v-btn>
            <v-btn text @click="active=!active">Cancel</v-btn>     
          </div>
        </v-stepper>   
      </template>
    </v-dialog>
</template>

<script>
import { format } from 'date-fns'
import {saveClosure} from '../../services/api/closureApi'
import LoadComponent from '../SysComponents/LoadComponent.vue'
export default {
    name: "NewClosureForm",
    computed: {
        methods_computed() {
            return this.$store.state.auth.cashier_session.payment_methods;
        },
        cashier_session() {
            return this.$store.state.auth.cashier_session;
        }
    },
    data: () => ({
        number: "",
        loading: false,
        active: false,
        finished: false,
        closure_cache: [],
        payments: [],
        e6: 0,
        steps: 0,
        rules: {
            value: [
                val => (val || "" || val <= 0).length > 0 || "necessário informar o valor!!"
            ],
        },
        icons: [
            { method: "Dinheiro", icon: "fa-solid fa-money-bill" },
            { method: "Cartão De Credito a Vista", icon: "fa-solid fa-credit-card" },
            { method: "Cartão De Crédito Prazo", icon: "fa-solid fa-money-check" },
            { method: "Cartão De Débito", icon: "fa-solid fa-money-check-dollar" },
            { method: "Crédito Loja", icon: "fa-solid fa-building-columns" },
            { method: "Carteira Digital", icon: "fa-solid fa-wallet" },
            { method: "cashback", icon: "fa-solid fa-rotate-left" },
            { method: "Pix", icon: "fa-brands fa-pix" },
            { method: "Crédito Funcionário", icon: "fa-solid fa-user-tag" }
        ],
    }),
    methods: {
        valueFormat(value) {
            if (typeof (value) === "number")
                return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
        },
        getPaymentIcon(payment) {
            let exists = this.icons.findIndex(x => x.method === payment.trim());
            if (exists !== -1) {
              return this.icons[exists].icon;
            }
            return "fa fa-triangle-exclamation";
        },
        stepCalculate() {
            this.e6++;
            if (this.e6 === this.steps)
                this.finished = true;
            if (this.e6 > this.steps)
                this.createClosure();
        },
        getPaymentByAlias(alias) {
            let exists = this.payments.findIndex(x => x.method_alias === alias);
            if (exists !== -1) {
                return this.payments[exists];
            }
            return false;
        },
        async createClosure() {
            this.loading = true;
            var obs = typeof (this.closure_cache["obs"]) === "undefined" ? "" : this.closure_cache["obs"];
            var closure = {
                closure_type: false,
                ref_date: format(new Date(), "yyyy-MM-dd"),
                cashier: this.cashier_session.cashier_id,
                store: this.cashier_session.store.store_id,
                obs: obs
            };
            delete this.closure_cache["obs"]; //delete obs for enable payments foreach
            var closure_payment_method_array = [];
            for (const payment in this.closure_cache) {
                closure_payment_method_array.push({
                    payment_method: this.getPaymentByAlias(payment).method_id,
                    value: this.closure_cache[payment],
                    quantity: 0
                });
            }
            closure.closure_payment_method = closure_payment_method_array;
            await saveClosure(closure);
            this.active = false;
            this.loading = false;
        },
        findRemovePayment(index) {
            let exists = this.payments.findIndex(x => x.method_id === index);
            if (exists !== -1) {
                this.payments.splice(exists, 1);
            }
        },
    },
    beforeMount() {
        this.loading = true;
        var id_payment_remove = [7, 5]; //payment id that tha cashier cant report, ex: mixed payment sale, store employee sale
        this.payments = Object.assign(this.methods_computed);
        id_payment_remove.forEach(toremove => { this.findRemovePayment(toremove); });
        this.e6 = 0;
        this.closure_cache = [];
        this.steps = this.payments.length;
        this.loading = false;
    },
    components: { LoadComponent }
}
</script>

<style>

</style>