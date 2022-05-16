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
                :items="vendas"
                :search="search" 
                :headers="header"
                fixed-header
                calculate-widths
                dense
                hide-default-footer
                @click:row="datalheVenda()"
                :items-per-page="-1"
                style="height: 80vh;padding-left:3px;padding-right:3px "
                class="overflow-y-auto"
                >
                <template v-slot:item="row">
                    <tr >
                      <td >
                        <v-chip>
                          <v-icon size="15" color="red"  >fa fa-xmark </v-icon>
                          <v-icon size="13" color="blue"  >fa fa-eye </v-icon>
                        </v-chip>
                      </td>
                      <td><b>{{row.item.numero}}</b></td>
                      <td>{{row.item.dtVenda}}</td>
                      <td>{{row.item.caixa}}</td>
                      <td>{{row.item.funcCaixa}}</td>
                      <td>{{row.item.cliente.nome}}</td>
                      <td><v-chip class='ma-1'>{{row.item.formaPagamento}}</v-chip></td>
                      <td>{{valueFormat(row.item.valorDesconto)}}</td>
                      <td>{{valueFormat(row.item.valorVenda)}}</td>
                      <td>{{row.item.status}}</td>
                    </tr>
                </template>
                </v-data-table>  
        </v-card-text>
      </v-card>
  </div>
</template>

<script>
export default {
  name:'VendasCard',
  computed:{
    vendas(){
        return this.$store.state.vendas.vendas
    },        
  },
  data:()=>{
      return {
        search:'',
        detailMenu:false,
        header:[
          { text: '',align: 'start',sortable: false,value: ''},
          { text: 'Numero',align: 'start',sortable: false,value: 'numero'},
          { text: 'Data', value: 'dtVenda' },
          { text: 'caixa', value: 'caixa' },
          { text: 'funcionário do caixa', value: 'funcCaixa' },
          { text: 'cliente', value: 'cliente.nome' },
          { text: 'forma pagamento', value: 'formaPagamento' },
          { text: 'Desconto', value: 'valorDesconto' },
          { text: 'total', value: 'valorTotal' },
          { text: 'status', value: 'status' },
        ],
      } 
    },
    methods:{
      valueFormat(value){
        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
      },
      datalheVenda(){
        this.detailMenu = true
      }
    }
  }
</script>

<style>

</style>