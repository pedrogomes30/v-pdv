<template>
  <transition name="fade">
    <div v-if="alert.show" :class="getType(alert.type)" role="alert" @click="closeAlert()">
      <i :class="[getIcon(alert.type)]"></i>
      <span class="alert-message">{{alert.message}}</span>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      alert: {
        show: false,
        type: 'error',
        message: ''
      }
    };
  },
  name: 'AlertComponent',
  created() {
    this.$eventBus.on('alert-show', this.showAlert);
  },
  beforeUnmount() {
    this.$eventBus.off('alert-show', this.showAlert);
  },
  methods: {
    showAlert(value) {
      this.alert = value;
      setTimeout(() => {
        this.closeAlert();
      }, 3000);
    },
    getIcon(type) {
      const types = {
        'info': 'bi bi-info-square',
        'warning': 'bi bi-exclamation-diamond',
        'error': 'bi bi-x-square'
      };

      return types[type] || 'bi bi-info-square';
    },
    getType(type) {
      const types = {
        'info': 'alert-container info',
        'warning': 'alert-container warning',
        'error': 'alert-container error'
      };
      
      return types[type] || 'alert-container info';
    },
    closeAlert() {
      this.alert = {
        show: false,
        type: 'warning',
        message: ''
      };
    }
  }
};
</script>


<style>
.alert-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 400px;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #f8f9fa;
  z-index: 9999;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.alert-container.info {
  background-color: #cce5ff;
  color: #0c63e4;
}

.alert-container.warning {
  background-color: #fff3cd;
  color: #e8a317;
}

.alert-container.error {
  background-color: #f8d7da;
  color: #dc3545;
}

.alert-container.fade-enter-active,
.alert-container.fade-leave-active {
  transition: opacity 0.3s ease;
}

.alert-container.fade-enter,
.alert-container.fade-leave-to {
  opacity: 0;
}

.alert-container i {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.alert-message {
  flex-grow: 1;
}

.btn-close {
  font-size: 1.2rem;
  margin-left: 1rem;
  opacity: 0.7;
}

.btn-close:hover {
  opacity: 1;
}
</style>
