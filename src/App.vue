<template>
  <nav class="navbar bg-dark" >
    <router-link to="/">Inicio</router-link>
    <router-link to="/cashier">Caixa</router-link>
    <router-link to="/closure_cashier">Fechamento</router-link>
    <router-link to="/history">Historico</router-link>
    <router-link to="/storage_balance">Balanço</router-link>
    <router-link to="/product_request">Solicitar Produto</router-link>
  </nav>
  <router-view/>
</template>

<style>
</style>
