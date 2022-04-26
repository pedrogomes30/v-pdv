<template>
    <div id='clienteVendedor'>
            <v-card>
              <v-list-item>
                <v-list-item-avatar rouded>
                    <v-img src="../../assets/defaultUser.jpg" />  
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-subtitle>{{}}
                        <v-btn plain small icon>
                          <v-icon right>mdi-pencil</v-icon>
                        </v-btn>
                      </v-list-item-subtitle>
                    <v-list-item-title>{{}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                  <v-list-item-avatar rouded>
                      <v-img src="../../assets/defaultUser.jpg" />  
                  </v-list-item-avatar>
                  <v-list-item-content>
                      <v-list-item-subtitle>{{}}
                          <v-btn plain small icon>
                            <v-icon right>mdi-pencil</v-icon>
                          </v-btn>
                        </v-list-item-subtitle>
                      <v-list-item-title>{{}}</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
</template>
<script>
export default {
    name:'ClienteVendedorCard',
    props:{
        
    },
      computed:{
         cliente:{
          set(){
            
          },
          get(){
            return '';
          }
        },
        vendedor:{
          set(){
  
          },
          get(){
            return '';
          }
        }
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