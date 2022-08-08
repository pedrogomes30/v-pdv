<template>
  <div>
      <v-card>
        <v-card-title>
          <v-list-item-avatar rouded color="var(--primary">
                <v-icon color="white"> fa fa-boxes</v-icon>
            </v-list-item-avatar>
            Vendas Realizadas
            <v-spacer></v-spacer>
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="procurar..."
            single-line
            dense
            autofocus
            >
            ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-data-table
                :items="sales"
                :search="search" 
                :headers="header"
                fixed-header
                calculate-widths
                dense
                sortBy='sale_date'
                :sortDesc='true'
                hide-default-footer
                @click:row="detailSale()"
                :items-per-page="-1"
                style="height: 80vh;padding-left:3px;padding-right:3px "
                class="overflow-y-auto"
                >
                <template v-slot:item="row">
                    <tr >
                      <td>
                        <v-btn elevation="3" icon color="red" class='ma-1' outlined title="Cancelar venda">
                          <v-icon size="20" >fa fa-xmark </v-icon>
                        </v-btn>
                        <v-btn elevation="3" icon color="green" class='ma-1' outlined title="imprimir Nfc-e">
                          <v-icon size="20" >fa fa-receipt </v-icon>
                        </v-btn>
                        <v-btn v-if="row.item.status==='Erro'" elevation="3" icon color="blue" class='ma-1' outlined title="Re-sincronizar">
                          <v-icon size="20" >fa fa-rotate</v-icon>
                        </v-btn>
                        <v-btn v-if="row.item.status==='Erro'" elevation="3" icon color="red" class='ma-1' outlined title="Informar bug na venda">
                          <v-icon size="20" >fa-solid fa-bug</v-icon>
                        </v-btn>
                      </td>
                      <td><b>{{row.item.number}}</b></td>
                      <td>{{dateFormat(row.item.sale_date)}}</td>
                      <td>{{row.item.cashier.cashier_name}}</td>
                      <td>{{row.item.employee_cashier.user_name}}</td>
                      <td>{{row.item.salesman.name}}</td>
                      <td>{{row.item.customer.name}}</td>
                      <td><v-chip 
                        :title="formatPaymentMethod(row.item) ? row.item.payment_method :'Forma de pagamento não disponível na data atual'"
                        class='ma-1'
                        color='var(--primary)'
                        outlined>
                        {{formatPaymentMethod(row.item) ? formatPaymentMethod(row.item) : '????????'}}</v-chip></td>
                      <td>{{valueFormat(row.item.discont_value)}}</td>
                      <td>{{valueFormat(row.item.total_value)}}</td>
                      <td class="justify-center">
                        <v-btn elevation="2" icon :title="row.item.status === 'Erro' ? row.item.obs : row.item.status" :color="setIconStatus(row.item,true)" class='ma-1' outlined>
                          <v-icon size="20">  {{setIconStatus(row.item,false)}}</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                </template>
                </v-data-table>  
        </v-card-text>
      </v-card>
  </div>
</template>

<script>
import { format } from 'date-fns'
export default {
  name:'salesCard',
  computed:{
    sales(){
      return this.$store.state.salesStore.sales
    },  
    methods(){
      return this.$store.state.auth.cashier_session.payment_methods
    }     
  },
  data:()=>{
      return {
        search:'',
        detailMenu:false,
        header:[
          { text: 'Ações',align: 'center',value: ''},
          { text: 'Numero',align: 'center',sortable: true,value: 'number'},
          { text: 'Data', align: 'center', value: 'sale_date' },
          { text: 'Caixa', align: 'center', value: 'cashier' },
          { text: 'Funcionário do caixa', align: 'center', value: 'employee_cashier' },
          { text: 'Vendedor', align: 'center', value: 'name' },
          { text: 'Cliente', align: 'center', value: 'customer' },
          { text: 'Forma pagamento', align: 'center', value: 'payment_method' },
          { text: 'Desconto', align: 'center', value: 'discont_value' },
          { text: 'Total', align: 'center', value: 'total_value' },
          { text: 'Status', align: 'center', value: 'status' },
        ],
      } 
    },
    methods:{
      valueFormat(value){
        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
      },
      dateFormat(dateString){
        dateString = new Date(dateString)
        return format(dateString, "dd/MM/yyyy HH:ii:ss")
      },
      formatPaymentMethod(sale){
        var saleDate = new Date(sale.sale_date)
        var today    = format(new Date(), "dd/MM/yyyy")
        saleDate = format(saleDate, "dd/MM/yyyy")
        if(saleDate === today) return false
        return this.getMethodAlias(sale.payment_method)
      },
      getMethodAlias(method_id){
        let find = this.methods.findIndex(x => x.method_id === method_id);
        if(find !== -1){
          return this.methods[find].method_alias
        }  
        return 'Error'        
      },
      verifyStatus(sale){
        if(sale.status === 'Erro') return sale.status
        if(sale.id !=='' || typeof(sale.id !== 'undefined')){
          return 'Finalizada'
        }else{
          return 'A enviar'
        }
      },
      setIconStatus(sale,isColor=false){
        var result  = null
        var status  = this.verifyStatus(sale)
        var iconSet = [
          {status:'Finalizada',icon:'fa fa-check',color:'green'},
          {status:'Erro',icon:'fa fa-triangle-exclamation',color:'red'},
          {status:'A enviar',icon:'fa-solid fa-rotate',color:'yellow'},
        ]
        let find = iconSet.findIndex(x => x.status === status);
        if(find !== -1){
          result = isColor ? iconSet[find].color : iconSet[find].icon
        }
        return result
      },
      detailSale(){
        this.detailMenu = true
      }
    }
  }
</script>

<style>

</style>