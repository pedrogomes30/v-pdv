<template>
  <Load />
  <nav v-if="showNavbar" class="navbar navbar-dark bg-dark nav p-0 px-2 default-menu">
    <router-link to="/" class="navbar-brand ">
      <img class="logo-image" alt="Home" src="./assets/logo.png">
    </router-link>
      <ul class="navbar-nav ml-auto d-flex flex-row nav-menu ">
        <li class="nav-item px-2" title='Caixa'>
          <router-link to="/cashier" class="nav-link">
            <i class="bi bi-cart px-2"></i>
            <a class=show-on-mobile>Caixa</a>
          </router-link>
        </li>
        <li class="nav-item px-2" title='Historico'>
          <router-link to="/history" class="nav-link">
            <i class="bi bi-clock-history px-2"></i>
            <a class=show-on-mobile>Historico</a>
          </router-link>
        </li>
        <li class="nav-item px-2" title='Fechamento'>
          <router-link to="/closure_cashier" class="nav-link">
            <i class="bi bi-cart-x px-2"></i>
            <a class=show-on-mobile>Fechamento</a>
          </router-link>
        </li>
        <li class="nav-item px-2" title='Balanço'>
          <router-link to="/storage_balance" class="nav-link">
            <i class="bi bi-calculator-fill px-2"></i>
            <a class=show-on-mobile>Balanço</a>
          </router-link>
        </li>
        <li class="nav-item px-2" title='Solicitar Produto'>
          <router-link to="/product_request" class="nav-link">
            <i class="bi bi-box2-heart px-2"></i>
            <a class=show-on-mobile>Solicitar Produto</a>            
          </router-link>
        </li>
        <li class="nav-item px-2" title='Informações'>
          <router-link to="/about" class="nav-link">
            <i class="bi bi-info-circle px-2"></i>
            <a class=show-on-mobile>Informações</a>
          </router-link>
        </li>
      </ul>
    <div class="user-info ml-auto ">
      <div class="dropdown">
        <div class="btn  dropdown-toggle user-info" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="toggleDropdown">
          <div class="userinfo">
            <span class="text-sm show-on-mobile">
              {{ user.name }}<br>
              <small>{{ user.store }} - {{ user.cashier }}</small>
            </span>
          </div>
          <div class="info-img">
            <img v-if="user.photo !== ''" class="rounded-circle user-photo " :src="user.photo" :alt="user.name">
            <i v-else class="bi bi-person-circle "></i>
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="userDropdown">
          <!-- items for user profile menu -->
          <div class="dropdown-header">{{ user.name }}</div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item disable">{{ user.store }}</div>
          <div class="dropdown-item disable">{{ user.cashier }}</div>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Sair</a>
        </div>
      </div>
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
        name: 'John Doe', 
        store: 'Minha Loja', 
        cashier: 'Caixa 1', 
        photo: '' 
      }
    };
  },
  async created() {
    this.$eventBus.on('navbar-updated', this.updateNavbar);
    let data = await system.get();
    if(data.length > 0){
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

<style scoped>
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
  font-size: 1.65rem;
  padding-left: 1rem;
}

.user-info .userinfo {
  text-align: right;
}

.user-info .userinfo span {
  font-size: 0.75rem;
}

.dropdown-toggle::after {
  display: none; 
}

.default-menu {
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: 2rem;
  margin-left: 2rem;
  max-height: 10%;
  height: 8vh;
  font-size: 1.2rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid black;
}

.content-main {
  padding-right: 2rem;
  padding-left: 2rem;
}

.nav-menu {
  margin-right: auto;
  display: flex;
  align-items: center;
}

.router-link-active:not([href="/"]) {
  background: var(--bs-primary);
  border-radius: 10px;
  color: var(--bs-gray-200); 
  transition: background-color 0.3s, font-size 0.3s;
  border: 1px solid black;
}


.router-link-active a {
  color: var(--bs-gray-200);
  font-size: 1.1rem; 
  padding-right:0.40rem;
}


</style>


<style>
/* NOT SCOPED */
@media (max-width: 1024px) {
  .show-on-mobile {
    display: none;
  }
}
.base-content {
  background-color: var(--bs-gray-900);
  border-radius: 10px;
  margin-top:0.5rem;
  padding:1rem;
  height: 90vh;
  border: 1px solid black;
}

.v-divider {
  border-left: 1px solid black;
  height: 100%;
  margin-left: -1px; 
}

.h-divider {
  border-bottom: 1px solid black;
  height: 100%;
  margin-left: -1px; 
}

</style>