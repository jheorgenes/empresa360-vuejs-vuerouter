<template>
  <div>
    <!-- <h5>Contratos</h5> -->
    <!-- definindo queryParams nas urls -->
    <!-- Passando queryParams conforme padrão do json-server -->
    <!-- <router-link class="btn btn-primary" :to="{ name: 'contratos', query: { leadId_like: 1 } }" >LeadId = 1</router-link>
    <router-link class="btn btn-primary" to="/home/vendas/contratos?servicoId_like=2" >ServicoId = 2</router-link>
    <router-link class="btn btn-success" :to="{ name: 'contratos', query: { leadId_like: 1, servicoId_like: 2 } }" >LeadId = 1 e ServicoId = 2</router-link>
    <router-link class="btn btn-success" to="/home/vendas/contratos?servicoId_like=2&leadId_like=2" >ServicoId = 2 e LeadId = 2</router-link> -->
    <div class="card mb-4">
      <div class="card-header">Contratos</div>
      <div class="card-body">
          <div class="row">
              <div class="col-6">
                  <label class="form-label">ID Contrato:</label>
                  <input type="text" class="form-control" v-model="formPesquisa.id_like">
              </div>
              <div class="col-6">
                  <label class="form-label">Data início:</label>
                  <div class="input-group">
                      <input type="date" class="form-control" v-model="formPesquisa.data_inicio_gte">
                      <input type="date" class="form-control" v-model="formPesquisa.data_inicio_lte">
                  </div>
              </div>
          </div>
      </div>
      <div class="card-footer">
          <button type="button" class="btn btn-primary" @click="pesquisar">Pesquisar</button>
      </div>
  </div>
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
//http://localhost:3000/contratos?_expand=lead&_expand=servico&id_like=3&data_inicio_gte=2022-01-01&data_inicio_lte=2022-01-31
//http://localhost:3000/contratos?_expand=lead&_expand=servico&data_inicio_gte=2022-01-01&data_inicio_lte=2022-01-31
//http://localhost:3000/contratos?_expand=lead&_expand=servico&data_inicio_gte=2022-01-01&data_inicio_lte=2022-01-31&id_like=4
export default {
  name: 'Contratos',
  mixins: [ApiMixin],
  data: () => ({
    parametrosDeRelacionamento: '_expand=lead&_expand=servico',
    formPesquisa: {
      id_like: '',
      data_inicio_gte: '',
      data_inicio_lte: ''
    }
  }),
  methods: {
    pesquisar() {
      const url = `http://localhost:3000/contratos?${this.parametrosDeRelacionamento}`;
      this.getDadosApi(url, this.formPesquisa);
    }
  },
  created() {
    const url = `http://localhost:3000/contratos?${this.parametrosDeRelacionamento}`;
    // this.$route.query trás as queryParams da requisição como um objeto
    this.getDadosApi(url, this.$route.query);
  },
  beforeRouteUpdate(to, from, next){
    // O parametro 'to' trás a nova url que foi consultada
    const url = `http://localhost:3000/contratos?${this.parametrosDeRelacionamento}`;
    this.getDadosApi(url, to.query);
    next();
  }
}
</script>