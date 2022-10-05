<template>
  <v-list-item>
    <v-list-item-avatar rouded color="var(--backgroundLight)">
        <v-img src="../../assets/defaultUser.jpg" />  
    </v-list-item-avatar>
    <v-list-item-content >
        <v-list-item-subtitle >Cliente
            <v-menu
              v-model="menuCustomer"
              :close-on-content-click="false"
              :nudge-width="200"
              >
              <template v-slot:activator="{ on, attrs }">
                  <v-icon v-if="checkCustomer()" color="red" size='20'> fa-solid fa-triangle-exclamation</v-icon> 
                  <v-icon 
                    color="var(--primary)" 
                    size='20' 
                    v-bind="attrs" 
                    v-on="on"
                    title="Adicionar um cliente"
                    > mdi-pencil</v-icon>
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
                <v-row class="pa-3">
                  <v-list>
                    <!-- PERSON DATA -->
                    <v-text-field
                        label="Cpf/Cnpj"
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
                          label="Nome"
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
                          label="Email"
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
                          label="Telefone(opcional)"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=customerCache.phone
                          class='pa-2'
                          v-mask="customerCache.phone.length > 13 ? '(##)#-####-####' : '(##)####-####'"
                          type="text"
                          hide-spin-buttons
                          :disabled="!newCustomer"
                          prepend-icon='fa fa-phone'
                        >    
                        </v-text-field>
                        </div>
                    </v-list>
                    <v-list>
                      <div v-if="newCustomer">
                        <!-- ADDRESS -->
                        <v-text-field
                          label="Cep"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=customerCache.postal_code
                          hide-spin-buttons
                          class='pa-2'
                          v-mask="'#####-###'"
                          :rules='rules.cep'
                          type='text'
                          counter="9"
                          @change="checkGetAdressByCep()"
                          prepend-icon='fa fa-envelopes-bulk'
                        />
                        <v-text-field
                          label="Cidade"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=customerCache.city
                          hide-spin-buttons
                          class='pa-2'
                          type='text'
                          prepend-icon='fa fa-city'
                        />
                        <v-text-field
                          label="Uf"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=customerCache.uf
                          hide-spin-buttons
                          class='pa-2'                          
                          counter="2"
                          type='text'
                          prepend-icon='fa fa-earth-americas'
                        />
                        <v-text-field
                          label="Bairro"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=customerCache.district
                          hide-spin-buttons
                          class='pa-2'
                          type='text'
                          prepend-icon='fa fa-tree-city'
                        />
                        <v-text-field
                          label="Logradouro"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=customerCache.street
                          hide-spin-buttons
                          class='pa-2'
                          type='text'
                          prepend-icon='fa fa-road'
                        />
                        <v-text-field
                          label="Numero"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=customerCache.number
                          hide-spin-buttons
                          class='pa-2'
                          type='text'
                          counter="10"
                          prepend-icon='fa fa-hashtag'
                        />
                      </div>
                    </v-list>
                </v-row>
                  <v-list>
                    <div v-if="newCustomer">                    
                      <!-- STORE PARTINER DATA-->
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
                        label="Cnpj da loja deste funcionário"
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
                        label="Nome da loja"
                        hide-details="auto"
                        color="var(--primary)"
                        v-model=customerCache.store_partiner_name
                        hide-spin-buttons
                        :disabled="!customer_partioner"
                        class='pa-2'
                        prepend-icon='fa-solid fa-store'
                      >    
                      <!-- FINISH -->
                      </v-text-field>
                    </div>
                  </v-list>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="menuCustomer = false">Cancelar</v-btn>
                <v-btn color="var(--primary)" text @click="newCustomer?saveCustomer():addCustomer()">{{newCustomer?'cadastrar':'salvar'}}</v-btn>
                </v-card-actions>
              </v-card>
            <!--  -->
          </v-menu>
          <v-btn plain small icon v-if="btnRemoveCustomer" @click="cleanCustomer()">
            <v-icon right color="var(--primary)">fa fa-xmark</v-icon>
          </v-btn>
          <!-- fim -->
          </v-list-item-subtitle>
        <v-list-item-title >{{sale_customer.name}}</v-list-item-title>
        <h6  v-if="typeof(sale_customer.store_partiner_name) !== 'undefined' || sale_customer.store_partiner_name !== ''"> {{sale_customer.store_partiner_name}}</h6>
    </v-list-item-content>       
    </v-list-item>      
</template>
<script>
import {getCustomer,setCustomer} from '../../services/api/customerApi'
import {getAdressByCep} from  '../../services/api/viaCepApi'
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
        name: "Cliente não identificado",
        document: "",
        email: "",
        city: "",
        uf: "",
        postal_code: "",
        phone: "",
        type: "",
        street: "",
        number: "",
        district:"",
          store_partiner_id: "",
          store_partiner_name: "",
          store_partiner_cnpj:"",
      },
      rules:{
        documentValidate:[true],
        validarEmprParc:[true],
        email:[true],
        cep:[true]
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
        async checkGetAdressByCep(){
          this.rules.cep =[true]
          var adress = await getAdressByCep(this.customerCache.postal_code);
          if(typeof(adress.cep) ==='undefined') this.rules.cep = ['cep inválido!'];
          this.customerCache.district     = adress.bairro
          this.customerCache.city         = adress.localidade
          this.customerCache.uf           = adress.uf
          this.customerCache.street       = adress.logradouro
          this.customerCache.number       = ''
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
                // this.addCustomer()
              }
              this.loading            = false
            }
          }catch(e){
            alert(e)
          }
        },
        async saveCustomer(){
          var customerCache                 = Object.assign({}, this.customerCache)
          //removes masks
          customerCache.document            = customerCache.document.toString()
          customerCache.document            = customerCache.document.replace(/[^0-9]/g, '')
          customerCache.phone               = customerCache.phone.toString()
          customerCache.phone               = customerCache.phone.replace(/[^0-9]/g, '')
          customerCache.store_partiner_cnpj = customerCache.store_partiner_cnpj.toString()
          customerCache.store_partiner_cnpj = customerCache.store_partiner_cnpj.replace(/[^0-9]/g, '')
          customerCache.postal_code         = customerCache.postal_code.toString()
          customerCache.postal_code         = customerCache.postal_code.replace(/[^0-9]/g, '')
          //add store partioner
          if(customerCache.store_partiner_cnpj !== ''){
            customerCache.store_partiner  = {
              name: customerCache.store_partiner_name,
              cnpj: customerCache.store_partiner_cnpj
            }
          }
          this.customerCache.type = this.customer_partioner ? 'funcionarioParceiro' : 'cliente'
          var newCustomer         = await setCustomer(customerCache)
          if(newCustomer.data.error){
            alert(newCustomer.data.data)
          }
          this.addCustomer()
        },
        addCustomer(){
          var newCustomer         = Object.assign({}, this.customerCache)
          newCustomer.document    = newCustomer.document === '' ? 1:newCustomer.document 
          this.$store.dispatch('addCustomer',newCustomer)
          this.newCustomer        = false
          this.btnRemoveCustomer  = true
          this.menuCustomer       = false
        },
        cleanCache(){
          this.customerCache = {
            name: "Cliente não identificado",
            document: "",
            email: "",
            city:"",
            uf:"",
            postal_code:'',
            phone: "",
            type: "",
            street:"",
            number:'',
            district:"",
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
    async mounted(){
      this.cleanCache()
      if(this.sale_customer.document != 1){
        this.btnRemoveCustomer = true
      }
    }
}
</script>
<style>

</style>