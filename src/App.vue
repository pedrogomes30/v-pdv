<template>
  <v-app>
    <v-main v-if="noIsLoginPage">
        <SideMenu />
        <router-view/>
    </v-main>
    <v-main v-else>
      <LoginPage />
    </v-main>

  </v-app>
</template>

<script>
  import SideMenu from './components/sidebar/SideMenu.vue';
  import LoginPage from './views/LoginPage.vue'
export default {
  name: "App",
  computed:{
    noIsLoginPage(){
      return this.$route.name !== "login"
    }
  },
  components:{
    SideMenu,
    LoginPage,
    }, 
  setup(){
    
  },
  
  data: () => ({
    
  }),
};
</script>
<style >
a { text-decoration: none; }
:root{
    --primary:#ED0280;
    --secondary: #FF4FAD;
    --accent:#4A1C35;
    --backgroundLight: #ffc9fd;
    
}
.v-main{
  width: 100%;
}

</style>
