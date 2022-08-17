<template>
    <v-navigation-drawer
      style="border-radius:5px;margin:0.3%"
      v-model="drawer"
      :mini-variant="mini"      
      app
      floating
      :expand-on-hover.sync="mini"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src='../../assets/defaultUser.jpg'></v-img>
        </v-list-item-avatar>
        <v-container>
          <v-list-item-title><b>{{user.user_name}}</b></v-list-item-title>
          <v-list-item-subtitle>{{user.cashier_name }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{user.profession}}</v-list-item-subtitle>
        </v-container>
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
            <v-list-item @click="logoff()" >
                <v-list-item-icon>
                    <b><v-icon title="Deslogar">fas fa-sign-out-alt</v-icon></b>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title ><b>Deslogar</b></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
    </v-navigation-drawer>
</template>

<script>
import router from '@/router';
export default {
    name:"SideMenu",
    props:{},
    setup(){
        
        },
    computed:{
      user(){
        return this.$store.state.auth.cashier_session
      }
    },
    data:()=>({
        selectedItem: 0,
        drawer: true,
        mini: true,
        closeMenu: false,
        time:0,
        userImg: '../../assets/defaultUser.jpg',
        items: [
            {icon:'fas fa-newspaper',title:'Novidades',link:'/'},
            {icon:'fas fa-cart-plus',title:'Caixa',link:'caixa'},
            {icon:'fas fa-history',title:'Histórico',link:'historico'},
            {icon:'mdi-cart-check',title:'Fechamento',link:'fechamentoCaixa'},
            {icon:'fas fa-percent',title:'Produtos e Promoções', link:'promocao'},
            // {icon:'fas fa-cog',title:'Configurações',link:'configuracao'},
        ],
    }),
    methods:{
      async  onCloseMenu() {
        this.time = 3000
        if(!this.closeMenu){
          this.closeMenu = true
          await setTimeout(() => {
            this.mini = true
            this.closeMenu = false
          }, this.time);
        }
      },
      
      logoff(){
        this.$store.dispatch('logout')  
        router.push('/login')
      }
    },
    
    
}
</script>

<style>


</style>