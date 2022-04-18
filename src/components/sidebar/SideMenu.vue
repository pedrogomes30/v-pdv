<template>
    <v-navigation-drawer v-model="drawer" app color="white" mini-variant mini-variant-width="100">
        <v-avatar class="d-block text-center mx-auto mt-4" size="56">
            <v-img src="../../assets/defaultUser.jpg" /> 
            <v-badge bordered overlap color="red" dot></v-badge>
        </v-avatar>
        <v-list flat class="mt-4">
            <v-list-item-group v-model="selectedItem">
                <v-list-item v-for="(item,i) in items" :key="i" active-class="border" :ripple="false">
                    <router-link v-bind:to="item.to">
                    <v-list-item-content v-bind:title="item.text" size="20">
                        <v-icon  v-text="item.icon" ></v-icon>
                        <v-list-item-subtitle align="center" v-text="item.text" class="mt-3 caption"></v-list-item-subtitle>
                    </v-list-item-content>
                    </router-link>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <div style="
            position: absolute;
            bottom:20px; 
            margin-left: auto;
            margin-right: auto;
            left: 0; right:0;
            text-align: center;"
        >
            <v-icon>fas fa-sign-out-alt</v-icon>
            <br>
            <span class="caption">Deslogar</span>    
        </div>
    </v-navigation-drawer>
</template>

<script>
export default {
    name:'SideMenu',
    data:()=>({
        selectedItem:0,
        drawer:null,
        items: [
            {icon:'fas fa-newspaper',text:'Novidades',to:'novidades'},
            {icon:'fas fa-cart-plus',text:'Caixa',to:'caixa'},
            {icon:'fas fa-history',text:'Histórico',to:'historico'},
            {icon:'mdi-cart-check',text:'Fechamento Caixa',to:'fechamentoCaixa'},
            {icon:'fas fa-users',text:'Clientes',to:'clientes'},
            {icon:'fas fa-percent',text:'Promoções', to:'promocao'},
            {icon:'fas fa-cog',text:'Configurações',to:'configuracao'},
        ],
    })
}
</script>

<style>
:root{
    --sidebar-bg-color: #4A1C35;
    --sidebar-item-hover: #ED0280;
    --sidebar-item-active: #FF4FAD;
}
.border {
    margin-left:8px;
    margin-right:8px;
    background: #d40279;
    border-radius: 14px;
    text-decoration: none;
}
a * {
    color:white;
}
.list-item-group .v-list-item--active {
    color: white !important;
}

.theme--light.v-list-item--active .v-list-item__subtitle, .theme--light.v-list-item .v-list-item__action-text{
    color:white !important;

}
</style>