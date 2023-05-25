import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import StoreCashierView from '../views/StoreCashierView.vue'
import NotFound from '../views/NotFoundView.vue'
import SessionExpired from '../views/SessionExpiredView.vue'
import CashierView from '../views/CashierView.vue'
import ClosureView from '../views/ClosureView.vue'
import HistorySaleView from '../views/HistorySaleView.vue'
import ProductPickView from '../views/ProductPickView'
import ProductBalance from '../views/ProductBalance.vue'
import HomeView from '../views/HomeView.vue'
import Guard from './middleware'

const routes = [
  { 
    path: '/login',name: 'login',component: LoginView,
  },
  { 
    path: '/expired',name: 'SessionExpiredView',component: SessionExpired
  },
  { 
    path: '',name: 'NotFound',component: NotFound,
  },
  { 
    path: '/start',name: 'start',component: StoreCashierView,beforeEnter:Guard.auth
  },
  //pos pages
  { 
    path: '/',name: 'home',component: HomeView,beforeEnter:Guard.auth
  },
  { 
    path: '/cashier',name: 'cashier',component: CashierView,beforeEnter:Guard.auth
  },  
  { 
    path: '/closure_cashier',name: 'closure',component: ClosureView,beforeEnter:Guard.auth
  },
  { 
    path: '/history',name: 'history',component: HistorySaleView,beforeEnter:Guard.auth
  },
  { 
    path: '/storage_balance',name: 'product_count',component: ProductBalance,beforeEnter:Guard.auth
  },
  { 
    path: '/product_request',name: 'product_request',component: ProductPickView,beforeEnter:Guard.auth
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
