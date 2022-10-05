<template>
  <v-list-item>
    <v-list-item-avatar rouded color="var(--backgroundLight)">
        <v-img src="../../assets/defaultUser.jpg" />  
    </v-list-item-avatar>
    <v-list-item-content>
        <v-list-item-subtitle class="">Vendedor
            <v-menu
              v-model="menuSalesman"
              :close-on-content-click="false"
              :nudge-width="200"
              >
              <template v-slot:activator="{ on, attrs }">
                <v-icon 
                    color="var(--primary)" 
                    size='20'
                    v-bind="attrs" 
                    v-on="on"
                    title="Adicionar um vendedor"> mdi-pencil</v-icon>
              </template>
              <!-- FORM localizar cliente -->
              <v-card >
                <v-list>
                <v-list-item>
                    <v-list-item-avatar rouded color="var(--primary">
                        <v-icon color="white">fa fa-user</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title>Incluir Vendedor</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list>
                  <v-text-field
                      label="cpf/cnpj"
                      hide-details="auto"
                      color="var(--primary)"
                      v-model=salesmanCache.document
                      hide-spin-buttons
                      class='pa-2'
                      v-mask="salesmanCache.document.length <= 14 ? '###.###.###-##' : '##.###.###/####-##'"
                      :rules='rules.documentValidate'
                      type='text'
                      counter="18"
                      @change="documentValidate(false)"
                      prepend-icon='fa fa-id-card'
                      autofocus>                
                  </v-text-field>
                  <div >
                    <v-text-field
                      label="name"
                      hide-details="auto"
                      color="var(--primary)"
                      v-model=salesmanCache.name
                      hide-spin-buttons
                      @focus="salesmanCache.name=''"
                      class='pa-2'
                      prepend-icon='fa fa-user'
                      disabled>         
                    </v-text-field>
                  </div>
                  </v-list>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="menuSalesman = false">Cancelar</v-btn>
                <v-btn color="var(--primary)" text :disabled='btSave' @click="addSalesman()">salvar</v-btn>
                </v-card-actions>
              </v-card>
            <!--  -->
          </v-menu>
          <v-btn plain small icon v-if="btnRemoveSalesman" @click="cleanSalesman()">
            <v-icon right color="white">fa fa-xmark</v-icon>
          </v-btn>
          <!-- fim -->
          </v-list-item-subtitle>
        <v-list-item-title class="" >{{typeof(sale_salesman.name) === 'undefined' ? '' : sale_salesman.name}}</v-list-item-title>
    </v-list-item-content>       
  </v-list-item>
</template>

<script>
import {getCustomer} from '../../services/api/customerApi'
import {checkDocument} from '../../services/checkCpfCnpj'
export default {
   name:'ClienteVendedorCard',
    computed:{
      sale_salesman(){
        return this.$store.state.cashierStore.salesman
      },
    },
    data: ()=>({
      loading: false,
      menuSalesman:false,
      btnRemoveSalesman:false,
      btSave:true,
      salesmanCache:{
        document: "",
        name: "indisponível",
        email: "",
        phone: "",
        type: "",
        store_partiner_id: "",
        store_partiner_name: "",
        store_partiner_cnpj:"",
      },
      rules:{
        documentValidate:[true],
        validarEmprParc:[true],
        email:[true],
      }
    }),
    methods:{
        //client methods
        async documentValidate(type){ //required - true -> exite para o cadastro; required - false -> não exige
          var val = type ? this.salesmanCache.store_partiner_cnpj : this.salesmanCache.document
          val     = val.toString();
          val     = val.replace(/[^0-9]/g, '');
          try{
            if(checkDocument(val)){
              await this.checkDocumentserver(val,type)
            }
          }catch(e){
            if(type){
              this.rules.validarEmprParc = [e.message]
            }else{
              this.rules.documentValidate = [e.message]
            }
          }
        },
        async checkDocumentserver(document){
          try{
            if(document !== '' || document !==null || typeof(document) !== 'undefined' ){
              this.loading            = true
              var customer            = await getCustomer(document);
              if(!customer.data.data){
                this.newSalesman      = true
              }else{
                if(customer.data.data.type === "funcionario"){
                  this.salesmanCache          = customer.data.data
                  this.btSave                 = false
                  this.rules.documentValidate = [true]
                }else{
                  this.rules.documentValidate = ['funcionário inválido']
                  this.btSave = true
                }
              }
              this.loading            = false
            }
          }catch(e){
            alert(e)
          }
        },
        addSalesman(){
          var newSalesman = Object.assign({}, this.salesmanCache)
          this.$store.dispatch('addSalesman',newSalesman)
          this.btnRemoveSalesman = true
          this.menuSalesman = false
        },
        cleanCache(){
          this.salesmanCache = {
            document: "",
            name: "Vendedor não identificado",
            email: "",
            phone: "",
            type: "",
            store_partiner_id: "",
            store_partiner_name: "",
            store_partiner_cnpj:"",
          }
        },
        cleanSalesman(){
          this.$store.dispatch('removeSalesman',this.salesmanCache)
          this.cleanCache()
          this.btnRemoveSalesman = false
        },
    },
    mounted(){
      this.cleanCache()
      if(this.sale_salesman.document !== ""){
        this.btnRemoveSalesman = true
      }
    }
}
</script>

<style>

</style>