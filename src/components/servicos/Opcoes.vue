<template>
  <h5>Componente Opções</h5>
  <p>Poderíamos recuperar as opções do serviço id {{id}}</p>
</template>

<script>
export default {
  name: 'Opcoes',
  props: ['id'],
  created() {
    // console.log('Parametro via props =>', this.id);
  }
}
</script>