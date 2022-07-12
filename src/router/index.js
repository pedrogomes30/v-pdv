import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsPage from '../views/NewsPage.vue'
import LoginPage from '../views/LoginPage.vue'
import CashierPage from '../views/CashierPage.vue'
import ClientePage from '../views/ClientePage.vue'
import ConfiguracaoPage from '../views/ConfiguracaoPage.vue'
import FechamentoPage from '../views/FechamentoPage.vue'
import HistoricoPage from '../views/HistoricoPage.vue'
import PromotionPage from '../views/PromotionPage.vue'
import RecuperarSenha from '../views/RecuperarSenha.vue'
import NotFound from '../views/NotFound.vue'
import StoreCashierPage from '../views/StoreCashierPage.vue'
import Guard from '../services/middleware'



Vue.use(VueRouter)

const routes = [
  { path: '/login',         name: 'login',        component: LoginPage,       },
  { path: '/start',         name: 'start',        component: StoreCashierPage,beforeEnter:Guard.auth},
  { path: '/',              name: 'news',         component: NewsPage,        beforeEnter:Guard.auth},
  { path: '/caixa',         name: 'caixa',        component: CashierPage,     beforeEnter:Guard.auth},
  { path: '/clientes',      name: 'cliente',      component: ClientePage,     beforeEnter:Guard.auth},
  { path: '/configuracao',  name: 'configuracao', component: ConfiguracaoPage,beforeEnter:Guard.auth},
  { path: '/fechamentoCaixa',name: 'fechamento',  component: FechamentoPage,  beforeEnter:Guard.auth},
  { path: '/historico',     name: 'historico',    component: HistoricoPage,   beforeEnter:Guard.auth},
  { path: '/promocao',      name: 'promocao',     component: PromotionPage,   beforeEnter:Guard.auth},
  { path: '/passRecover',   name: 'passRecover',  component: RecuperarSenha,  beforeEnter:Guard.auth},
  { path: '*',              name: 'NotFound',     component: NotFound,        },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
