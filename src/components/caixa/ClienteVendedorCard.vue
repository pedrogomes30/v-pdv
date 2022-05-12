<template>
    
      <v-list-item>
        <v-list-item-avatar rouded color="white">
            <v-img src="../../assets/defaultUser.jpg" />  
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-subtitle class="white--text">Cliente
                <v-menu
                  v-model="menuCliente"
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
                            <v-icon color="white"> {{!novoCliente?'fa fa-user': 'fa fa-user-plus'}}</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                        <v-list-item-title>{{!novoCliente?'Incluir Cliente': 'Cadastrar Cliente'}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list>
                      <v-text-field
                          label="cpf/cnpj"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=clienteVenda.documento
                          hide-spin-buttons
                          class='pa-2'
                          v-mask="clienteVenda.documento.length <= 14 ? '###.###.###-##' : '##.###.###/####-##'"
                          :rules='rules.validarDocumento'
                          type='text'
                          counter="18"
                          @keyup="validarDocumento()"
                          @change="novoCliente?'':verificarPessoa()"
                          prepend-icon='fa fa-id-card'
                          autofocus>                
                      </v-text-field>
                      <v-text-field
                          v-if="novoCliente"
                          label="Nome"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=clienteVenda.nome
                          hide-spin-buttons
                          @focus="clienteVenda.nome=''"
                          :disabled="!novoCliente"
                          class='pa-2'
                          prepend-icon='fa fa-user'
                          autofocus>                
                      </v-text-field>
                      <v-text-field
                          v-if="novoCliente"
                          label="e-mail"
                          hide-details="auto"
                          :disabled="!novoCliente"
                          color="var(--primary)"
                          v-model=clienteVenda.email
                          class='pa-2'
                          type="email"
                          prepend-icon='fa fa-envelope'
                          autofocus>                
                      </v-text-field>
                      <v-text-field
                          v-if="novoCliente"
                          label="Telefone(opcional)"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=clienteVenda.telefone
                          class='pa-2'
                          type="number"
                          hide-spin-buttons
                          prepend-icon='fa fa-phone'
                          autofocus>                
                      </v-text-field>
                       <v-switch
                        v-if="novoCliente && caixa.lojatipo === 'shopping'"
                        v-model="clienteParc"
                        color="var(--primary)"
                        label="Funcionário de loja parceira"
                        append-icon="fa fa-info"
                        
                      ></v-switch>
                      <v-text-field
                          v-if="clienteParc "
                          label="cnpj da loja deste funcionário"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=clienteVenda.empresaParc
                          hide-spin-buttons
                          class='pa-2'
                          v-mask="clienteVenda.documento.length <= 14 ? '###.###.###-##' : '##.###.###/####-##'"
                          :rules='rules.validarEmprParc'
                          type='text'
                          counter="18"
                          @keyup="validarDocumento()"
                          @change="verificarPessoa()"
                          prepend-icon='fa fa-id-card'
                          autofocus>                
                      </v-text-field>
                      <v-text-field
                          v-if="clienteParc"
                          label="Nome da loja"
                          hide-details="auto"
                          color="var(--primary)"
                          v-model=clienteVenda.nomeEmpresaParc
                          hide-spin-buttons
                          :disabled="!novoCliente"
                          class='pa-2'
                          prepend-icon='fa fa-user'
                          autofocus>                
                      </v-text-field>
                      </v-list>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green" text @click="limparCliente()">{{novoCliente?'pesquisar':'novo'}}</v-btn>
                    <v-btn text @click="menuCliente = false">Cancelar</v-btn>
                    <v-btn color="var(--primary)" text @click="!novoCliente?adicionarCliente():cadastrarCliente()">{{!novoCliente?'salvar':'cadastrar'}}</v-btn>
                    </v-card-actions>
                  </v-card>
                <!--  -->
              </v-menu>
              <!-- fim -->
              <v-btn plain small icon v-if="btnRemove" @click="limparCliente()">
                <v-icon right color="white">fa fa-xmark</v-icon>
              </v-btn>
              </v-list-item-subtitle>
            <v-list-item-title class="white--text" >{{vendaCliente.nome}}</v-list-item-title>
        </v-list-item-content>
        
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
                          v-model=vendedorVenda.documento
                          hide-spin-buttons
                          class='pa-2'
                          v-mask="clienteVenda.documento.length <= 14 ? '###.###.###-##' : '##.###.###/####-##'"
                          :rules='rules.validarDocumento'
                          type='text'
                          counter="18"
                          @keyup="validarDocumento()"
                          @change="verificarPessoa('vendedor')"
                          prepend-icon='fa fa-id-card'
                          autofocus>                
                      </v-text-field>
                      </v-list>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="menuCliente = false">Cancelar</v-btn>
                    <v-btn color="var(--primary)" text @click="adicionarCliente()">salvar</v-btn>
                    </v-card-actions>
                  </v-card>
                <!--  -->
              </v-menu>
                </v-list-item-subtitle>
              <v-list-item-title class="white--text">{{vendaVendedor.nome}}</v-list-item-title>
          </v-list-item-content>
      </v-list-item>      
</template>
<script>
export default {
    name:'ClienteVendedorCard',
    computed:{
      pessoas(){
        return this.$store.state.pessoa.pessoas
      },
      caixa(){
        return this.$store.state.auth
      },
      vendaCliente(){
        return this.$store.state.caixa.cliente
      },
      vendaVendedor(){
        return this.$store.state.caixa.vendedor
      },
    },

    data: ()=>({
      menuCliente:false,
      novoCliente:false,
      clienteParc:false,
      btnRemove: false,
      clienteVenda:{
        documento:'',
        nome:'cliente não identificado',
        email:'',
        telefone:'',
        empresaParc:'',
        nomeEmpresaParc:'',
        tipo:'',    
      },
      comVendedor:false,
      menuVendedor:false,
      vendedorVenda:{
        documento:'',
        nome:'vendedor não identificado',
        email:'',
        empresaParc:'',
        nomeEmpresaParc:'',
        tipo:'',    
      },
      rules:{
        validarDocumento:[true],
        validarEmprParc:[true],
        email:[true],
      }
    }),
    methods:{
        //form methods
        limparNome(){
          
        },
        //client methods
        validarDocumento(){ //required - true -> exite para o cadastro; required - false -> não exige
          var val = this.clienteVenda.documento
          val = val.toString();
          val = val.replace(/[^0-9]/g, '');
          //CPF
          if(val.length === 11){
            this.rules.validarDocumento = this.validarCpf(val) ? [true]: ['cpf inválido!'];
          }else if (val.length === 14){
            this.rules.validarDocumento = this.validarCnpj(val) ? [true]: ['cnpj inválido!'];
          }else{
            this.rules.validarDocumento = ['documento inválido']
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
          this.clienteVenda.tipo = this.clienteParc ? 'funcionarioParceiro' : 'cliente'
          this.$store.dispatch('updatePessoa',this.clienteVenda)
          this.adicionarCliente()
          this.btnRemove = true
        },
        adicionarCliente(){
          this.btnRemove = true
          this.$store.dispatch('addCliente',this.clienteVenda)
        },
        verificarPessoa(){ //se existe o CNPJ/CPF cadastrado
          var val = this.clienteVenda.documento
          val = val.toString();
          val = val.replace(/[^0-9]/g, '');
          let exists = this.pessoas.findIndex(x => x.documento === val);  
            if(exists !== -1){
                this.clienteVenda = this.pessoas[exists]
            }else{
                this.rules.validarDocumento = ['cliente não cadastrado']
            }
        },
        limparCliente(){
          try{
            this.$store.dispatch('removerCliente',this.clienteVenda)
            this.clienteVenda ={
                documento:'',
                nome:'',
                email:'',
                telefone:'',
                empresaParc:'',
                nomeEmpresaParc:'',
                tipo:'',    
              }
            this.novoCliente = false
            this.btnRemove = false
          }catch(e){
            console.log(e)
          }
        },
        trocarTipoPessoa(tipoPessoa){
          this.clienteParc = tipoPessoa === 'cliente' ?  false: true 
        },
    }
}
</script>
<style>

</style>