<template>
<v-app :style="{background: $vuetify.theme.themes.dark.background}">
  <SideBar />
  <SideBarRight />
</v-app>
</template>

<script>
  import SideBar from '../components/SideBar'
  import SideBarRight from '../components/SideBarRight'

  export default {
    name: 'HomeView',

    components: {
      SideBar,
      SideBarRight
    },
  }
</script>
