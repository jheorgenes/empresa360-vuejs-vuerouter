import { createRouter, createWebHistory } from 'vue-router'
// import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Site from '@/views/Site.vue'

const routes = [
  {
    path: '/',
    component: Site
  },
  {
    path: '/home',  //localhost:8080/home
    component: Home
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