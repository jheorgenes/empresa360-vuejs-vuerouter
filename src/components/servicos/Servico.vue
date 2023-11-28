<template>
  <div class="card">
    <div class="card-header bg-primary text-white">{{ dados.servico }}</div>
    <div class="card-body">
      <p class="card-text">{{ dados.descricao }}</p>
    </div>
  </div>
</template>

<script>
import ApiMixin from '@/mixins/ApiMixin'

export default {
  name: 'Servico',
  props: ['id'],
  mixins: [ApiMixin],
  created() {
    console.log('Parametro via props =>', this.id);
    this.getDadosApi(`http://localhost:3000/servicos/${this.id}`);
  },
  beforeRouteUpdate(to, from, next){ //Hook de route parecido com o método watch que foi criado anteriormente
    //to = $route para onde estamos indo
    //from = $route de onde estamos vindo
    //next = Deixa o fluxo de navegação seguir em frente

    if(to.params.id != undefined) this.getDadosApi(`http://localhost:3000/servicos/${to.params.id}`);
    next(); //next tem que vir no final para continuar a navegação
  }
  // watch: { //Ouvintes
  //   // Para identificar as mudanças de roteamento de serviço no momento em que o mesmo for atualizado
  //   // Necessita ter um ouvinte programado e esse ouvinte é a propriedade $route (não confundir com $router)
  //   // Essa propriedade $route é um método que será executado (quando houver qualquer mudança na propriedade $route que é inferida do vue-router)
  //   $route(to) { //Convenção de parametro: to = novoValor, from = valorAntigo
  //     if(to.params.id != undefined) this.getDadosApi(`http://localhost:3000/servicos/${to.params.id}`);
  //   }
  // }
}
</script>