<template>
  <Load />
  <nav v-if="showNavbar" class="navbar navbar-expand-lg navbar-dark bg-dark position-fixed w-100 nav">
    <router-link to="/" class="navbar-brand">
      <img class="logo-image" alt="Home" src="./assets/logo.png">
    </router-link>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/cashier" class="nav-link">
            <i class="bi bi-calculator"></i>
            Caixa
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/history" class="nav-link">
            <i class="bi bi-clock-history"></i>
            Historico
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/closure_cashier" class="nav-link">
            <i class="bi bi-cart-x"></i>
            Fechamento
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/storage_balance" class="nav-link">
            <i class="bi bi-calculator-fill"></i>
            Balanço
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/product_request" class="nav-link">
            <i class="bi bi-box2-heart"></i>
            Solicitar Produto
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">
            <i class="bi bi-info-circle"></i>
            Informações
          </router-link>
        </li>
      </ul>
    </div>
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
  <router-view />
</template>

<script>
import Alert from './components/systemComponents/AlertComponent.vue'
import Load from './components/systemComponents/LoadComponent.vue'
import system from './database/system'
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
    let data = await system.get();
    this.user.name = data[0][0].user_name;
    this.user.store = data[0][0].store.store_name;
    this.user.cashier = data[0][0].cashier_name;
    this.user.photo = data[0][0].img;
    this.$eventBus.on('navbar-updated', this.updateNavbar);
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
  height: 40px; /* Ajuste a altura conforme necessário */
}
.user-info {
  display: flex;
  align-items: center;
  color: #fff;
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
  display: none; /* Remover a seta do dropdown */
}

.nav{
  padding-right: 10rem;
  padding-left: 10rem;
}

</style>
