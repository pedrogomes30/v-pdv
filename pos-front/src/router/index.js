import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsPage from '../views/NewsPage.vue'
import LoginPageCredential from '../views/LoginPage.vue'
import CaixaPage from '../views/CaixaPage.vue'
import ClientePage from '../views/ClientePage.vue'
import ConfiguracaoPage from '../views/ConfiguracaoPage.vue'
import FechamentoPage from '../views/FechamentoPage.vue'
import HistoricoPage from '../views/HistoricoPage.vue'
import PromocaoPage from '../views/PromocaoPage.vue'
import RecuperarSenha from '../views/RecuperarSenha.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/',              name: 'login',        component: LoginPageCredential},
  { path: '/novidades',     name: 'news',         component: NewsPage},
  { path: '/NoAuth',        name: 'NoAuth',       component: () => import(/* webpackChunkName: "about" */ '../views/NoAuth.vue')},
  { path: '/caixa',         name: 'caixa',        component: CaixaPage},
  { path: '/clientes',      name: 'cliente',      component: ClientePage},
  { path: '/configuracao',  name: 'configuracao', component: ConfiguracaoPage},
  { path: '/fechamentoCaixa',name: 'fechamento',   component: FechamentoPage},
  { path: '/historico',     name: 'historico',    component: HistoricoPage},
  { path: '/promocao',      name: 'promocao',     component: PromocaoPage},
  { path: '/passRecover',   name: 'passRecover',  component: RecuperarSenha},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
