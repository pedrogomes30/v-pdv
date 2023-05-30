<template>
  <div class='d-flex align-items-center justify-content-center login' >

    <div class="card text-center bg-dark ">
      <div class="card-header">
        <ul class="nav nav-tabs  justify-content-center">
          <li class="nav-item active">
            <a class="nav-link text-color-gray" data-bs-toggle="tab" href="#tab-login">Autenticar</a>
          </li>
          <li class="nav-item" data-bs-toggle="tab" href="#tab-store-cashier">
            <a class="nav-link text-light">Loja / caixa</a>
          </li>
        </ul>
      </div>
      <div class="card-body tab-content"> 

        <div class="tab-pane fade show active" id="tab-login">
          <form class="nav-link ">
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
        </div>

        <div class="tab-pane fade show " id="tab-store-cashier">
          <form class="nav-link ">
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
        </div>
          
      </div>
      <button type="submit" class="btn btn-primary px-3 custom-element">Logar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  components: {
    
  },
  data:()=>({
    navitem: false,
  }),
  methods: {
   
    
  }

}
</script>

<style>
.login{
  height: 100vh;
}
</style>