<template>
  <v-overlay >
    <v-progress-circular        
        size="64"
        class="d-flex justify-center align-center"
    >
    <v-icon size='50'>fa-regular fa-face-sad-cry</v-icon>
    </v-progress-circular>
    <h1>ERRO 404</h1>
    <h2>
        PÁGINA NÃO ENCONTRADA...
    </h2>
    <v-btn to="/"> voltar para o inicio</v-btn>
  </v-overlay>
</template>
<script>
export default{
  name:'NotFound',
}
</script>
