import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsPage from '../views/NewsPage.vue'
import LoginPage from '../views/LoginPage.vue'
import CashierPage from '../views/CashierPage.vue'
import ClosurePage from '../views/ClosurePage.vue'
import HistorySalePage from '../views/HistorySalePage.vue'
import ProductPickPage from '../views/ProductPickPage'
import ProductBalance from '../views/ProductBalance.vue'
import NotFound from '../views/NotFoundPage.vue'
import StoreCashierPage from '../views/StoreCashierPage.vue'
import SessionExpired from '../views/SessionExpiredPage'
import Guard from '../services/middleware'

Vue.use(VueRouter)

const routes = [
  { path: '/login',         name: 'login',        component: LoginPage,       },
  { path: '/start',         name: 'start',        component: StoreCashierPage,beforeEnter:Guard.auth},
  { path: '/',              name: 'news',         component: NewsPage,        beforeEnter:Guard.auth},
  { path: '/caixa',         name: 'caixa',        component: CashierPage,     beforeEnter:Guard.auth},  
  { path: '/fechamentoCaixa',name: 'fechamento',  component: ClosurePage,     beforeEnter:Guard.auth},
  { path: '/historico',     name: 'historico',    component: HistorySalePage, beforeEnter:Guard.auth},
  { path: '/product_count',      name: 'contar_produto',     component: ProductBalance,   beforeEnter:Guard.auth},
  { path: '/solicitar_produto',      name: 'solicitar_produto',     component: ProductPickPage,   beforeEnter:Guard.auth},
  { path: '/expired',       name: 'SessionExpired',  component: SessionExpired,  beforeEnter:Guard.auth},
  { path: '*',              name: 'NotFound',     component: NotFound,        },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
