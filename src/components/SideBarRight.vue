<template>
  <v-navigation-drawer app color="white" right width="400">
      <strong class="ml-3">Resumo da venda</strong>
      <v-list subheader two-line class="mt-1">
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
      <strong class="ml-3">Produtos selecionados</strong>
      <v-list subheader two-line  class="mt-1">
          <v-list-item v-for="(produto,i) in produtos" :key="i" active-class="border" :ripple="false">
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
      </v-list>
    <v-toolbar color="rgba(0,0,0,0)" flat>
        <strong>Subtotal</strong>
            <v-spacer></v-spacer>
            <strong>R$ {{subtotal}}</strong>
    </v-toolbar>
    <v-toolbar color="rgba(0,0,0,0)" flat>
        <span>Descontos R${{desconto}}</span>
            
    </v-toolbar>
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