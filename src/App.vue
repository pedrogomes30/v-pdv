<template>
  <div>
      <SideMenu />
      <div :style="noIsLoginPage?{'margin-left': sidebarWidth}:''">
        <router-view/>
      </div>
  </div>
</template>

<script>
  import SideBar from './components/sidebar/SideMenu.vue';
  import {sidebarWidth} from './components/sidebar/state'

export default {
  name: 'App',
  computed:{
    noIsLoginPage(){
      return this.$route.name !== "login"
    }
  },
  component:{
    SideBar,
    }, 
  setup(){
    return {sidebarWidth}
  },
  
  data: () => ({
    //
  }),
};
</script>
<style >
a { text-decoration: none; }


</style>
