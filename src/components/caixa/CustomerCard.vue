<template>
  <v-list-item>
    <v-list-item-avatar rouded color="white">
        <v-img src="../../assets/defaultUser.jpg" />  
    </v-list-item-avatar>
    <v-list-item-content>
        <v-list-item-subtitle class="white--text">Cliente
            <v-menu
              v-model="menuCustomer"
              :close-on-content-click="false"
              :nudge-width="200"
              >
              <template v-slot:activator="{ on, attrs }">
                  <!-- <v-icon v-if="checkCustomer()" color="red" size='20'> fa-solid fa-triangle-exclamation</v-icon>  -->
                  <v-btn
                    color='grey' 
                    dark  
                    v-bind="attrs" 
                    v-on="on"
                    title="Adicionar um cliente"
                    plain
                    small 
                    icon
                  >
                  <v-icon color="white" size='20'> mdi-pencil</v-icon>
                  </v-btn>  
              </template>
              <!-- FORM localizar cliente -->
              <v-card >
                <v-list>
                <v-list-item>
                    <v-list-item-avatar rouded color="var(--primary">
                        <v-icon color="white"> {{!newCustomer?'fa fa-user': 'fa fa-user-plus'}}</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title>{{!newCustomer?'Incluir Cliente': 'Cadastrar Cliente'}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list>
                  <v-text-field
                      label="cpf/cnpj"
                      hide-details="auto"
                      color="var(--primary)"
                      v-model=customerCache.document
                      hide-spin-buttons
                      class='pa-2'
                      v-mask="customerCache.document.length <= 14 ? '###.###.###-##' : '##.###.###/####-##'"
                      :rules='rules.documentValidate'
                      type='text'
                      counter="18"
                      @change="documentValidate(false)"
                      prepend-icon='fa fa-id-card'
                      autofocus>                
                  </v-text-field>
                  <div v-if="newCustomer">
                    <v-text-field
                      label="name"
                      hide-details="auto"
                      color="var(--primary)"
                      v-model=customerCache.name
                      hide-spin-buttons
                      @focus="customerCache.name=''"
                      :disabled="!newCustomer"
                      class='pa-2'
                      prepend-icon='fa fa-user'
                      autofocus
                    >                
                    </v-text-field>
                    <v-text-field
                      label="e-mail"
                      hide-details="auto"
                      :disabled="!newCustomer"
                      color="var(--primary)"
                      v-model=customerCache.email
                      class='pa-2'
                      type="email"
                      prepend-icon='fa fa-envelope'
                    >                
                    </v-text-field>
                    <v-text-field
                      label="phone(opcional)"
                      hide-details="auto"
                      color="var(--primary)"
                      v-model=customerCache.phone
                      class='pa-2'
                      type="number"
                      hide-spin-buttons
                      :disabled="!newCustomer"
                      prepend-icon='fa fa-phone'
                    >                
                    </v-text-field>
                      <v-switch
                      v-if="newCustomer && store_type === 'shopping'"
                      v-model="customer_partioner"
                      color="var(--primary)"
                      class="pl-2 pr-2"
                      label="Funcionário de loja parceira"
                      append-icon="fa-solid fa-store"
                      
                    ></v-switch>
                    <v-text-field
                      v-if="customer_partioner "
                      label="cnpj da loja deste funcionário"
                      hide-details="auto"
                      color="var(--primary)"
                      v-model=customerCache.store_partiner_cnpj
                      hide-spin-buttons
                      class='pa-2'
                      v-mask="'##.###.###/####-##'"
                      :rules='rules.validarEmprParc'
                      type='text'
                      counter="18"
                      @change="documentValidate(true)"
                      prepend-icon='fa fa-id-card'
                    >                
                    </v-text-field>
                    <v-text-field
                      v-if="customer_partioner"
                      label="name da loja"
                      hide-details="auto"
                      color="var(--primary)"
                      v-model=customerCache.store_partiner_name
                      hide-spin-buttons
                      :disabled="!customer_partioner"
                      class='pa-2'
                      prepend-icon='fa fa-user'
                    >                
                    </v-text-field>
                  </div>
                  </v-list>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="menuCustomer = false">Cancelar</v-btn>
                <v-btn color="var(--primary)" text @click="newCustomer?cadastrarCliente():adicionarCliente()">{{newCustomer?'cadastrar':'salvar'}}</v-btn>
                </v-card-actions>
              </v-card>
            <!--  -->
          </v-menu>
          <v-btn plain small icon v-if="btnRemoveCustomer" @click="cleanCustomer()">
            <v-icon right color="white">fa fa-xmark</v-icon>
          </v-btn>
          <!-- fim -->
          </v-list-item-subtitle>
        <v-list-item-title class="white--text" >{{typeof(sale_customer.name) === 'undefined' ? '' : sale_customer.name}}</v-list-item-title>
    </v-list-item-content>       
    </v-list-item>      
</template>
<script>
import {getCustomer,setCustomer} from '../../services/api/customerApi'
import {checkDocument} from '../../services/checkCpfCnpj'
export default {
    name:'ClienteVendedorCard',
    computed:{
      store_type(){
        return this.$store.state.auth.cashier_session.store.store_type
      },
      cashier(){
        return this.$store.state.cashierStore
      },
      sale_customer(){
        return this.$store.state.cashierStore.customer
      },
    },
    data: ()=>({
      loading: false,
      menuCustomer:false,
      newCustomer:false,
      customer_partioner:false,
      btnRemoveCustomer:false,
      customerCache:{
        document: "",
        name: "Cliente não identificado",
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
        //form methods
        checkCustomer(){
          return !this.cashier.forceCustomer ? false : true
        },
        //client methods
        async documentValidate(type){ //required - true -> exite para o cadastro; required - false -> não exige
          var val = type ? this.customerCache.store_partiner_cnpj : this.customerCache.document
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
                this.newCustomer      = true
              }else{
                this.customerCache    = customer.data.data
                this.adicionarCliente()
              }
              this.loading            = false
            }
          }catch(e){
            alert(e)
          }
        },
        async cadastrarCliente(){
          var customerCache = Object.assign({}, this.customerCache)
          var doc           = customerCache.document.toString()
          doc               = doc.replace(/[^0-9]/g, '');
          var parDoc        = null
          var store_partiner= null
          if(customerCache.store_partiner_cnpj !== ''){
            parDoc          = customerCache.store_partiner_cnpj.toString()
            parDoc          = parDoc.replace(/[^0-9]/g, '');
            store_partiner  = {
              name: customerCache.store_partiner_name,
              cnpj: parDoc
            }
          }
          var newCustomer = {
            name: customerCache.name,
            document: doc,
            document_type: doc.length <= 11 ? false : true,
            email: customerCache.email,
            city: "",
            uf: "",
            postal_code: "",
            phone1: "",
            phone2: "",
            phone3: "",
            store_partiner: store_partiner,            
          }
          this.customerCache.type = this.customer_partioner ? 'funcionarioParceiro' : 'cliente'
          newCustomer         = await setCustomer(newCustomer)
          if(newCustomer.data.error){
            alert(newCustomer.data.data)
          }
          this.adicionarCliente()
        },
        adicionarCliente(){
          console.log('incluir na venda')
          var newCustomer = Object.assign({}, this.customerCache)
          newCustomer.document = newCustomer.document === '' ? 1:newCustomer.document 
          this.$store.dispatch('addCustomer',newCustomer)
          this.btnRemoveCustomer = true
          this.menuCustomer = false
        },
        cleanCache(){
          this.customerCache = {
            document: "",
            name: "Cliente não identificado",
            email: "",
            phone: "",
            type: "",
            store_partiner_id: "",
            store_partiner_name: "",
            store_partiner_cnpj:"",
          }
          this.newCustomer = false
        },
        cleanCustomer(){
          this.$store.dispatch('removeCustomer',this.customerCache)
          this.cleanCache()
          this.newCustomer = false
          this.btnRemoveCustomer = false
        },
    },
    mounted(){
      this.cleanCache()
      if(this.sale_customer.document !== ""){
        this.btnRemoveCustomer = true
      }
    }
}
</script>
<style>

</style>