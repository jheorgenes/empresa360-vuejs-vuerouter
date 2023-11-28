import { createRouter, createWebHistory } from 'vue-router'
// import { createRouter, createWebHashHistory } from 'vue-router'
import Contratos from '@/components/vendas/Contratos.vue'
import Dashboard from '@/components/dashboard/Dashboard.vue'
import DashboardRodape from '@/components/dashboard/DashboardRodape.vue'
import Home from '@/views/Home.vue'
import Indicadores from '@/components/servicos/Indicadores.vue'
import Lead from '@/components/vendas/Lead.vue'
import Leads from '@/components/vendas/Leads.vue'
import Login from '@/views/Login.vue'
import Opcoes from '@/components/servicos/Opcoes.vue'
import PaginaNaoEncontrada from '@/views/PaginaNaoEncontrada.vue'
import Servico from '@/components/servicos/Servico.vue'
import Servicos from '@/components/servicos/Servicos.vue'
import Site from '@/views/Site.vue'
import Vendas from '@/components/vendas/Vendas.vue'
import VendasPadrao from '@/components/vendas/VendasPadrao.vue'

const routes = [
  { 
    path: '/', 
    component: Site 
  },
  {
    path: '/home', 
    alias: '/app', 
    component: Home, 
    children: [
      {
        path: 'vendas', 
        component: Vendas, 
        children: [
          { 
            path: '', 
            component: VendasPadrao, 
            name: 'vendas' 
          }, //localhost:8080/home/vendas
          { 
            path: 'leads', 
            component: Leads, 
            name: 'leads' 
          },
          { 
            path: 'leads/:id/:outroParametro', 
            props: true, //Indicando o uso de props
            component: Lead, 
            name: 'lead', 
            alias: ['/l/:id/:outroParametro', '/pessoa/:id/:outroParametro', '/:id/:outroParametro'] //Definindo rotas apelidadas para acesso
          }, // :id será uma variável que receberá o parâmetro definido no routerlink
          { 
            path: 'contratos', 
            component: Contratos, 
            name: 'contratos' 
          },
        ]
      },
      {
        path: 'servicos', 
        component: Servicos, 
        name: 'servicos', 
        children: [
          {
            path: ':id', 
            props: {
              default: true,
              indicadores: true,
              opcoes: true
            },
            alias: '/s/:id', 
            name: 'servico', 
            components: {
              default: Servico,
              opcoes: Opcoes,
              indicadores: Indicadores
            },
          },
        ]
      },
      {
        path: 'dashboard', 
        components: {
          default: Dashboard,
          rodape: DashboardRodape
        }
      }
    ]
  },
  { 
    path: '/login', 
    component: Login 
  },
  { 
    path: '/redirecionamento-1', 
    redirect: '/home/servicos' 
  },
  { 
    path: '/redirecionamento-2', 
    redirect: { name: 'leads' } 
  },
  { 
    path: '/redirecionamento-3', 
    redirect: '/home/vendas' 
  },
  { 
    path: '/redirecionamento-4', 
    redirect: { name: 'vendas' } 
  },
  {
    path: '/redirecionamento-5', 
    redirect: to => {
      //podemos programar algo antes do redirecionamento ser efetivado
      console.log(to);

      // return '/home/vendas'
      return { name: 'vendas' }
    }
  },
  // Rota para pegar outros endereços digitados errados e redirecionar para um componente
  // { path: '/:catchAll(.*)*', redirect: '/' } //no vue2 o path era: '*'
  { 
    path: '/:catchAll(.*)*', 
    component: PaginaNaoEncontrada 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes //Escrevendo de forma enchuta ao invés de routes: routes
})

export default router;