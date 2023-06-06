<template>
  <Load />
    <nav v-if="showNavbar" class="navbar bg-dark position-fixed w-100">
      <router-link to="/">Inicio</router-link>
      <router-link to="/cashier">Caixa</router-link>
      <router-link to="/closure_cashier">Fechamento</router-link>
      <router-link to="/history">Historico</router-link>
      <router-link to="/storage_balance">Balanço</router-link>
      <router-link to="/product_request">Solicitar Produto</router-link>
      <router-link to="/about">Informações</router-link>
    </nav>
    <Alert />
    <router-view/>

</template>

<script>
import Alert from './components/systemComponents/AlertComponent.vue'
import Load from './components/systemComponents/LoadComponent.vue'
export default {
  components: {
    Alert,
    Load
  },
  data() {
    return {
      showNavbar: false
    };
  },
  created() {
    this.$eventBus.on('navbar-updated', this.updateNavbar);
  },
  beforeUnmount() {
    this.$eventBus.off('navbar-updated', this.updateNavbar);
  },
  methods: {
    updateNavbar(value) {
      this.showNavbar = value;
    }
  }
};
</script>

<style>
</style>
