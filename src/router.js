import { createRouter, createWebHistory } from 'vue-router'
// import { createRouter, createWebHashHistory } from 'vue-router'
import Contratos from '@/components/vendas/Contratos.vue'
import Home from '@/views/Home.vue'
import Leads from '@/components/vendas/Leads.vue'
import Login from '@/views/Login.vue'
import Servicos from '@/components/servicos/Servicos.vue'
import Site from '@/views/Site.vue'
import Vendas from '@/components/vendas/Vendas.vue'

const routes = [
  {
    path: '/',
    component: Site
  },
  {
    path: '/home',  //localhost:8080/home
    component: Home,
    children: [
      {
        path: 'vendas',
        component: Vendas,
        children: [
          {
            path: 'leads',
            component: Leads
          },
          {
            path: 'contratos',
            component: Contratos
          },
        ]
      },
      {
        path: 'servicos',
        component: Servicos
      }
    ]
  }, 
  {
    path: '/login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes //Escrevendo de forma enchuta ao invés de routes: routes
})

export default router;