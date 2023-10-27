<template>
  <div v-if="form" class="form-center w-100 h-100" @click="closeForm">
    <form class='base-content ads-form' @click.stop>
      <div class="mb-3">
        <label for="text" class="form-label">Digite o código cupom</label>
        <input type="text" class="form-control" id="cod_cupom" aria-describedby="emailHelp">
        <div id="text" class="form-text">Descontos só são validos mediante a um cupom!</div>
      </div>
      <div class="mb-3">
        <label class="form-label">{{description}}</label>
      </div>
      <button @click="formAction" type="submit" class="btn btn-primary ">Adicionar</button>
    </form>
  </div>
</template>



<script>
export default {
  name:'CupomForm',
  components: {
    
  },
  data() {
    return {
      form: false,
      description:'',
    };
  },
  created() {
    this.$eventBus.on('cupomForm', this.setForm);
  },
  beforeUnmount() {
    this.$eventBus.off('cupomForm', this.setForm);
  },
  methods: {
    setForm(value) {
      this.form = value;
    },
    formAction(){
      //form logic here

      this.$eventBus.emit('cupomForm', false);
    },
    closeForm(){
      this.$eventBus.emit('cupomForm', false);
    }
  }
};
</script>
<style scoped>


.ads-form{
  height: unset;  
}
</style>