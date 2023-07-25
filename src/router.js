import { createRouter, createWebHistory } from 'vue-router'
// import { createRouter, createWebHashHistory } from 'vue-router'
import Contratos from '@/components/vendas/Contratos.vue'
import Dashboard from '@/components/dashboard/Dashboard.vue'
import Home from '@/views/Home.vue'
import Leads from '@/components/vendas/Leads.vue'
import Lead from '@/components/vendas/Lead.vue'
import Login from '@/views/Login.vue'
import Servicos from '@/components/servicos/Servicos.vue'
import Site from '@/views/Site.vue'
import Vendas from '@/components/vendas/Vendas.vue'
import VendasPadrao from '@/components/vendas/VendasPadrao.vue'

const routes = [
  { path: '/', component: Site },
  { path: '/home', component: Home, children: 
    [
      { path: 'vendas', component: Vendas, children: 
        [
          { path: '', component: VendasPadrao }, ////localhost:8080/home/vendas
          { path: 'leads', component: Leads },
          { path: 'leads/:id', component: Lead }, // :id será uma variável
          { path: 'contratos', component: Contratos, name: 'contratos' },
        ]
      },
      { path: 'servicos', component: Servicos, name: 'servicos' },
      { path: 'dashboard', component: Dashboard }
    ]
  }, 
  { path: '/login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes //Escrevendo de forma enchuta ao invés de routes: routes
})

export default router;