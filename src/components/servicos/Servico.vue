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
  mixins: [ApiMixin],
  created() {
    this.getDadosApi(`http://localhost:3000/servicos/${this.$route.params.id}`);
  },
  watch: { //Ouvintes
    // Para identificar as mudanças de roteamento de serviço no momento em que o mesmo for atualizado
    // Necessita ter um ouvinte programado e esse ouvinte é a propriedade $route (não confundir com $router)
    // Essa propriedade $route é um método que será executado (quando houver qualquer mudança na propriedade $route que é inferida do vue-router)
    $route(to) { //Convenção de parametro: to = novoValor, from = valorAntigo
      this.getDadosApi(`http://localhost:3000/servicos/${to.params.id}`);
    }
  }
}
</script>