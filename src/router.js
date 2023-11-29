import { createRouter, createWebHistory } from 'vue-router'
// import { createRouter, createWebHashHistory } from 'vue-router'


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

//lazy loading
//import Contratos from '@/components/vendas/Contratos.vue'
const Contratos = () => import('@/components/vendas/Contratos.vue');
const Dashboard = () => import('@/components/dashboard/Dashboard.vue');
const DashboardRodape = () => import('@/components/dashboard/DashboardRodape.vue');

const routes = [
  { 
    path: '/', 
    component: Site,
    meta: { requerAutorizacao: false } //Route Meta fields
  },
  {
    path: '/home', 
    meta: { requerAutorizacao: true }, //Route Meta fields
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
            name: 'leads',
            // beforeEnter(to, from, next) {
            beforeEnter() {
              //poderíamos verificar se o usuário tem permissão de carregar a rota
              console.log('Guarda de rota beforeEnter');
            }
          },
          { 
            path: 'leads/:id/:outroParametro', 
            props: true,
            // props: route => {

            //   console.log('Rota ativa', route);
            //   let teste = route.query.idioma ? route.query.idioma : route.params.outroParametro;

            //   return {
            //     id: parseInt(route.params.id) + 1,
            //     outroParametro: teste
            //   }
            // }, //Indicando o uso de props
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
  // Método para scrollagem de páginas
  // scrollBehavior(to, from, savedPoition) {
  scrollBehavior(to, savedPoition) {
    //savedPoition armazena o histórico navegação e o último 'hash'. Permitindo retornar a ultima página e ultima scrollagem.

    console.log('savedPoition => ', savedPoition)

    if(savedPoition) {
      return savedPoition;
    }

    if(to.hash) {
      return { el: to.hash } //to.hash deve corresponder a um id de elemento HTML
      //fragmento = #secao_1 => id = secao_1
    }

    return { left: 0, top: 0 } //left = x; top = y
  }, 
  routes 
});

//Guarda de rotas globais definidas (antes e depois)
// router.beforeEach((to, from, next) => {
router.beforeEach(() => {
  // console.log('Guarda global beforeEach');
  // if(to.meta.requerAutorizacao) {
  //   console.log('Validar o acesso');
  // } else {
  //   console.log('Apenas seguir a navegação');
  // }
})

// router.afterEach((to, from) => {
router.afterEach(() => {
  // console.log('Guarda de rota executada após a conclusão da navegação');
  // console.log('Origem: ', from);
  // console.log('Destino: ', to);
  // console.log('Guarda global afterEach');
}),
// Guarda Global beforeResolve (Antes de navegar, porém após a conclusão das demais guardas de rota)
router.beforeResolve(() => {
  // console.log('Guarda global beforeResolve');
});

export default router;