<template>
  <div>
      <SideMenu />
      <div :style="noIsLoginPage?{'margin-left': '100px'}:''">
        <router-view/>
      </div>
  </div>
</template>

<script>
  

export default {
  name: 'App',
  computed:{
    noIsLoginPage(){
      return this.$route.name !== "login"
    }
  },
  component:{
    }, 
  
  
  data: () => ({
    //
  }),
};
</script>
<style >
a { text-decoration: none; }


</style>
