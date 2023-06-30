<template>
  <div class="session-expired-container">
    <i class="bi bi-emoji-frown-fill text-light crying-icon"></i>
    <h1>Sessão expirada</h1>
    <p>Desculpe, sua sessão expirou. Por favor, faça login novamente.</p>
  </div>
</template>

<script>
  import router from '@/services/router';
  export default {
    name:'SessionExpiredView',
    mounted(){
      setTimeout(() => {
        router.push("/login");
      }, 3000)
    },
    beforeMount() {
      this.$global.showNavbar = false;
      this.$eventBus.emit('navbar-updated', this.$global.showNavbar);
    },
  }
</script>

<style>
.session-expired-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.crying-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}
</style>
