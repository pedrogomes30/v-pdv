<template>
  <v-app>
      <AlertComponent />
      <SideMenu v-if="noIsLoginPage()"/>
      <v-main transition="scroll-x-transition">
          <router-view />
      </v-main>
  </v-app>
</template>

<script>
  import SideMenu from './components/SysComponents/SideMenu.vue';
import AlertComponent from './components/SysComponents/AlertComponent.vue';
export default {
  name: "App",
  computed:{
    
  },
  components:{
    SideMenu,
    AlertComponent
}, 
  data: () => ({
    sidemenu:true,
  }),
  methods:{
    noIsLoginPage(){
     return this.$route.name === "login" || 
            this.$route.name === "start" || 
            this.$route.name === "NotFound" ||
            this.$route.name === "expired"
            ? false: true;
    }
  }
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
    padding: 0;
    margin: 0;
}
.v-main{
  background: var(--accent); 
}
.basePage{
  height: 100%;
  width: 98%;
  margin-left:1.5%;
}

</style>
