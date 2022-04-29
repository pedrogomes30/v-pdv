<template>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="../../assets/defaultUser.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{user}}</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
          color="#ED0280"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    <div class="logout">
        <v-list dense>
            <v-list-item to="/">
                <v-list-item-icon>
                    <v-icon title="Deslogar">fas fa-sign-out-alt</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Deslogar</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
    </v-navigation-drawer>
</template>

<script>
export default {
    name:"SideMenu",
    props:{},
    setup(){
        
        },
    data:()=>({
        selectedItem: 0,
        drawer: true,
        mini: true,
        user: 'Admin',
        userImg: '../../assets/defaultUser.jpg',
        items: [
            {icon:'fas fa-newspaper',title:'Novidades',link:'novidades'},
            {icon:'fas fa-cart-plus',title:'Caixa',link:'caixa'},
            {icon:'fas fa-history',title:'Histórico',link:'historico'},
            {icon:'mdi-cart-check',title:'Fechamento',link:'fechamentoCaixa'},
            {icon:'fas fa-users',title:'Clientes',link:'clientes'},
            {icon:'fas fa-percent',title:'Promoções', link:'promocao'},
            {icon:'fas fa-cog',title:'Configurações',link:'configuracao'},
        ],
    }),
    methods:
    
}
</script>

<style>

.logout{
    position: absolute;
    bottom:20px; 
    margin-left: auto;
    margin-right: auto;
}
</style>