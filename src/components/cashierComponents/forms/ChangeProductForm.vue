<template>
  <div v-if="form" class="form-center " @click="closeForm">
    <form class='base-content ads-form' @click.stop @submit.prevent="formAction">
      <div class="mb-3">
        <i class="bi bi bi-box-seam-fill v-card text-light pe-2"></i>
        <label for="number" class="form-label">Codigo do produto </label>
        <input autofocus v-model="product.sku" class="form-control" v-ean @blur="searchProduct" />
      </div>
      <div v-if="'' == product.description" class="form-check">
        <input class="form-check-input" type="checkbox" v-model="noProductCode" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
          Sem cod. produto
        </label>
      </div>
      <!-- gettering product form -->
      <div v-if="'' != product.description" class="mb-3">
        <i class="bi bi-list-nested text-light pe-2"></i>
        <label for="number" class="form-label">Descrição: {{ product.description }} </label>
      </div>
      <div v-if="'' != product.description" class="mb-3">
        <i class="bi bi-upc text-light pe-2"></i>
        <label for="number" class="form-label">Sku: {{ product.sku }} </label>
      </div>
      <div v-if="'' != product.price" class="mb-3">
        <i class="bi bi-currency-dollar text-light pe-2"></i>
        <label for="number" class="form-label">Valor:</label>
        <input  v-model="product.price" class="form-control" v-currency />
      </div>
      <div v-if="'' != product.price" class="mb-3">
        <i class="bi bi-boxes text-light pe-2"></i>
        <label for="number" class="form-label">Quantidade: </label>
        <input  v-model="quantity" class="form-control"/>
      </div>
      <!-- no product form -->
      <div v-if="noProductCode">
        <div class="mb-3">
          <i class="bi bi-currency-dollar text-light pe-2"></i>
          <label for="number" class="form-label">Preço: </label>
          <input  v-model="changeCupom.price" class="form-control" v-currency  />
        </div>
        <div class="mb-3">
          <i class="bi bi-boxes text-light pe-2"></i>
          <label for="number" class="form-label">Quantidade </label>
          <input v-model="quantity" class="form-control"   />
        </div>
      </div>

      <!-- submit -->
      <button type="submit" class="btn btn-primary">Adicionar</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// import { saveCupom } from '@/services/api/cupom'
import { format, addMonths } from 'date-fns';
import { getProduct } from '@/services/api/products';


export default {
  name: 'ChangeProductForm',
  components: {},
  data() {
    return {
      form: false,
      noProductCode: false,
      changeCupom: {
        label: "produto",
        code: "PROD",
        value: 0,
        active: 1,
        default: 1,
        description: "aplica R${producValue} para troca de produto",
        allproducts: 1,
        percent: 0,
        acumulate: 0,
        quantity: null,
        with_validity: 0,
        start_date: null,
        end_date: null,
        customer_id: null
      },
      product:{
        brand: "",
        categoria_id: 0,
        categoria_name: "",
        cest: "",
        description: "",
        id: 0,
        ncm: "",
        origem: "",
        price: 0,
        situacaoTributaria: "",
        sku: "",
        website: null,
      },
      quantity:1,
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
    ...mapActions('currentSale', ['addCupom']),
    setForm(value) {
      this.form = value;
    },
    formAction() {
      if(this.changeCupom.value === undefined){
        console.log("sem preço");
        return;
      }
      this.changeCupom.quantity = this.quantity;
      this.changeCupom.value = this.changeCupom.value * this.quantity;
      // saveCupom(this.changeCupom);

      this.addCupom(this.changeCupom);
      this.resetForm();
      this.closeForm();
    },
    closeForm() {
      this.$eventBus.emit('changeProductForm', false);
    },
    async searchProduct() {
      try{
        if(this.product.sku == ''){
          this.resetForm();
          return;
        }
        this.$global.load = true;
        this.$eventBus.emit('load', this.$global.load);
        let result = await getProduct(this.product.sku);
        this.product = result[0];
        console.log("TESTE PRODUCT",this.product);
        this.changeCupom.description = `cupom de troca do produto: ${this.product.sku} ${this.product.description}`;
        this.changeCupom.value = this.product.price;
        this.noProductCode = false;
        this.$global.load = false;
        this.$eventBus.emit('load', this.$global.load);
      }catch(err){
        this.$global.alert = {show:true,type:'error', message:err.message};
        this.$eventBus.emit('alert-show', this.$global.alert); 
        this.$global.load = false;
        this.$eventBus.emit('load', this.$global.load); 
        this.resetForm();  
      }
    },  
    resetForm() {
      this.product = {
        brand: "",
        categoria_id: 0,
        categoria_name: "",
        cest: "",
        description: "",
        id: 0,
        ncm: "",
        origem: "",
        price: 0,
        situacaoTributaria: "",
        sku: "",
        website: null,
      };
      this.changeCupom = {
        label: "produto",
        code: "PROD",
        value: 0,
        active: 1,
        default: 1,
        description: "aplica R${producValue} para troca de produto",
        allproducts: 1,
        percent: 1,
        acumulate: 0,
        quantity: null,
        with_validity: 0,
        start_date: null,
        end_date: null,
        customer_id: null
      }
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
