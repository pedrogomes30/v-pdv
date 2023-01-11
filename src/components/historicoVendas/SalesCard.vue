<template>
  <div>
      <v-card>
        <v-card-title>
          <v-list-item-avatar rouded color="var(--primary">
                <v-icon color="white"> fa fa-search</v-icon>
            </v-list-item-avatar>
            Procurar Venda
            <v-spacer></v-spacer>
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="procurar..."
            single-line
            dense
            autofocus
            >
            </v-text-field>
        </v-card-title>
        <v-card-text>
          <LoadComponent :overlay="loading" />
      <v-data-table
            v-if="to_sync_sales"
            :items="to_sync_sales"
            :search="search" 
            :headers="header"
            fixed-header
            calculate-widths
            dense
            no-data-text="Não há registros de venda"
            no-results-text="resultado não encontrado"
            sortBy='sale_date'
            :sortDesc='true'
            hide-default-footer
            @click:row="detailSale()"
            :items-per-page="-1"
            style="height: 30vh;padding-left:3px;padding-right:3px "
            class="overflow-y-auto pb-0 mb-0"
            >
            <template v-slot:item="row">
                <tr >
                  <td>
                    <v-btn elevation="3" icon color="red" class='ma-1' outlined title="Cancelar venda" >
                      <v-icon size="20" >fa fa-xmark </v-icon>
                    </v-btn>
                    <v-btn elevation="3" icon color="green" class='ma-1' outlined title="imprimir Nfc-e" @click="openInvoice(row.item)" >
                      <v-icon size="20" >fa fa-receipt </v-icon>
                    </v-btn>
                    <v-btn v-if="row.item.status==='Erro'" elevation="3" icon color="blue" class='ma-1' outlined title="Re-sincronizar" @click='reSendSale(row.item)' >
                      <v-icon size="20" >fa fa-rotate</v-icon>
                    </v-btn>
                    <v-btn v-if="row.item.status==='Erro'" elevation="3" icon color="red" class='ma-1' outlined title="Informar bug na venda" >
                      <v-icon size="20" >fa-solid fa-bug</v-icon>
                    </v-btn>
                  </td>
                  <td>id:{{row.item.id}}<br><b>{{row.item.number}}</b></td>
                  <td>{{dateFormat(row.item.sale_date)}}</td>
                  <td>{{row.item.cashier.cashier_name}}</td>
                  <td>{{row.item.employee_cashier.user_name}}</td>
                  <td>{{getSalesman(row.item.salesman)}}</td>
                  <td>{{getCustomer(row.item.customer)}}</td>
                  <td><v-chip 
                    :title="formatPaymentMethod(row.item) ? row.item.payment_method :'Forma de pagamento não disponível na data atual'"
                    class='ma-1'
                    color='var(--primary)'
                    outlined>
                    {{formatPaymentMethod(row.item) ? formatPaymentMethod(row.item) : '????????'}}</v-chip></td>
                  <td>{{valueFormat(row.item.discont_value)}}</td>
                  <td>{{valueFormat(row.item.total_value)}}</td>
                  <td class="justify-center">
                    <v-btn elevation="2" icon :title="setTitle(row.item)" :color="row.item.status.status_color" class='ma-1' outlined>
                      <v-icon size="20">  {{row.item.status.status_icon}}</v-icon>
                    </v-btn>
                  </td>
                </tr>
            </template>
            </v-data-table>  
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
                :style="{
                    height: to_sync_sales? '50vh' : '80vh'
                  }"
                style="padding-left:3px;padding-right:3px "
                class="overflow-y-auto"
                >
                <template v-slot:item="row">
                    <tr >
                      <td>
                        <v-btn elevation="3" icon color="red" class='ma-1' outlined title="Cancelar venda" >
                          <v-icon size="20" >fa fa-xmark </v-icon>
                        </v-btn>
                        <v-btn elevation="3" icon color="green" class='ma-1' outlined title="imprimir Nfc-e" @click="openInvoice(row.item)" >
                          <v-icon size="20" >fa fa-receipt </v-icon>
                        </v-btn>
                        <v-btn v-if="row.item.status==='Erro'" elevation="3" icon color="blue" class='ma-1' outlined title="Re-sincronizar" @click='reSendSale(row.item)' >
                          <v-icon size="20" >fa fa-rotate</v-icon>
                        </v-btn>
                        <v-btn v-if="row.item.status==='Erro'" elevation="3" icon color="red" class='ma-1' outlined title="Informar bug na venda" >
                          <v-icon size="20" >fa-solid fa-bug</v-icon>
                        </v-btn>
                      </td>
                      <td>id:{{row.item.id}}<br><b>{{row.item.number}}</b></td>
                      <td>{{dateFormat(row.item.sale_date)}}</td>
                      <td>{{row.item.cashier.cashier_name}}</td>
                      <td>{{row.item.employee_cashier.user_name}}</td>
                      <td>{{getSalesman(row.item.salesman)}}</td>
                      <td>{{getCustomer(row.item.customer)}}</td>
                      <td><v-chip 
                        :title="formatPaymentMethod(row.item) ? row.item.payment_method :'Forma de pagamento não disponível na data atual'"
                        color='var(--primary)'
                        outlined>
                        {{formatPaymentMethod(row.item) ? formatPaymentMethod(row.item) : '????????'}}</v-chip></td>
                      <td>{{valueFormat(row.item.discont_value)}}</td>
                      <td>{{valueFormat(row.item.total_value)}}</td>
                      <td class="justify-center">
                        <v-btn 
                          elevation="2" 
                          icon 
                          :title="setTitle(row.item)" 
                          :color="row.item.status.status_color" 
                          outlined>
                          <v-icon size="20">{{row.item.status.status_icon}}</v-icon>
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
import generateSale from '../../services/SaleServices/createSale'
import {getSale, getCupoun} from '../../services/api/saleApi'
import LoadComponent from '../SysComponents/LoadComponent.vue'
export default {
    name: "SalesCard",
    computed: {
        sales() {
            return this.$store.state.salesStore.sales;
        },
        to_sync_sales() {
            return this.$store.state.salesStore.to_sync_sales.length > 0 ? this.$store.state.salesStore.to_sync_sales : false;
        },
        updated_at() {
            return this.$store.state.salesStore.updated_at;
        },
        methods() {
            return this.$store.state.auth.cashier_session.payment_methods;
        },
        session() {
            return this.$store.state.auth.cashier_session;
        },
    },
    data: () => {
        return {
            search: "",
            detailMenu: false,
            loading: false,
            header: [
                { text: "Ações", align: "center", value: "" },
                { text: "Numero", align: "center", sortable: true, value: "number" },
                { text: "Data", align: "center", value: "sale_date" },
                { text: "Caixa", align: "center", value: "cashier" },
                { text: "Funcionário do caixa", align: "center", value: "employee_cashier" },
                { text: "Vendedor", align: "center", value: "name" },
                { text: "Cliente", align: "center", value: "customer" },
                { text: "Forma pagamento", align: "center", value: "payment_method" },
                { text: "Desconto", align: "center", value: "discont_value" },
                { text: "Total", align: "center", value: "total_value" },
                { text: "Status", align: "center", value: "status" },
            ],
        };
    },
    methods: {
        valueFormat(value) {
            return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
        },
        dateFormat(dateString) {
            dateString = new Date(dateString);
            return format(dateString, "dd/MM/yyyy HH:mm:ss");
        },
        formatPaymentMethod(sale) {
            var saleDate = new Date(sale.sale_date);
            var today = format(new Date(), "dd/MM/yyyy");
            saleDate = format(saleDate, "dd/MM/yyyy");
            if (saleDate === today)
                return false;
            return this.getMethodAlias(sale.payment_method);
        },
        getMethodAlias(method_id) {
            let find = this.methods.findIndex(x => x.method_id === method_id);
            if (find !== -1) {
                return this.methods[find].method_alias;
            }
            return "Metodo não incontrado";
        },
        verifyStatus(sale) {
            if (sale.status === "Erro")
                return sale.status;
            if (sale.id !== "" || typeof (sale.id !== "undefined")) {
                return "Finalizada";
            }
            else {
                return "A enviar";
            }
        },
        getSalesman(salesman){
          if(salesman === null)
          {
            return null
          }
          return salesman.name
        },
        getCustomer(customer){
          if(customer === null)
          {
            return null
          }
          return customer.name
        },
        setTitle(sale) {
            if (sale.sys_obs)
                return sale.sys_obs;
            return sale.status.status_description;
        },
        detailSale() {
            this.detailMenu = true;
        },
        async openInvoice(sale) {
            this.loading = true;
            if (sale.invoice_coupon === "" || sale.invoice_coupon === null || typeof (sale.invoice_coupon) === "undefined") {
                var nfce = await getCupoun(sale.id);
                //set nfce link to this sale
                console.log("no NFCE nfce", nfce.data.data);
                window.open(nfce.data.data.invoice_coupon, "_blank");
                await this.updateSales();
            }
            else {
                console.log("with nfce", sale.invoice_coupon);
                window.open(sale.invoice_coupon, "_blank");
            }
            this.loading = false;
        },
        async reSendSale(sale) {
            var session = Object.assign({}, this.session);
            var newSale = await generateSale(sale, this.sales, session);
            if (newSale.status !== "Erro" || newSale.status !== "Negada") {
                await this.dispatchSale(newSale);
                await this.updateSales();
            }
        },
        async updateSales() {
            this.loading = true;
            var saleServer = await getSale();
            await this.$store.dispatch("salesMerge", saleServer.data.data);
            this.loading = false;
        },
        async dispatchSale(newSale) {
            await this.$store.dispatch("newSale", newSale);
            await this.$store.dispatch("cleanSale");
        }
    },
    async beforeMount() {
        await this.updateSales();
    },
    components: { LoadComponent }
}
</script>

<style>

</style>