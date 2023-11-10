<template>
  <div class="actions-info mt-1 ">
    <button @click="showObsForm()" class=" col-3 pr-1 btn action-btn" title='Observação'>
        <i class="bi bi bi-info-square px-2"></i>
        <br>
        <span class='show-on-mobile'>Observação</span>
    </button>
    <button @click="updateProducts" class=" col-3 pr-1 btn action-btn mx-1" title='Troca de produto'>
        <i class="bi bi bi-box-seam-fill px-2"></i>
        <br>
        <span class='show-on-mobile'>Troca de produto</span>
    </button>
    <button @click="updateProducts" class=" col-2 pr-1 btn btn-danger me-1" title='Limpa venda'>
        <i class="bi bi-cart-x px-2"></i>
        <br>
        <span class='show-on-mobile'>Limpa venda</span>
    </button>
    <button @click="updateProducts" class=" col  btn btn-primary" title='Finaliza compra'>
        <i class="bi bi bi-bag-check px-2"></i>
        <br>
        <span class='show-on-mobile'>Finaliza compra</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CashierDetailsHandler',
  methods: {
    showObsForm(){
      this.$global.system.formStatus.obsForm = true;
      this.$eventBus.emit('obsForm', this.$global.system.formStatus.obsForm);
    }
  }
}
</script>

<style scoped>
.actions-info{
  /* background-color:  ; */
  color: var(--bs-light);
  display: flex;
  flex-direction: row;
  height:15%;
  width: 100%;
  font-size: 0.70rem;
  border-radius: 10px;
}

.action-btn{
    background-color: var(--bs-gray-800);
    border: 1px solid black;
    color: white;
}

.btn-danger{
  border: solid 1px black;
}

i{
  font-size: 2rem;
}

@media (max-width: 1280px) {
  .show-on-mobile {
    display: none;
  }
}
</style>