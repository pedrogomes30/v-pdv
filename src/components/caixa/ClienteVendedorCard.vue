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
                          v-model=customer.document
                          hide-spin-buttons
                          class='pa-2'
                          v-mask="customer.document.length <= 14 ? '###.###.###-##' : '##.###.###/####-##'"
                          :rules='rules.documentValidate'
                          type='text'
                          counter="18"
                          @keyup="documentValidate()"
                          @change="newCustomer?'':verificarPessoa()"
                          prepend-icon='fa fa-id-card'
                          autofocus>                
                      </v-text-field>
                      <v-text-field
                          v-if="newCustomer"
                          label="name"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=customer.name
                          hide-spin-buttons
                          @focus="customer.name=''"
                          :disabled="!newCustomer"
                          class='pa-2'
                          prepend-icon='fa fa-user'
                          autofocus>                
                      </v-text-field>
                      <v-text-field
                          v-if="newCustomer"
                          label="e-mail"
                          hide-details="auto"
                          :disabled="!newCustomer"
                          color="var(--primary)"
                          v-model=customer.email
                          class='pa-2'
                          type="email"
                          prepend-icon='fa fa-envelope'
                          autofocus>                
                      </v-text-field>
                      <v-text-field
                          v-if="newCustomer"
                          label="phone(opcional)"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=customer.phone
                          class='pa-2'
                          type="number"
                          hide-spin-buttons
                          prepend-icon='fa fa-phone'
                          autofocus>                
                      </v-text-field>
                       <v-switch
                        v-if="newCustomer && caixa.lojatipo === 'shopping'"
                        v-model="customer_partioner"
                        color="var(--primary)"
                        label="Funcionário de loja parceira"
                        append-icon="fa fa-info"
                        
                      ></v-switch>
                      <v-text-field
                          v-if="customer_partioner "
                          label="cnpj da loja deste funcionário"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=customer.store_partiner_id
                          hide-spin-buttons
                          class='pa-2'
                          v-mask="customer.document.length <= 14 ? '###.###.###-##' : '##.###.###/####-##'"
                          :rules='rules.validarEmprParc'
                          type='text'
                          counter="18"
                          @keyup="documentValidate()"
                          @change="verificarPessoa()"
                          prepend-icon='fa fa-id-card'
                          autofocus>                
                      </v-text-field>
                      <v-text-field
                          v-if="customer_partioner"
                          label="name da loja"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=customer.store_partiner_name
                          hide-spin-buttons
                          :disabled="!newCustomer"
                          class='pa-2'
                          prepend-icon='fa fa-user'
                          autofocus>                
                      </v-text-field>
                      </v-list>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green" text @click="newCustomer = !newCustomer">{{newCustomer?'pesquisar':'novo'}}</v-btn>
                    <v-btn text @click="menuCustomer = false">Cancelar</v-btn>
                    <v-btn color="var(--primary)" text @click="!newCustomer?adicionarCliente():cadastrarCliente()">{{!newCustomer?'salvar':'cadastrar'}}</v-btn>
                    </v-card-actions>
                  </v-card>
                <!--  -->
              </v-menu>
              <!-- fim -->
              <v-btn plain small icon v-if="btnRemove" @click="limparCliente()">
                <v-icon right color="white">fa fa-xmark</v-icon>
              </v-btn>
              </v-list-item-subtitle>
            <v-list-item-title class="white--text" >{{typeof(sale_customer.name) === 'undefined' ? '' : sale_customer.name}}</v-list-item-title>
        </v-list-item-content>
        s
        <v-list-item-avatar color="white" rouded>
              <v-img src="../../assets/defaultUser.jpg" />  
          </v-list-item-avatar>
          <v-list-item-content>
              <v-list-item-subtitle class="white--text">Vendedor
                  <v-menu
                  v-model="menuVendedor"
                  :close-on-content-click="false"
                  :nudge-width="200"
                  >
                  <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color='grey' 
                        dark  
                        v-bind="attrs" 
                        v-on="on"
                        title="incluir Vendedor"
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
                            <v-icon color="white"> fa fa-user</v-icon>
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
                          v-model=vendedorVenda.document
                          hide-spin-buttons
                          class='pa-2'
                          v-mask="customer.document.length <= 14 ? '###.###.###-##' : '##.###.###/####-##'"
                          :rules='rules.documentValidate'
                          type='text'
                          counter="18"
                          @keyup="documentValidate()"
                          @change="verificarPessoa('vendedor')"
                          prepend-icon='fa fa-id-card'
                          autofocus>                
                      </v-text-field>
                      </v-list>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="menuCustomer = false">Cancelar</v-btn>
                    <v-btn color="var(--primary)" text @click="adicionarCliente()">salvar</v-btn>
                    </v-card-actions>
                  </v-card>
                <!--  -->
              </v-menu>
                </v-list-item-subtitle>
              <v-list-item-title class="white--text">{{vendaVendedor.name}}</v-list-item-title>
          </v-list-item-content>
      </v-list-item>      
</template>
<script>
import {getCustomer} from '../../services/api/customerApi'
export default {
    name:'ClienteVendedorCard',
    computed:{
      caixa(){
        return this.$store.state.auth
      },
      sale_customer(){
        return this.$store.state.cashierStore.customer
      },
      vendaVendedor(){
        return this.$store.state.cashierStore.salesman
      },
    },

    data: ()=>({
      menuCustomer:false,
      newCustomer:false,
      customer_partioner:false,
      btnRemove: false,
      pessoas:[],
      customer:{
        document: "",
        name: "Cliente não identificado",
        email: "",
        phone: "",
        type: "",
        store_partiner_id: "",
        store_partiner_name: ""
      },
      comVendedor:false,
      menuVendedor:false,
      vendedorVenda:{
        document: "",
        name: "Vendedor não identificado",
        email: "",
        phone: "",
        type: "",
        store_partiner_id: "",
        store_partiner_name: ""   
      },
      rules:{
        documentValidate:[true],
        validarEmprParc:[true],
        email:[true],
      }
    }),
    methods:{
        //form methods
        limparname(){
          
        },
        //client methods
        documentValidate(){ //required - true -> exite para o cadastro; required - false -> não exige
          var val = this.customer.document
          val = val.toString();
          val = val.replace(/[^0-9]/g, '');
          //CPF
          if(val.length === 11){
            this.rules.documentValidate = this.validarCpf(val) ? [true]: ['cpf inválido!'];
          }else if (val.length === 14){
            this.rules.documentValidate = this.validarCnpj(val) ? [true]: ['cnpj inválido!'];
          }else{
            this.rules.documentValidate = ['document inválido']
          }
          //valide e então pesquise em:
          //verificarCliente()
        },
        validarCpf(cpf){
          if ( !cpf || cpf.length != 11
                    || cpf == "00000000000"
                    || cpf == "11111111111"
                    || cpf == "22222222222" 
                    || cpf == "33333333333" 
                    || cpf == "44444444444" 
                    || cpf == "55555555555" 
                    || cpf == "66666666666"
                    || cpf == "77777777777"
                    || cpf == "88888888888" 
                    || cpf == "99999999999" )
          return false
          var soma = 0
          var resto= 0
          for (var i = 1; i <= 9; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
          resto = (soma * 10) % 11
            if ((resto == 10) || (resto == 11))  resto = 0
            if (resto != parseInt(cpf.substring(9, 10)) ) return false
          soma = 0
            for (i = 1; i <= 10; i++) 
              soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
            resto = (soma * 10) % 11
            if ((resto == 10) || (resto == 11))  resto = 0
            if (resto != parseInt(cpf.substring(10, 11) ) ) return false
          return true
        },
        validarCnpj(cnpj){
          if ( !cnpj || cnpj.length != 14 
          || cnpj == "00000000000000" 
          || cnpj == "11111111111111" 
          || cnpj == "22222222222222" 
          || cnpj == "33333333333333" 
          || cnpj == "44444444444444"
          || cnpj == "55555555555555" 
          || cnpj == "66666666666666" 
          || cnpj == "77777777777777" 
          || cnpj == "88888888888888" 
          || cnpj == "99999999999999")
          return false
          var tamanho = cnpj.length - 2
          var numeros = cnpj.substring(0,tamanho)
          var digitos = cnpj.substring(tamanho)
          var soma = 0
          var pos = tamanho - 7
          for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) pos = 9
          }
          var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
          if (resultado != digitos.charAt(0)) return false;
          tamanho = tamanho + 1
          numeros = cnpj.substring(0,tamanho)
          soma = 0
          pos = tamanho - 7
          for ( i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) pos = 9
          }
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
          if (resultado != digitos.charAt(1)) return false
            return true;
          },

        cadastrarCliente(){
          this.customer.tipo = this.customer_partioner ? 'funcionarioParceiro' : 'cliente'
          this.$store.dispatch('updatePessoa',this.customer)
          this.adicionarCliente()
          this.btnRemove = true
        },
        adicionarCliente(){
          this.btnRemove = true
          this.$store.dispatch('addCliente',this.customer)
        },
        async verificarPessoa(){ //se existe o CNPJ/CPF cadastrado
          try{
            //precisa de ajsute na API//
            this.newCustomer  = await getCustomer(this.newCustomer.document)
          }catch(e){
            alert(e)
          }
        },
        limparCliente(){
          try{
            this.$store.dispatch('removerCliente',this.customer)
            this.customer ={
                document:'',
                name:'',
                email:'',
                phone:'',
                store_partiner_id:'',
                store_partiner_name:'',
                tipo:'',    
              }
            this.newCustomer = false
            this.btnRemove = false
          }catch(e){
            console.log(e)
          }
        },
        trocarTipoPessoa(tipoPessoa){
          this.customer_partioner = tipoPessoa === 'cliente' ?  false: true 
        },
    }
}
</script>
<style>

</style>