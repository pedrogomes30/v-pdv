<template>
  <div v-if="form" class="form-center w-100 h-100" @click="closeForm">
    <div class="base-content ads-form text-light" @click.stop>
      <div class="mb-3">
        <i class="bi bi-person-vcard text-light pe-2"></i>
        <label autofocus for="number" class="form-label">{{edit ? 'Cpf /Cnpj' :'Procure por Cpf / Cnpj'}}</label>
        <input v-model="person.document" v-document class="form-control" @blur="searchCustomer" />
      </div>
      <div v-if="edit">
        <div class="mb-3">
          <i class="bi bi-person text-light pe-2"></i>
          <label  for="number" class="form-label">Nome:</label>
          <input v-model="person.name" class="form-control" />
        </div>
        <div class="mb-3">
          <i class="bi bi-envelope-at text-light pe-2"></i>
          <label  for="number" class="form-label">Email:</label>
          <input v-model="person.email" class="form-control" />
        </div>
        <div class="mb-3">
          <i class="bi bi-telephone text-light pe-2"></i>
          <label  for="number" class="form-label">Telefone:</label>
          <input v-model="person.phone" class="form-control" />
        </div>
      </div>
      <div v-else>
        <div class="mb-3">
          <i v-if="person.name !== ''" class="bi bi-person text-light pe-2"></i>
          <label v-if="person.name !== ''" for="number" class="form-label">{{"Nome: "+ person.name}}</label>
        </div>
        <div class="mb-3">
          <i v-if="person.email !== ''" class="bi bi-envelope-at text-light pe-2"></i>
          <label v-if="person.email !== ''" for="number" class="form-label">{{"Email: "+ person.email }}</label>
        </div>
      </div>
      <button v-if="edit" @click="formAction" class="btn btn-primary">Cadastrar</button>
      <button v-else @click="formAction" class="btn btn-primary">Adicionar</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getCustomer, setCustomer } from "@/services/api/person";
import { typeDocument } from "@/services/valueFormat";

export default {
  name: "CustomerForm",
  components: {},
  data() {
    return {
      form: false,
      person:{
        id: "",
        document: "",
        name: "",
        email: "",
        phone: "",
        type: "",
      },
      edit: false,
    };
  },
  created() {
    this.$eventBus.on("customerForm", this.setForm);
  },
  beforeUnmount() {
    this.$eventBus.off("customerForm", this.setForm);
  },
  methods: {
    ...mapActions("person", ["addCustomer"]),
    setForm(value) {
      this.form = value;
    },
    async formAction() {
      try{
        this.$global.load = true;
        this.$eventBus.emit('load', this.$global.load);
        this.person.document = this.person.document.replace(/[^\d]+/g,'');
        let response = await setCustomer(this.person);
        this.addCustomer(response);
        this.$global.alert = {show:true,type:'info', message:'Cliente cadastrado com sucesso!'};
        this.$eventBus.emit('alert-show', this.$global.alert); 
        this.resetPerson();
        this.$eventBus.emit("customerForm", false);
        this.$global.load = false;
        this.$eventBus.emit('load', this.$global.load);
      }catch(err){
        this.$global.load = false;
        this.$eventBus.emit('load', this.$global.load);
        this.$global.alert = {show:true,type:'error', message:err.message};
        this.$eventBus.emit('alert-show', this.$global.alert);    
      }
    },
    closeForm() {
      this.resetPerson();
      this.$eventBus.emit("customerForm", false);
    },
    enableEdit() {
      if(this.person.document == "" || this.person.document == null){
        this.edit = false;
      }
      if(this.person.document && this.person.id == ""){
        this.edit = true;
      }
    },
    async searchCustomer(){
      if(this.person.document == "" || this.person.document == null){
        this.enableEdit();
        return;
      }
      try{
        let document = this.person.document.replace(/[^\d]+/g,'');
        this.$global.load = true;
        this.$eventBus.emit('load', this.$global.load);
        this.person = await getCustomer(document);
        this.person.document = typeDocument(this.person.document);
        this.$global.load = false;
        this.$eventBus.emit('load', this.$global.load);
      }catch(err){
        this.$global.load = false;
        this.$eventBus.emit('load', this.$global.load);
        this.$global.alert = {show:true,type:'error', message:err.message};
        this.$eventBus.emit('alert-show', this.$global.alert);  
        this.resetPerson(true);  
      }
      this.enableEdit();
      console.log(this.person)
    },
    resetPerson(parcial = false){
      if(parcial){
        this.person.id = "";
        this.person.name = "";
        this.person.email = "";
        this.person.phone = "";
        this.person.type = "";

      }else{
        this.person = {
          id: "",
          document: "",
          name: "",
          email: "",
          phone: "",
          type: "",
        }
      }
    }
  },
  
  
};
</script>

<style scoped></style>
