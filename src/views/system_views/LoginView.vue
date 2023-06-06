<template>
  <div class='d-flex align-items-center justify-content-center login' >
    <div class="card text-center bg-dark px-2 pb-2">
      <div class="card-header">
         <span class="nav-link text-color-gray"  >Authenticação</span>
      </div>

      <form v-if="!step" class="nav-link">
        <div class="mb-3 pl-3">
          <label for="inputEmail" class="form-label text-light">
          <i class="bi bi-person-circle text-light "></i>
            Usuário</label>
          <input type="email" class="form-control pl-3" id="login" v-model="tempUser.user" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label text-light">
            <i class="bi bi-hash text-light "></i>
            Senha</label>
          <input type="password" class="form-control" v-model="tempUser.pass" id="password">
        </div>
      </form>

      <form v-else class="nav-link">
        <div class="mb-3">
          <label for="inputStore" class="form-label text-light">
            <i class="bi bi-shop"></i>
            Loja</label>
          <input type="text" class="form-control" disabled id="store" v-model="tempUser.storage" aria-describedby="Loja">
        </div>
        <div class="mb-3">
          <label for="inputCashier" class="form-label text-light">
            <i class="bi bi-calculator text-light "></i>
            Caixa</label>
          <select class="form-select" v-model="tempUser.cashier" id="cashier">
            <option value="">Selecione um caixa</option>
            <option v-for="cashier in cashiers" :value="cashier.cashier_name" :key="cashier.cashier_id">{{ cashier.cashier_name }}</option>
          </select>
        </div>
      </form>

      <button type="submit" @click="!step ? connect() : goHome()" class="btn btn-primary px-3 custom-element">{{ step ? 'Entrar' : 'Avançar'}}</button>
    </div>
  </div>
</template>

<script>
import { login } from '../../services/api/auth'
import { start } from '../../services/api/start'
import system from '../../database/system'

export default {
  name: 'LoginPage',
  components: {
    
  },
  data:()=>({
    step: false,
    load: true,
    alert:{
      show: true,
      type: 'info',
      message:'test'
    },
    tempUser:{
      user:'',
      pass:'',
      storage: '',
      cashier: ''
    },
    cashiers:[]
  }),
  methods: {
    validate(step){
      if(!step){
        if(this.tempUser.user == '' || this.tempUser.user == null ) {return false}
        if(this.tempUser.pass == ''  || this.tempUser.pass == null )  {return false}
      }else{
        if(this.tempUser.storage == '' || this.tempUser.storage == null ) {return false}
        if(this.tempUser.cashier == '' || this.tempUser.cashier == null ) {return false}
      }
      return true;
    },
    async connect() {
      this.$global.load = true;
      this.$eventBus.emit('load', this.$global.load);
      if (this.validate(this.step)) {
        try {  
          await login(this.tempUser.user, this.tempUser.pass);
          let config =  await start();
          this.setConfigs(config);
          this.step = true;    
        }
        catch (e) {
          this.$global.alert = {show:true,type:'error',message:e};
          this.$eventBus.emit('alert-show', this.$global.alert);    
        }
      
      }else{
        this.$global.alert = {show:true,type:'error',message:'formulário inválido !!'};
        this.$eventBus.emit('alert-show', this.$global.alert);    
      }
      this.$global.load = false;
      this.$eventBus.emit('load', false);
      
    },
    async setConfigs(config){
      await system.clear();
      await system.save(config)
      this.tempUser.storage = config.store.store_name
      this.cashiers = config.store.store_cashiers
    },
  }

}
</script>

<style>
.login{
  height: 100vh;
}
</style>