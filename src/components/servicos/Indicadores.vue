<template>
  <h5>Componente Indicadores</h5>
  <p>Poderíamos recuperar os indicadores do serviço id {{id}}</p>
</template>

<script>
export default {
  name: 'Indicadores',
  props: ['id'],
  created() {
    // console.log('Indicadores com o parametro via props =>', this.id);
  }
}
</script>