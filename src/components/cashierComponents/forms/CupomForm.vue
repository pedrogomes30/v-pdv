<template>
  <div v-if="form" class="form-center w-100 h-100" @click="closeForm">
    <form class='base-content ads-form' @click.stop>
      <div class="mb-3">
        <label for="text" class="form-label">Digite o código cupom</label>
        <input type="text" v-model="cupomSelected.code" class="form-control" id="cod_cupom" @blur="searchCupom()">
        <div id="text" class="form-text">Descontos só são validos mediante a um cupom!</div>
      </div>
      <div v-if=cupomSelected.description class="mb-3">
        <label class="form-label">{{cupomSelected.description}}</label>
      </div>

      <div class="mb-3">
        <label for="defaultCupons" class="form-label">Cupons padrões</label>
        <div v-for="(cupon, index) in defaultCupons" :key="index" class="form-check">
          <input class="form-check-input" type="radio" :id="`cupom-${index}`" :value="cupon" name="cupom" @click="setSelect(cupon)">
          <label class="form-check-label" :for="`cupom-${index}`">
            {{ cupon.code }} - {{ cupon.description }}
          </label>
        </div>
      </div>

      <button @click="formAction" type="submit" class="btn btn-primary ">Adicionar</button>
    </form>
  </div>
</template>

<script>
import system from '../../../services/database/system'
import { getCupom } from '../../../services/api/cupom'
import { mapActions } from 'vuex';

export default {
  name: 'CupomForm',
  components: {},
  data() {
    return {
      form: false,
      description: '',
      defaultCupons: [],
      cupomSelected: {
        code: '',
        description: '',
      },
    };
  },
  created() {
    this.$eventBus.on('cupomForm', this.setForm);
  },
  beforeUnmount() {
    this.$eventBus.off('cupomForm', this.setForm);
  },
  methods: {
    ...mapActions('cupoms', ['addcupoms']),
    setForm(value) {
      this.form = value;
    },
    formAction() {
      this.$eventBus.emit('cupomForm', false);
    },
    closeForm() {
      this.$eventBus.emit('cupomForm', false);
    },
    setSelect(selected) {
      this.cupomSelected = selected;
    },
    async searchCupom() {
      this.$global.load = true;
      this.$eventBus.emit('load', this.$global.load);
      this.apiLoad = true;
      console.log('Função searchCupom acionada');
      if (this.cupomSelected.code === '') {
        this.$global.load = false;
        this.$eventBus.emit('load', this.$global.load);
        return;
      }
      try{
        this.cupomSelected = await getCupom(this.cupomSelected.code);
        this.$global.load = false;
        this.$eventBus.emit('load', this.$global.load);
        this.addcupoms(this.cupomSelected);
        this.$global.alert = {show:true,type:'success',message:'Cupom adicionado com sucesso!'};
        this.cupomSelected = {
          code: '',
          description: '',
        };
        // this.#global.cupomForm = false;
        // this.$eventBus.emit('cupomForm', false);
        //send cupom to current sale
      }catch(err){
        this.$global.load = false;
        this.$eventBus.emit('load', this.$global.load);
        this.$global.alert = {show:true,type:'error',message:err.message};
        this.$eventBus.emit('alert-show', this.$global.alert);  
      }
    },
  },
  async beforeMount() {
    let data = await system.get();
    if (data.length > 0) {
      this.defaultCupons = data[0][0].cupoms;
    }
  },
};
</script>

<style scoped>

</style>
