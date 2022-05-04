<template>
    
      <v-list-item>
        <v-list-item-avatar rouded color="white">
            <v-img src="../../assets/defaultUser.jpg" />  
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-subtitle class="white--text">{{cliente.tipo}}
                <v-btn plain small icon>
                  <v-icon color="white" right>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-subtitle>
            <v-list-item-title class="white--text" >{{cliente.nome}}</v-list-item-title>
        </v-list-item-content>
        
        <v-list-item-avatar color="white" rouded>
              <v-img src="../../assets/defaultUser.jpg" />  
          </v-list-item-avatar>
          <v-list-item-content>
              <v-list-item-subtitle class="white--text">{{vendedor.tipo}}
                  <v-btn plain small icon>
                    <v-icon right color="white">mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-subtitle>
              <v-list-item-title class="white--text">{{vendedor.nome}}</v-list-item-title>
          </v-list-item-content>
      </v-list-item>      
</template>
<script>
export default {
    name:'ClienteVendedorCard',
    computed:{
      cliente(){
        return this.$store.state.pessoa.cliente
      },
      vendedor(){
        return this.$store.state.pessoa.vendedor
      },
    },
    data: ()=>({
        
    }),
    methods:{
        alterarCliente(){
            //modal com tag cliente permite listar todos registros.
            //retorna um registro de cliente.
        },
        alterarVendedor(){
            //lista apenas as pessoas que são vendedores
        },
        list(){
            console.log(this.vendedor)
            console.log(this.cliente)
        }
    }
}
</script>
<style>

</style>