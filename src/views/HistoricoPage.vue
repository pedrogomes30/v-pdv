<template>
<v-app :style="{background: $vuetify.theme.themes.dark.background}">
  <SideMenu />
  <n-main>
   
  </n-main>
</v-app>
</template>

<script>
  import SideMenu from '../components/sidebar/SideMenu'
  

  export default {
    name: 'HistoricoPage',

    components: {
      SideMenu,
    },
  }
</script>