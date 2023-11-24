<template>
  <div v-if="form" class="form-center w-100 h-100" @click="closeForm">
    <div class="base-content ads-form text-light" @click.stop>
      <div class="mb-3">
        <i class="bi bi-calculator text-light pe-2"></i>
        <label autofocus for="number" class="form-label">valor (R$)</label>
        <input v-model="paymentSelect.method_value" class="form-control" v-currency />
      </div>
      <div class="mb-3">
        <i class="bi bi-currency-dollar text-light pe-2"></i>
        <label for="inputCashier" class="form-label text-light">Forma de pagamento</label>
        <select class="form-select" v-model="selectedMethod" @change="setMethod" id="payment">
          <option value="">selecione forma</option>
          <option v-for="method in methods" :value="method.method_alias" :key="method.method_id">
            {{ method.method_alias }}
          </option>
        </select>
      </div>
      <button @click="formAction" class="btn btn-primary">Adicionar</button>
    </div>
  </div>
</template>

<script>
import system from "../../../services/database/system";
import { mapActions } from "vuex";

export default {
  name: "PaymentForm",
  components: {},
  data() {
    return {
      form: false,
      description: "",
      methods: [],
      paymentSelect: {
        method_alias: "",
        method_description: "",
        method_icon: "",
        method_id: 2,
        method_issue: 1,
        method_value: "",
      },
      selectedMethod: "",
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: " #",
        precision: 2,
        masked: false,
      },
    };
  },
  created() {
    this.$eventBus.on("paymentForm", this.setForm);
  },
  beforeUnmount() {
    this.$eventBus.off("paymentForm", this.setForm);
  },
  methods: {
    ...mapActions("currentSale", ["addPayment"]),
    setForm(value) {
      this.form = value;
    },
    formAction() {
      this.paymentSelect.method_alias = this.selectedMethod;
      this.addPayment(this.paymentSelect);
      this.paymentSelect = {
        method_alias: "",
        method_description: "",
        method_icon: "",
        method_id: 2,
        method_issue: 1,
        method_value: '',
      };
      this.$eventBus.emit("paymentForm", false);
    },
    closeForm() {
      this.$eventBus.emit("paymentForm", false);
    },
  },
  async beforeMount() {
    let data = await system.get();
    if (data.length > 0) {
      this.methods = data[0][0].payment_methods;
    }
  },
  watch: {
    selectedMethod(newValue) {
      let method = this.methods.find((method) => method.method_alias === newValue);
      let value = this.paymentSelect.method_value;
      value = value.replace(/\D/g, '');
      value = (value / 100).toFixed(2);
      method.method_value = `R$ ${value}`;
      this.paymentSelect = method;
    },
  },
};
</script>

<style scoped></style>
