<template>
  <div class='d-flex align-items-center justify-content-center login' >
    <div class="card text-center bg-dark px-2 pb-2">
      <div class="card-header">
         <span class="nav-link text-color-gray"  >Authenticação</span>
      </div>

      <form v-if="step" class="nav-link">
        <div class="mb-3 pl-3">
          <label for="inputEmail" class="form-label text-light">
          <i class="bi bi-person-circle text-light "></i>
            Usuário</label>
          <input type="email" class="form-control pl-3" id="login" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label text-light">
            <i class="bi bi-hash text-light "></i>
            Senha</label>
          <input type="password" class="form-control" id="password">
        </div>
      </form>

      <form v-else class="nav-link">
        <div class="mb-3">
          <label for="inputStore" class="form-label text-light">
            <i class="bi bi-shop"></i>
            Loja</label>
          <input type="text" class="form-control" disabled id="store" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="inputCashier" class="form-label text-light">
            <i class="bi bi-calculator text-light "></i>
            Caixa</label>
          <input type="text" class="form-control" id="cashier">
        </div>
      </form>

      <button type="submit" @click="login()" class="btn btn-primary px-3 custom-element">Logar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  components: {
    
  },
  data:()=>({
    step: false,
    loading: false,
    alert:{
      show: true,
      type: 'error',
      message:'test'
    }
  }),
  methods: {
    async login() {
      if (!this.step) {
        this.loading = true;
        try {
          
          this.$global.showNavbar = !this.$global.showNavbar;
          this.$eventBus.emit('navbar-updated', this.$global.showNavbar);
          console.log(this.$global.showNavBar);

          this.$global.alert = this.alert;
          this.$eventBus.emit('alert-show', this.$global.alert);
          console.log(this.$global.alert);
        }
        catch (e) {
          console.log(e)
        }
        this.loading = false;
      }
    },

    
  }

}
</script>

<style>
.login{
  height: 100vh;
}
</style>