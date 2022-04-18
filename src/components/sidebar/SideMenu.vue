<template>
  <div class="sidebar" :style="{width: sidebarWisth}">
        <div v-if="collapsed">
            <v-avatar class="d-block text-center mx-auto mt-4" size="36">
                <v-img src="../../assets/defaultUser.jpg" />
            </v-avatar>
        </div>
        <div v-else>
            <v-avatar class="d-block text-center mx-auto mt-4" size="56">
                <v-img src="../../assets/defaultUser.jpg" />
            </v-avatar>
        </div>
        <SidebarMenuLink to="/novidades" icon="fas fa-newspaper">Novidades</SidebarMenuLink>
        <SidebarMenuLink to="/caixa" icon="fas fa-cart-plus">Novidades</SidebarMenuLink>
        <SidebarMenuLink to="/historico" icon="fas fa-history">Novidades</SidebarMenuLink>
        <SidebarMenuLink to="/fechamentoCaixa" icon="mdi-cart-check">Novidades</SidebarMenuLink>
        <SidebarMenuLink to="/clientes" icon="fas fa-users">Novidades</SidebarMenuLink>
        <SidebarMenuLink to="/promocao" icon="fas fa-percent">Novidades</SidebarMenuLink>
        <SidebarMenuLink to="/configuracao" icon="fas fa-cog">Novidades</SidebarMenuLink>
        <span class="collapse-icon" :class="{'rotate-180':collapsed}" @click="toggleSidebar">
            <i class="fas da-angle-double-left"></i>
        </span>

  </div>
</template>

<script>
import {collapsed, toggleSidebar, sidebarWidth} from './state'
import {SideMenuLink} from './SideMenuLink.vue'
export default {
    props:{
        components: {SideMenuLink},
    },
    setup(){
        return {collapsed,toggleSidebar,sidebarWidth}
    },
}
</script>

<style>
:root{
    --sidebar-bg-color: #4A1C35;
    --sidebar-item-hover: #ED0280;
    --sidebar-item-active: #FF4FAD;
}
</style>
<style scoped>
.sidebar{
    color:white;
    background-color: var(--sidebar-bg-color);

    float:left;
    position:fixed;
    z-index:1;
    top:0;
    left:0;
    bottom:0;
    padding:0.5em;

    transition: 0.3s ease;

    display:flex;
    flex-direction: column;
}
;collapsed-icon{
    position:absolute;
    bottom:0;
    padding:0.75em;
    color:white;
    transition:0.2s linear;
}
.rotate-180{
    transform: rotate(180deg);
    transition: 0.2s linear;
}
</style>