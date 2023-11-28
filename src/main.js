import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const Vue = createApp(App);
Vue.use(router) //Adicionando as configurações de rotas a instância do Vue
Vue.mount('#app')


// Para rodar o Json-server
// json-server --watch json-server.json