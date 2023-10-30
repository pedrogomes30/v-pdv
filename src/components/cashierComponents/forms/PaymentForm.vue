<template>
  <div v-if="form" class="form-center w-100 h-100" @click="closeForm">
    <form class='base-content ads-form' @click.stop>
      <div class="mb-3">
        <label for="number" class="form-label">informe o valor abaixo (R$)</label>
        <input type="number" class="form-control" id="cod_cupom" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">  
          <label for="inputCashier" class="form-label text-light">
            <i class="bi bi-calculator text-light "></i>
            Forma de pagamento</label>
          <select class="form-select" v-model="tempUser.cashier" id="cashier">
            <option value="">selecione forma</option>
            <option v-for="paymentSelect in paymentSelects" :value="cashier.cashier_name" :key="paymentSelect.id">{{ cashier.cashier_name }}</option>
          </select>
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
  name:'paymentForm',
  components: {
    
  },
  data() {
    return {
      form: false,
      description:'',
      paymentSelects:[],
    };
  },
  created() {
    this.$eventBus.on('paymentForm', this.setForm);
  },
  beforeUnmount() {
    this.$eventBus.off('paymentForm', this.setForm);
  },
  methods: {
    setForm(value) {
      this.form = value;
    },
    formAction(){
      //form logic here

      this.$eventBus.emit('paymentForm', false);
    },
    closeForm(){
      this.$eventBus.emit('paymentForm', false);
    }
  },
  beforeMount() {
    //get payment from 
  },
};
</script>
<style scoped>


.ads-form{
  height: unset;  
}
</style>