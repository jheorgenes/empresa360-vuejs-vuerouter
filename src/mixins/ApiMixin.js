export default {
  data: () => ({
    dados: {}
  }),
  methods: {
    // Definindo  objeto vazio como valor padrão para o parametro 'queryParams', caso o mesmo não seja informado
    getDadosApi(url, queryParams = {}) {

      //Removendo parametros vazios de queryParams
      Object.keys(queryParams).forEach(chave => {
        if(queryParams[chave] == '') delete queryParams[chave];
      });

      //URLSearchParams é um objeto nativo do js com o objetivo de transformar 'objetos' em 'queryParams' (reconhecido pelo navegador)
      const urlQueryParams = new URLSearchParams(queryParams).toString();
      // Se houver queryParams, insere na url
      const urlCompleta = urlQueryParams ? `${url}&${urlQueryParams}` : url;

      fetch(urlCompleta)
        .then(response => response.json())
        .then(response => {
          this.dados = response
        })
    }
  },
}