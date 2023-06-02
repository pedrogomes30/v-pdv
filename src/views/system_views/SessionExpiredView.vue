<template>
  <div class="session-expired-container">
    <i class="bi bi-emoji-frown-fill text-light crying-icon"></i>
    <h1>Sessão expirada</h1>
    <p>Desculpe, sua sessão expirou. Por favor, faça login novamente.</p>
  </div>
</template>

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

<script>
    import router from '@/router';
    export default {
        name:'SessionExpiredView',
        mounted(){
            setTimeout(() => {
                router.push("/login");
            }, 3000)
        }
    }
</script>