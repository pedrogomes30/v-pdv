<template>
  <v-app>
      <div v-if="noIsLoginPage()">
          <SideMenu />
      </div>
    <v-main>
        <router-view/>
    </v-main>
    <v-footer padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Vhinfo</strong>
    </v-col>
  </v-footer>
  </v-app>
</template>

<script>
  import SideMenu from './components/sidebar/SideMenu.vue';
export default {
  name: "App",
  computed:{
    
  },
  components:{
    SideMenu,
    }, 
  data: () => ({
    sidemenu:true,
  }),
  methods:{
    noIsLoginPage(){
     var sidemenu =  this.$route.name !== "login" ? true: false;
     return sidemenu
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
    
}
.v-main{
  background: var(--accent); 
}
.basePage{
  height: 100%;
  width: 98%;
  margin-left:1%;
}

</style>
