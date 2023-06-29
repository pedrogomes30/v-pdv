<template>
  <div class="not-found-container">
    <i class="bi bi-exclamation-triangle-fill custom-icon text-light "></i>
    <h1>Página não encontrada</h1>
    <p>Desculpe, a página que você está procurando não foi encontrada.</p>
     <router-link to="/">Voltar para a página inicial</router-link>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
.custom-icon {
  font-size: 5rem;
}
</style>
