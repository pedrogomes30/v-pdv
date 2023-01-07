<template>
    <v-navigation-drawer
      style=
      "border-radius:5px;
      margin:0.3%;
      border-right: solid 1px var(--primary);
      height: 98vh;"
      v-model="drawer"
      :mini-variant="mini"      
      app
      floating
      :expand-on-hover.sync="mini"
    >
      <v-list-item class="pa-0"  >
        <div class="d-flex flex-row pa-0 " >
        <v-list-item-avatar class="ma-2" size="45">
          <v-img  src='../../assets/defaultUser.jpg'></v-img>
        </v-list-item-avatar>
        <div class="pl-3 pt-2">
          <v-list-item-title><b>{{user.user_name}}</b></v-list-item-title>
          <v-list-item-subtitle>{{user.cashier_name }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{user.profession}}</v-list-item-subtitle>
        </div>
        </div>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense >
        <v-list-item
          v-for="item in (user.is_manager ? items_manager : items)"
          :key="item.title"
          link
          :to="item.link"
          color="var(--primary)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logoff()" >
            <v-list-item-icon>
                <b><v-icon title="Deslogar">fas fa-sign-out-alt</v-icon></b>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title ><b>Deslogar</b></v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
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
        items_manager: [
            {icon:'fas fa-newspaper',title:'Novidades',link:'/'},
            {icon:'fas fa-cart-plus',title:'Caixa',link:'caixa'},
            {icon:'fas fa-history',title:'Histórico',link:'historico'},
            {icon:'mdi-cart-check',title:'Fechamento',link:'fechamentoCaixa'},
            {icon:'fa fa-scale-balanced',title:'Balanço',link:'product_count'},
            {icon:'fa fa-boxes-packing',title:'Solicitar produtos', link:'solicitar_produto'},
        ],
        items: [
            {icon:'fas fa-newspaper',title:'Novidades',link:'/'},
            {icon:'fas fa-cart-plus',title:'Caixa',link:'caixa'},
            {icon:'fas fa-history',title:'Histórico',link:'historico'},
            {icon:'mdi-cart-check',title:'Fechamento',link:'fechamentoCaixa'},
        ],
    }),
    methods:{
      menuSet(){
        if(this.user.is_manager !== 1){
          this.items = this.items.slice(3,2);
          console.log("ITEMS",this.items)
          return this.items
        }else{
          return this.items
        }
      },      
      logoff(){
        this.$store.dispatch('logout')  
        router.push('/login')
      },
     
    },
    
    
}
</script>

<style>


</style>