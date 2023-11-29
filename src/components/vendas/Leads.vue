<template>
  <div>
    <h5>Leads</h5>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NOME</th>
          <th scope="col">TELEFONE</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in dados" :key="d.id">
          <td>{{ d.id }}</td>
          <td>{{ d.nome }}</td>
          <td>{{ d.telefone }}</td>
          <td>
            <!-- <router-link :to="`/home/vendas/leads/${d.id}`" class="btn btn-sm btn-primary">
              <i class="bi bi-pencil-square" style="cursor: pointer"></i>
            </router-link> -->
            <router-link :to="{ name: 'lead', params: { id: d.id, outroParametro: `teste_${d.id}` } }" class="btn btn-sm btn-primary"><!-- Indicando que será passado um parâmetro na rota com o objeto de id igual ao recebido como argumento -->
              <i class="bi bi-pencil-square" style="cursor: pointer"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ApiMixin from '@/mixins/ApiMixin'

export default {
  name: 'Leads',
  mixins: [ApiMixin],
  created() {
    this.getDadosApi('http://localhost:3000/leads');
  },
  // Guarda de componentes (beforeRouteEnter) - Executa antes mesmo do componente ser criado, ou seja, não dá acesso a demais atributos
  // beforeRouteEnter(to, from, next) {
  beforeRouteEnter() {
    console.log('Guarda de componente beforeRouteEnter');
  },
  // Guarda de componentes (beforeRouteLeave) - Executa antes de deixar a rota em questão
  // beforeRouteLeave(to, from, next) {
  beforeRouteLeave() {
    console.log('Guarda de componente beforeRouteLeave');
  }
}
</script>