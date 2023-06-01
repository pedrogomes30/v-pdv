<template>
  <transition name="fade">
    <div v-if="alert.show" :class="['alert', 'alert-dismissible', 'fade', 'show', getType(alert.type),'position-fixed','w-100','d-flex','align-items-center' ]" role="alert" style="z-index: 9999;" @click="closeAlert()">
      <i :class="[getType(alert.type), getIcon(alert.type)]"></i>
      <span class="ml-2">{{alert.message}}</span>
      <button 
        type="button" 
        class="btn-close" 
        data-bs-dismiss="alert" 
        aria-label="Fechar" 
         
      ></button>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      alert:{
        show:false,
        type:'error',
        message:''
      },
      icon:'',
      type:'',
    };
  },
  name:'AlertComponent',
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
    getIcon(type){
      const types = {
        'info': 'bi bi-info-square',
        'warning': 'bi bi-exclamation-diamond',
        'error': 'bi bi-x-square'
      };

      return types[type] || 'bi bi-info-square';
    },
    getType(type) {
      const types = {
        'info': 'alert-primary',
        'warning': 'alert-warning',
        'error': 'alert-danger'
      };
      
      return types[type] || 'alert-primary';
    },
    closeAlert(){
      this.alert = {
        show:false,
        type:'warning',
        message:''
      }
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
