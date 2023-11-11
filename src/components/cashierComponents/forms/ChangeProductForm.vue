<template>
  <div v-if="form" class="form-center " @click="closeForm">
    <form class='base-content ads-form' @click.stop @submit.prevent="formAction">
      <div class="mb-3">
        <label for="obs" class="">Adicionar observação :</label>
        <textarea v-model="localObs" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Adicionar</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { putCupom } from '../../../services/api/cupom'
import { format, addMonths } from 'date-fns';


export default {
  name: 'ChangeProductForm',
  components: {},
  data() {
    return {
      form: false,
      changeCupom: {
        active: 1,
        acumulate: 1,
        allproducts: 1,
        code: 'TROCPROD',
        default: 0,
        description: 'cupom de troca do produto:', //cupom de troca do produto:{{produto.sku}} {{product.name}}
        label: "",
        percent: 1,
        quantity: null,
        start_date: '',//now YYYY-MM-DD HH:MM:SS
        end_date: '',// now + 1 month
        value: 10,
        with_validity: 1,
      },
    };
  },
  created() {
    this.$eventBus.on('changeProductForm', this.setForm);
  },
  beforeUnmount() {
    this.$eventBus.off('changeProductForm', this.setForm);
  },
  beforeMount() {
    this.setStartDate();
    this.setEndDate();
  },
  
  methods: {
    ...mapActions('cupom', ['addCupom']),
    setForm(value) {
      this.form = value;
    },
    formAction() {
      this.changeCupom = putCupom(this.changeCupom);
      this.addCupom(this.changeCupom);
      this.closeForm();
    },
    closeForm() {
      this.$eventBus.emit('changeProductForm', false);
    },
    setStartDate() {
      let now = new Date();
      this.changeCupom.start_date = format(now, 'yyyy-MM-dd HH:mm:ss');
    },
    setEndDate() {
      let now = new Date();
      let endDate = addMonths(now, 1);
      this.changeCupom.end_date = format(endDate, 'yyyy-MM-dd HH:mm:ss');
    },
  },
};
</script>

<style scoped>
</style>
