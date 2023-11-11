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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ObsForm',
  components: {},
  data() {
    return {
      localObs: '',
      form: false,
    };
  },
  computed: {
    ...mapState('currentSale', {
      saleObs: state => state.obs
    }),
  },
  created() {
    this.$eventBus.on('obsForm', this.setForm);
  },
  beforeUnmount() {
    this.$eventBus.off('obsForm', this.setForm);
  },
  beforeMount() {
    console.log(this.saleObs);
    this.localObs = this.saleObs;
  },
  methods: {
    ...mapActions('currentSale', ['addObs']),
    setForm(value) {
      this.form = value;
    },
    formAction() {
      this.addObs(this.localObs);
      this.closeForm();
    },
    closeForm() {
      this.$eventBus.emit('obsForm', false);
    },
  },
};
</script>

<style scoped>
</style>
