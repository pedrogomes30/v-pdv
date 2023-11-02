<template>
  <div class="base-content">
    <div class="construction-overlay">
      <i class="bi bi-tools construction-icon"></i>
      <h3>Em construção</h3>
      <p>Esta página ainda está sendo desenvolvida. Em breve estará disponível.</p>
    </div>
    <!-- Conteúdo da página -->
  </div>
</template>

<style>
.base-content {
  position: relative;
}

.construction-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.construction-overlay h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.construction-overlay p {
  font-size: 1rem;
  color: #555;
}

.construction-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

</style>

<script>
export default {
  name: 'CashierView',
  components: {}
};
</script>
