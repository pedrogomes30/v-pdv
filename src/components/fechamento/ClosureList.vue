<template>
    <v-row  class="pt-5"  no-gutters dense >
        <LoadComponent :overlay="loading" />
        <v-sheet
            class="mx-auto"
            height="100%"
            width="100%"
            min-width="100%"
            dark
            style="background:none"
        >
            <v-slide-group
            v-model="model"
            center-active
            show-arrows
            >
            <v-slide-item
                v-for="(data, day) in closures"
                color="white"
                :key="day"
                v-slot="{toggle}"
            >
                <v-card
                class="ma-1"
                height="650"
                width="400"
                min-height="650"
                light
                @click="toggle"
                >
                <div style="width:100%;background:var(--primary);">
                    <v-list-item-content class="mb-2">
                        <v-list-item-title  class="text-h5 white--text d-flex justify-center align-center">
                            <v-btn color="white" fab small class='mr-3' elevation="0">
                                <v-icon size="30" color="var(--primary)" >fa-regular fa-calendar-days</v-icon>
                            </v-btn>
                            {{convertDate(day)}}
                            <v-btn color="white" fab small x-small class='ml-3' elevation="0" v-if="!data.verify">
                                <v-icon size="25" color="red" title="Fechamento não verificado" > fa fa-ban</v-icon>
                            </v-btn>
                            <v-btn color="white" fab small x-small class='ml-3' elevation="0" v-else>
                                <v-icon size="25"  color="green" title="Fechamento Verificado" > fa fa-check</v-icon>
                            </v-btn>
                        </v-list-item-title>
                    </v-list-item-content>
                    <!-- tabs -->
                    <v-tabs 
                        class="d-flex justify-center" 
                        background-color="var(--primary)" 
                        color="white"
                        v-model="tab[day]"
                        >
                        <v-tab>Total</v-tab>
                        <v-tab>Por Caixa</v-tab>
                        <v-tab>Sangrias</v-tab>
                    </v-tabs>
                </div>
                    <v-tabs-items v-model="tab[day]" height='100%' width='100%'>
                        <!-- TOTAL -->
                        <v-tab-item>
                            <v-divider></v-divider>
                            <div class="d-flex flex-row align-center px-2 ">
                                <v-list-item-title>Forma Pgto.</v-list-item-title>
                                <v-list-item-title class="text-center">Informado</v-list-item-title>
                                <v-list-item-title class="text-right" v-if='data.verify'>Calculado</v-list-item-title>
                            </div>
                            <v-divider></v-divider>
                            <v-list class="transparent overflow-y-auto px-2" >
                                <div v-for="(total,id_total) in data.totals" :key="id_total" class="d-flex flex-row align-center"  :title='id_total'>
                                    <v-list-item-icon><v-icon>{{getPaymentIcon(id_total)}}</v-icon></v-list-item-icon>
                                    <v-list-item-title>{{ id_total }}</v-list-item-title>
                                    <v-list-item-title class="text-center "><b>{{ valueFormat(total.reported)}}</b></v-list-item-title>
                                    <v-list-item-title class="text-right " v-if='data.verify'><b>{{ valueFormat(total.calculated)}}</b></v-list-item-title>
                                </div>
                            </v-list>
                            </v-tab-item>
                            <!-- PER CASHIER -->
                            <v-tab-item>
                                <v-carousel show-arrows-on-hover hide-delimiter-background hide-delimiters  >
                                    <template v-slot:prev="{ on, attrs }">
                                    <v-btn
                                        color="var(--primary)"
                                        v-bind="attrs"
                                        v-on="on"
                                        fab
                                        small
                                        title='caixa anterior'
                                    ><v-icon>fa-solid fa-chevron-left</v-icon></v-btn>
                                    </template>
                                    <template v-slot:next="{ on, attrs }">
                                    <v-btn
                                        color="var(--primary)"
                                        v-bind="attrs"
                                        v-on="on"
                                        fab
                                        small
                                        title='proximo caixa'
                                    ><v-icon>fa-solid fa-chevron-right</v-icon></v-btn>
                                    </template>
                                    <v-carousel-item v-for="(closure, c_key) in data.closures" :key='c_key'  >
                                        <v-list-item class=" d-flex justify:center align-center">
                                            <!-- switch card values -->
                                            <v-list-item-subtitle class="text-h5 d-flex justify-center align-center ">
                                                <div class=" d-flex justify:center align-center ">
                                                    {{closure.cashier_name}}
                                                    <v-icon size="15" class="ml-1" color="red" title="Fechamento não verificado" v-if="!closure.verify"> fa fa-ban</v-icon>
                                                    <v-icon size="15" class="ml-3" color="green" title="Fechamento Verificado" v-else> fa fa-check</v-icon>
                                                </div>
                                            </v-list-item-subtitle >
                                        </v-list-item>
                                        <br><h6 class="d-flex flex-row-reverse pr-2">por: {{closure.user_name}}</h6>
                                        <v-list class="transparent overflow-y-auto mg-0 pa-0" >
                                            <div class="d-flex flex-row align-center px-2">
                                                <v-list-item-title>Forma Pgto.</v-list-item-title>
                                                <v-list-item-title class="text-center">Informado</v-list-item-title>
                                                <v-list-item-title class="text-right" v-if="closure.verify">Calculado</v-list-item-title>
                                            </div>
                                            <v-divider></v-divider>
                                            <div v-for="(payment,p_key) in closure.closure_payment_method" :key="p_key" class="d-flex flex-row align-center px-2" :title='payment.payment_alias'>
                                                <!-- <h6>{{payment}}</h6> -->
                                                <v-list-item-icon><v-icon :title='`Forma de Pagamento ${payment.payment_alias}`'>{{getPaymentIcon(payment.payment_alias)}}</v-icon></v-list-item-icon>
                                                <v-list-item-title>{{ payment.payment_alias }}</v-list-item-title>
                                                <v-list-item-subtitle class="text-center"><b>{{ valueFormat(payment.reported_value)}}</b></v-list-item-subtitle>
                                                <v-list-item-subtitle class="text-right" v-if="closure.verify">{{ valueFormat(payment.calculated_value)}}</v-list-item-subtitle>
                                            </div>
                                            <v-divider ></v-divider>
                                            <h6 class="d-flex justify-left align-center" v-if="closure.obs">
                                                <v-icon size="20" class="ma-3" color="var(--primary)"  title="Fechamento não verificado"> fa fa-note-sticky</v-icon>
                                                Observação:<br>{{obsListener(closure.obs)}}
                                            </h6 >
                                            

                                        </v-list>
                                    </v-carousel-item>
                                </v-carousel>
                            </v-tab-item>
                            <!-- WITHDRAWALS -->
                            <v-tab-item>
                                <v-list class=" overflow-y-auto mg-0 pa-0 " >
                                    <div class="d-flex flex-row align-center px-2">
                                        <v-list-item-title class="text-left">Conta</v-list-item-title>
                                        <v-list-item-title class="text-right">Valor</v-list-item-title>
                                    </div>
                                    <v-divider></v-divider>
                                    <div v-for="(withdrawal,w_key) in data.withdrawal" :key="w_key" class="d-flex flex-row align-center px-2" :title="withdrawal.withdrawal_account.withdrawal_description" >
                                        <v-list-item-icon><v-icon color="red" title='apagar sangria' @click='removeWithdrawal(withdrawal)' >fa-solid fa-xmark</v-icon></v-list-item-icon>
                                        <v-list-item-icon><v-icon >fa fa-receipt</v-icon></v-list-item-icon>
                                        <v-list-item-title>{{ withdrawal.withdrawal_account.withdrawal_number }}<br>{{ withdrawal.withdrawal_account.withdrawal_name }}</v-list-item-title>
                                        <v-list-item-subtitle class="text-right"><b>{{ valueFormat(withdrawal.value)}}</b></v-list-item-subtitle>                                
                                    </div>
                                </v-list>     
                            </v-tab-item>
                    </v-tabs-items>
                <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                >
                </v-row>
                </v-card>
            </v-slide-item>
            </v-slide-group>
        </v-sheet>
    </v-row>
    
</template>

<script>
import { format } from 'date-fns';
import {getClosure} from '../../services/api/closureApi';
import {deleteWithdrawal} from '../../services/api/withdrawalApi';
import LoadComponent from '../SysComponents/LoadComponent.vue';
import alert from '@/services/errorHandler';

  export default {
    name: 'ClosureList',
    computed:{
        is_manager(){
        return this.$store.state.auth.cashier_session.is_manager
        },  
    },
    data () {
      return {
        loading : false,
        closures:[],
        tab:[],
        refDate:null,
        check_cashier:false,
        error:false,
        obs:'',
        model:null,
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
      }
    },
    methods: {
        async updateClosure(){
            this.loading      = true
            var callClosure   = await getClosure()
            if(typeof(callClosure)=== 'string')   
                alert('error',callClosure)
            else
                this.closures     = callClosure.data

            this.loading      = false
        },
        setDate(day){
            this.refDate = day
        },
        getStore(data){
          return data.closures[0].store
        },
        getCashier(data){
          return data.closures[0].cashier
        },
        obsListener(obs){
            
            return obs
        },
        convertDate(date){
            date    = date +' 12:00'
            return  format(new Date(date), "dd/MM/yyyy")
        },
        valueFormat(value){
            if(typeof(value) === 'number')
                return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        },
        removeWithdrawal(withdrawal){
            let exists = this.closures[withdrawal.ref_date].withdrawal.findIndex(x => x.id === withdrawal.id);
            if(exists !== -1){
                var deleted = deleteWithdrawal(withdrawal.id)
                if(deleted)
                return this.closures[withdrawal.ref_date].withdrawal.splice(exists,1);
            }else{
                console.log('methodo não encontrado')
            }
            console.log(this.closures[withdrawal.ref_date].withdrawal,withdrawal)
        },
        getPaymentIcon(payment){
          let exists = this.icons.findIndex(x => x.method === payment.trim());
          if(exists !== -1){
              return this.icons[exists].icon
          }else{
              console.log('methodo não encontrado')
          }
        },
        focus(){
            console.log(this.updateClosure())
        }
    },
    async beforeMount() {
      await this.updateClosure();
    },
    components:{
    LoadComponent
}
}
</script>

<style>
    .set_closure{
        border-radius: 8px;
        background: white;
    }
    
</style>