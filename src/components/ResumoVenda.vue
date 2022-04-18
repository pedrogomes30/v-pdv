<template>
  <v-navigation-drawer app color="white" right width="500">
      <strong class="ml-3">Resumo da venda</strong>
      <v-list subheader two-line class="mt-1">
          <!-- componentes de vendedor e cliente -->
          <v-list-item>
              <v-list-item-avatar rouded>
                  <v-img src="../assets/defaultUser.jpg" />  
              </v-list-item-avatar>
              <v-list-item-content>
                  <v-list-item-subtitle>{{cliente.tipo}}
                      <v-btn plain small icon>
                        <v-icon right>mdi-pencil</v-icon>
                      </v-btn>
                    </v-list-item-subtitle>
                  <v-list-item-title>{{cliente.nome}}</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
          <v-list-item>
              <v-list-item-avatar rouded>
                  <v-img src="../assets/defaultUser.jpg" /> 
              </v-list-item-avatar>
              <v-list-item-content>
                  <v-list-item-subtitle>{{vendedor.tipo}}</v-list-item-subtitle>
                  <v-list-item-title>{{vendedor.nome}}
                      <v-btn plain small icon>
                        <v-icon right>mdi-pencil</v-icon>
                      </v-btn>
                  </v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </v-list>
        <!-- componente de produtos selecionados -->
      <strong class="ml-3">Produtos selecionados</strong>
      <v-list subheader two-line overflow:auto  class="mt-1">
       <v-virtual-scroll :bench="benched" :items="items" height="300" item-height="64" >
            <template v-slot:default="{produto}">
                    <v-list-item :key="produto">
                    <v-list-item-avatar rounded color="grey lighten-4">
                        <v-img v-bind:src="produto.img"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="subtitle-2">{{produto.id}} - {{produto.descricao}}</v-list-item-title>
                        <v-list-item-subtitle>
                            <v-btn plain color="#02d409" @click="addProduct" small><v-icon>far fa-plus</v-icon></v-btn>
                            {{produto.quantidade}}
                            <v-btn plain color="#d40233" @click="removeProduct" small><v-icon>fa fa-minus</v-icon></v-btn>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action class="caption">R$ {{produto.valor*produto.quantidade}}</v-list-item-action>
                </v-list-item>
            </template>
        </v-virtual-scroll>
      </v-list>
    <v-toolbar color="rgba(0,0,0,0)" flat>
        <strong>Subtotal</strong>
            <v-spacer></v-spacer>
            <strong>R$ {{subtotal}}</strong>
    </v-toolbar>
    <v-toolbar color="rgba(0,0,0,0)" flat>
        <span>Descontos</span>
        <v-spacer></v-spacer>
        <span>R${{desconto}}</span>
    </v-toolbar>
    <v-divider class="mx-4"></v-divider>
    <v-toolbar color="rgba(0,0,0,0)" flat>
        <strong>Total</strong><v-spacer></v-spacer><strong>R$ {{subtotal - desconto}}</strong>
    </v-toolbar>
    <strong class="ml-5">Pagamentos</strong>
    <input v-model="valorPagamento" placeholder="valor pagamento">
    <v-item-group mandatory class="mt-n1">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" md="4">
                    <v-item v-slot="{active,toggle}">
                        <v-card color="#f6efee" :class="active ? 'borderme' : ''" class="d-flex align-center rouded-lg" dark height="70" @click="toggle" flat>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-list-item three-line class="text-center mt-1">
                                        <v-list-item-content>
                                            <div>
                                                <v-icon :color="active ? '#d40279' : 'black'"> fas fa-money-bill-wave</v-icon>
                                            </div>
                                            <v-list-item-subtitle :class="'black--text'" class="mt-n2 caption">Dinheiro</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-item>
                </v-col>
                <v-col cols="12" md="4">
                    <v-item v-slot="{active,toggle}">
                        <v-card color="#f6efee" :class="active ? 'borderme' : ''" class="d-flex align-center rouded-lg" dark height="70" @click="toggle" flat>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-list-item three-line class="text-center mt-1">
                                        <v-list-item-content>
                                            <div>
                                                <v-icon :color="active ? '#d40279' : 'black'"> fas fa-credit-card</v-icon>
                                            </div>
                                            <v-list-item-subtitle :class="'black--text'" class="mt-n2 caption">Crédito Parcelado</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-item>
                </v-col>
                <v-col cols="12" md="4">
                    <v-item v-slot="{active,toggle}">
                        <v-card color="#f6efee" :class="active ? 'borderme' : ''" class="d-flex align-center rouded-lg" dark height="70" @click="toggle" flat>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-list-item three-line class="text-center mt-1">
                                        <v-list-item-content>
                                            <div>
                                                <v-icon :color="active ? '#d40279' : 'black'"> fas fa-credit-card</v-icon>
                                            </div>
                                            <v-list-item-subtitle :class="'black--text'" class="mt-n2 caption">Crédito à vista</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-item>
                </v-col>
                <v-col cols="12" md="4">
                    <v-item v-slot="{active,toggle}">
                        <v-card color="#f6efee" :class="active ? 'borderme' : ''" class="d-flex align-center rouded-lg" dark height="70" @click="toggle" flat>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-list-item three-line class="text-center mt-1">
                                        <v-list-item-content>
                                            <div>
                                                <v-icon :color="active ? '#d40279' : 'black'"> fa-regular fa-credit-card</v-icon>
                                            </div>
                                            <v-list-item-subtitle :class="'black--text'" class="mt-n2 caption">Débito</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-item>
                </v-col>
                <v-col cols="12" md="4">
                    <v-item v-slot="{active,toggle}">
                        <v-card color="#f6efee" :class="active ? 'borderme' : ''" class="d-flex align-center rouded-lg" dark height="70" @click="toggle" flat>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-list-item three-line class="text-center mt-1">
                                        <v-list-item-content>
                                            <div>
                                                <v-icon :color="active ? '#d40279' : 'black'"> fa-brands fa-pix</v-icon>
                                            </div>
                                            <v-list-item-subtitle :class="'black--text'" class="mt-n2 caption">Pix</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-item>
                </v-col>
            </v-row>
        </v-container>
    </v-item-group>
    <div class="mx-3 mt-2">
        <v-btn color="#d40279" block dark class="widthoutupercase">Finalizar</v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
    data:()=>({
       cliente:{
            tipo: 'cliente',//definir de acordo com o usuario logado 
            nome: 'Renato Exemplo',
       },
       vendedor:{
            tipo: 'vendedor',//definir de acordo com o usuario logado 
            nome: 'Cliente não identificado',
       },
       produtos:[
           {
            id:'6638',
            descricao:'Enfeite Decorativo',
            valor:4.99,
            quantidade:1,
            img:'https://fashionbiju.vteximg.com.br/arquivos/ids/171923-500-500/1-11-.png?v=637600730815200000'
           },
           {
            id:'2314',
            descricao:'pó facial ruby rose',
            valor:5.12,
            quantidade:2,
            img:'https://fashionbiju.vteximg.com.br/arquivos/ids/163772-800-800/IMG_8185-Editar.jpg?v=637285161415870000'
           },
           {
            id:'2314',
            descricao:'pó facial ruby rose',
            valor:5.12,
            quantidade:2,
            img:'https://fashionbiju.vteximg.com.br/arquivos/ids/163772-800-800/IMG_8185-Editar.jpg?v=637285161415870000'
           },
           
        ],
        subtotal:14.00,
        desconto:0,
        pagamentos:[{
            dinheiro:14.00,
            cartaoCredito:10.00,
        }],
        function:{
            addProduct: ()=>{
            },
            removeProduct: ()=>{        
            }
        }

    })
}
</script>

<style>
    .v-card.borderme{
        border:2px solid #d40279 !important;
    }
    .col-12{
        padding: 5px !important;
    }
    .v-btn.widthoutupercase{
        text-align: none !important;
    }
</style>