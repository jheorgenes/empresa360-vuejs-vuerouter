<template>
  <div>
    <h5>Contratos</h5>
    <!-- definindo queryParams nas urls -->
    <router-link class="btn btn-primary" :to="{ name: 'contratos', query: { leadId_like: 1 } }" >LeadId = 1</router-link><!-- Passando queryParams conforme padrão do json-server -->
    <router-link class="btn btn-primary" to="/home/vendas/contratos?servicoId_like=2" >ServicoId = 2</router-link>
    <router-link class="btn btn-success" :to="{ name: 'contratos', query: { leadId_like: 1, servicoId_like: 2 } }" >LeadId = 1 e ServicoId = 2</router-link>
    <router-link class="btn btn-success" to="/home/vendas/contratos?servicoId_like=2&leadId_like=2" >ServicoId = 2 e LeadId = 2</router-link>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">LEAD</th>
          <th scope="col">SERVICO</th>
          <th scope="col">DATA INICIO</th>
          <th scope="col">DATA FINAL</th>
        </tr>+
      </thead>
      <tbody>
        <tr v-for="d in dados" :key="d.id">
          <td>{{ d.id }}</td>
          <td>{{ d.lead.nome }}</td>
          <td>{{ d.servico.servico }}</td>
          <td>{{ d.data_inicio }}</td>
          <td>{{ d.data_fim }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ApiMixin from '@/mixins/ApiMixin'

export default {
  name: 'Contratos',
  mixins: [ApiMixin],
  data: () => ({
    parametrosDeRelacionamento: '_expand=lead&_expand=servico'
  }),
  created() {
    // this.$route.query trás as queryParams da requisição como um objeto
    const queryParams = new URLSearchParams(this.$route.query).toString(); //Convertendo o objeto em queryParams
    const url = `http://localhost:3000/contratos?${this.parametrosDeRelacionamento}&${queryParams}`;
    this.getDadosApi(url);
  },
  beforeRouteUpdate(to, from, next){
    // O parametro 'to' trás a nova url que foi consultada
    //URLSearchParams é um objeto nativo do js com o objetivo de transformar objetos em queryParams (reconhecido pelo navegador)
    const queryParams = new URLSearchParams(to.query).toString(); //Construindo um URLSearchParams (recebendo como argumento o objeto que será convertido para queryParams)
    const url = `http://localhost:3000/contratos?${this.parametrosDeRelacionamento}&${queryParams}`;
    this.getDadosApi(url);
    next();
  }
}
</script>