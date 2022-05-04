<template>
  <v-app>
    <v-main v-if="noIsLoginPage">
        <SideMenu />
        <div id="basePage">
          <router-view/>
        </div>
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
    --accent:radial-gradient( #d40279 , #541A3B);
    --backgroundLight: #ffc9fd;
    --backgroundDark: #541A3B;
    --dividerLight: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
    --dividerDark: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
    --navMenuNoBackground: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(252,252,252,0) 0%);

}
.v-main{
  width: 100%;
  background: var(--accent); 
  padding: 1%;
}
#basePage{
  height: 100vh;
  width: 95vw;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
