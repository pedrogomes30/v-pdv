<template>
  <div v-if="load" class="loading-overlay">
    <div class="loading-spinner">
      <div class="spinner-border" role="status"></div>
      <span class="loading-message">Carregando...</span>
    </div>
  </div>
</template>


<script>
export default {
  name:'LoadComponent',
  components: {
    
  },
  data() {
    return {
      load: false
    };
  },
  created() {
    this.$eventBus.on('load', this.setLoad);
  },
  beforeUnmount() {
    this.$eventBus.off('load', this.setLoad);
  },
  methods: {
    setLoad(value) {
      this.load = value;
    }
  }
};
</script>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; 
}

.loading-spinner {
  display: flex;
  align-items: center;
  color: var(--bs-primary);
}

.loading-message {
  margin-left: 10px;
  color: var(--bs-primary);
}
</style>