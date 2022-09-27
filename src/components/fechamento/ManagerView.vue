<template>
    <v-row  style="height:100%" no-gutters dense>
        <v-carousel height="93%" hide-delimiter-background show-arrows-on-hover >
            <template v-slot:prev="{ on, attrs }" >
            <v-btn
                color="var(--primary)"
                v-bind="attrs"
                v-on="on"
                rounded
                title='dia de fechamento anterior'
            ><v-icon>fa-solid fa-angles-left</v-icon></v-btn>
            </template>
            <template v-slot:next="{ on, attrs }">
            <v-btn
                color="var(--primary)"
                v-bind="attrs"
                v-on="on"
                rounded
                title='próximo dia de fechamento'
            ><v-icon>fa-solid fa-angles-right</v-icon></v-btn>
            </template>
            <v-carousel-item v-for="(data, day) in closures" :key='day'  >
                <!-- switch card title -->
                <v-list-item >
                    <v-list-item-content class="mb-2">
                    <v-list-item-title  class="text-h4 white--text d-flex justify-center align-center">
                        <v-btn fab class='mr-3'>
                            <v-icon size="35" color="var(--primary)" >fa-regular fa-calendar-days</v-icon>
                        </v-btn>
                        {{convertDate(day)}}
                    </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-row   >
                    <v-col cols="3.4" class='set_closure  ml-3'>
                        <v-list-item class=" d-flex justify-center align-center ">
                            <!-- switch card values -->
                            <v-list-item-subtitle class="text-h5 d-flex justify-center align-center">
                                <div v-if="is_manager" class="d-flex flex-column mb-2"><v-icon size="35" class="ma-3" color="var(--primary)" title="Fechamento não verificado">fa fa-shop</v-icon> Fechamento total da loja</div>
                                <div v-else class="d-flex flex-column mb-2"><v-icon size="35" class="ma-3" color="var(--primary)" title="Fechamento não verificado">fa fa-shop</v-icon> Seu total neste dia</div>
                            </v-list-item-subtitle >
                        </v-list-item>
                        <v-divider></v-divider>
                        <div class="d-flex flex-row align-center">
                            <v-list-item-title>Forma Pagamento</v-list-item-title>
                            <v-list-item-title class="text-center">Valor informado</v-list-item-title>
                            <v-list-item-title class="text-right" v-if='data.verify'>Valor calculado</v-list-item-title>
                        </div>
                        <v-divider></v-divider>
                        <v-list class="transparent overflow-y-auto" >
                            <div v-for="(total,id_total) in data.totals" :key="id_total" class="d-flex flex-row align-center"  :title='id_total'>
                                <v-list-item-icon><v-icon>{{getPaymentIcon(id_total)}}</v-icon></v-list-item-icon>
                                <v-list-item-title>{{ id_total }}</v-list-item-title>
                                <v-list-item-title class="text-center "><b>{{ valueFormat(total.reported)}}</b></v-list-item-title>
                                <v-list-item-title class="text-right " v-if='data.verify'><b>{{ valueFormat(total.calculated)}}</b></v-list-item-title>
                            </div>
                        </v-list>
                    </v-col>
                    <v-col cols="4" class='set_closure ml-1 mr-1'>
                        <v-carousel show-arrows-on-hover  >
                            <template v-slot:prev="{ on, attrs }">
                            <v-btn
                                color="var(--primary)"
                                v-bind="attrs"
                                v-on="on"
                                rounded
                                title='caixa anterior'
                            ><v-icon>fa-solid fa-chevron-left</v-icon></v-btn>
                            </template>
                            <template v-slot:next="{ on, attrs }">
                            <v-btn
                                color="var(--primary)"
                                v-bind="attrs"
                                v-on="on"
                                rounded
                                title='proximo caixa'
                            ><v-icon>fa-solid fa-chevron-right</v-icon></v-btn>
                            </template>
                            <v-carousel-item v-for="(closure, c_key) in data.closures" :key='c_key'  >
                                <v-list-item class=" d-flex justify:center align-center ">
                                    <!-- switch card values -->
                                    <v-list-item-subtitle class="text-h5 d-flex justify-center align-center">
                                        <div class="d-flex flex-column mb-2 justify:center align-center">
                                            <v-icon size="35" class="ma-3" color="var(--primary)"  title="Fechamento não verificado"> fa fa-cash-register</v-icon>
                                            <div class=" d-flex justify:center align-center ">
                                                {{closure.cashier.cashier_name}}
                                                <v-icon size="15" class="ml-1" color="red" title="Fechamento não verificado" v-if="!closure.verify"> fa fa-ban</v-icon>
                                                <v-icon size="15" class="ml-3" color="green" title="Fechamento Verificado" v-else> fa fa-check</v-icon>
                                            </div>
                                        </div>
                                    </v-list-item-subtitle >
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list class="transparent overflow-y-auto mg-0 pa-0" >
                                    <div class="d-flex flex-row align-center">
                                        <v-list-item-title>Forma Pagamento</v-list-item-title>
                                        <v-list-item-title class="text-center">Valor informado</v-list-item-title>
                                        <v-list-item-title class="text-right" v-if="closure.verify">Valor calculado</v-list-item-title>
                                    </div>
                                    <v-divider></v-divider>
                                    <div v-for="(payment,p_key) in closure.closure_payment_method" :key="p_key" class="d-flex flex-row align-center" :title='payment.payment_alias'>
                                        <!-- <h6>{{payment}}</h6> -->
                                        <v-list-item-icon><v-icon :title='`Forma de Pagamento ${payment.payment_alias}`'>{{getPaymentIcon(payment.payment_alias)}}</v-icon></v-list-item-icon>
                                        <v-list-item-title>{{ payment.payment_alias }}</v-list-item-title>
                                        <v-list-item-subtitle class="text-center"><b>{{ valueFormat(payment.reported_value)}}</b></v-list-item-subtitle>
                                        <v-list-item-subtitle class="text-right" v-if="closure.verify">{{ valueFormat(payment.calculated_value)}}</v-list-item-subtitle>
                                    </div>
                                    <v-divider ></v-divider>
                                    <v-list-item-subtitle class="text-h6 d-flex justify-left align-center" v-if="closure.obs">
                                            <v-icon size="20" class="ma-3" color="var(--primary)"  title="Fechamento não verificado"> fa fa-note-sticky</v-icon>
                                            Observação:<br>{{obsListener(closure.obs)}}
                                    </v-list-item-subtitle >
                                </v-list>
                            </v-carousel-item>
                        </v-carousel>
                    </v-col>
                    <v-col cols="4" class='set_closure pa-3 mr-3'>
                        <v-list-item class=" d-flex justify:center align-center ma-0 pa-0">
                            <!-- switch card values -->
                            <v-list-item-subtitle class="text-h5 d-flex justify-center align-center">
                                <div class="d-flex flex-column mb-2">
                                    <v-icon size="35" class="ma-3" color="var(--primary)"  title="Fechamento não verificado"> fa-solid fa-money-bill-transfer</v-icon>
                                    Sangrias do Caixa
                                </div>
                            </v-list-item-subtitle >
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list class="transparent overflow-y-auto mg-0 pa-0" >
                            <div class="d-flex flex-row align-center ">
                                <v-list-item-title class="text-left">Conta</v-list-item-title>
                                <v-list-item-title class="text-right">Valor</v-list-item-title>
                            </div>
                            <v-divider></v-divider>
                            <div v-for="(withdrawal,w_key) in data.withdrawal" :key="w_key" class="d-flex flex-row align-center" :title="withdrawal.withdrawal_account.withdrawal_description" >
                                <v-list-item-icon><v-icon color="red" title='apagar sangria' @click='removeWithdrawal(withdrawal)' >fa-solid fa-xmark</v-icon></v-list-item-icon>
                                <v-list-item-icon><v-icon >fa fa-receipt</v-icon></v-list-item-icon>
                                <v-list-item-title>{{ withdrawal.withdrawal_account.withdrawal_number }} - {{ withdrawal.withdrawal_account.withdrawal_name }}</v-list-item-title>
                                <v-list-item-subtitle class="text-right"><b>{{ valueFormat(withdrawal.value)}}</b></v-list-item-subtitle>                                
                            </div>
                        </v-list>                         
                    </v-col>                    
                </v-row>
                
            </v-carousel-item>
           
        </v-carousel>
    </v-row>
    
</template>

<script>
import { format } from 'date-fns';
import {getClosure} from '../../services/api/closureApi';
import {deleteWithdrawal} from '../../services/api/withdrawalApi';

  export default {
    name: 'ClosurePage',
    computed:{
        is_manager(){
        return this.$store.state.auth.cashier_session.is_manager
        },  
    },
    data () {
      return {
        loading : false,
        closures:[],
        refDate:null,
        check_cashier:false,
        obs:'',
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
            this.closures     = await getClosure()
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
    },
    async beforeMount() {
      await this.updateClosure();
    },
    components:{
       
    }
}
</script>

<style>
    .set_closure{
        border-radius: 8px;
        background: white;
    }
    
</style>