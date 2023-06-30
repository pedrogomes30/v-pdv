<template>
  <Load />
  <nav v-if="showNavbar" class="navbar navbar-dark bg-dark nav ">
    <router-link to="/" class="navbar-brand">
      <img class="logo-image" alt="Home" src="./assets/logo.png">
    </router-link>
      <ul class="navbar-nav ml-auto d-flex flex-row ">
        <li class="nav-item" title='Caixa'>
          <router-link to="/cashier" class="nav-link">
            <i class="bi bi-calculator"></i>
            <a class=show-on-mobile>Caixa</a>
          </router-link>
        </li>
        <li class="nav-item" title='Historico'>
          <router-link to="/history" class="nav-link">
            <i class="bi bi-clock-history"></i>
            <a class=show-on-mobile>Historico</a>
          </router-link>
        </li>
        <li class="nav-item" title='Fechamento'>
          <router-link to="/closure_cashier" class="nav-link">
            <i class="bi bi-cart-x"></i>
            <a class=show-on-mobile>Fechamento</a>
          </router-link>
        </li>
        <li class="nav-item" title='Balanço'>
          <router-link to="/storage_balance" class="nav-link">
            <i class="bi bi-calculator-fill"></i>
            <a class=show-on-mobile>Balanço</a>
          </router-link>
        </li>
        <li class="nav-item" title='Solicitar Produto'>
          <router-link to="/product_request" class="nav-link">
            <i class="bi bi-box2-heart"></i>
            <a class=show-on-mobile>Solicitar Produto</a>            
          </router-link>
        </li>
        <li class="nav-item" title='Informações'>
          <router-link to="/about" class="nav-link">
            <i class="bi bi-info-circle"></i>
            <a class=show-on-mobile>Informações</a>
          </router-link>
        </li>
      </ul>
    <div class="user-info ml-auto ">
      <div class="dropdown">
        <div class="btn btn-dark dropdown-toggle m-0 p-0" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="toggleDropdown">
          <div class="userinfo">
            <span class="text-sm">
              {{ user.name }}<br>
              <small>{{ user.store }} - {{ user.cashier }}</small>
            </span>
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="userDropdown">
          <div class="dropdown-header">{{ user.name }}</div>
          <div class="dropdown-item">{{ user.store }}</div>
          <div class="dropdown-item">{{ user.cashier }}</div>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Sair</a>
        </div>
      </div>
      <img v-if="user.photo !== ''" class="rounded-circle user-photo " :src="user.photo" :alt="user.name">
      <i v-else class="bi bi-person-circle "></i>
    </div>
  </nav>
  <Alert />
  <div class="content-main">
    <router-view />
  </div>
</template>

<script>
import Alert from './components/systemComponents/AlertComponent.vue'
import Load from './components/systemComponents/LoadComponent.vue'
import system from './services/database/system'
export default {
  components: {
    Alert,
    Load
  },
  data() {
    return {
      showNavbar: true,
      user: {
        name: 'John Doe', // Nome do usuário
        store: 'Minha Loja', // Nome da loja
        cashier: 'Caixa 1', // Número ou identificador do caixa
        photo: '' // URL ou caminho da foto do usuário
      }
    };
  },
  async created() {
    this.$eventBus.on('navbar-updated', this.updateNavbar);
    let data = await system.get();
    console.log(data);
    if(data.lenght != 0){
      this.user.name = data[0][0].user_name;
      this.user.store = data[0][0].store.store_name;
      this.user.cashier = data[0][0].cashier_name;
      this.user.photo = data[0][0].img;
    }
  },
  async beforeUnmount() {
    this.$eventBus.off('navbar-updated', this.updateNavbar);
  },
  methods: {
    updateNavbar(value) {
      this.showNavbar = value;
    },
    toggleDropdown() {
      const dropdown = document.getElementById('userDropdown');
      if (dropdown) {
        const isOpen = dropdown.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          dropdown.setAttribute('aria-expanded', 'false');
          dropdown.nextElementSibling.classList.remove('show');
        } else {
          dropdown.setAttribute('aria-expanded', 'true');
          dropdown.nextElementSibling.classList.add('show');
        }
      }
    },
  }
};
</script>

<style>
.logo-image {
  height: 40px;
}
.user-info {
  display: flex;
  align-items: center;
}

.user-info img,
.user-info i {
  margin-right: 5px;
  font-size: 1.5rem;
  padding-left: 1rem;
}

.user-info .userinfo {
  text-align: right;
}

.user-info .userinfo span {
  font-size: 0.75rem;
}

.user-info .userinfo small {
  font-size: 0.65rem;
}

.dropdown-toggle::after {
  display: none; 
}

.nav {
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: 2rem;
  margin-left: 2rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.content-main {
  padding-right: 2rem;
  padding-left: 2rem;
}

.base-content {
  background-color: var(--bs-gray-900);
  border-radius: 10px;
  margin-top:0.5rem;
  padding:1rem;
  height: 90vh; 
  width: 100%; 
}

@media (max-width: 1024px) {
  .show-on-mobile {
    display: none;
  }
}
</style>
