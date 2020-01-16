<template>
  <q-page>
    <HeaderSmall></HeaderSmall>
    <div class="row content q-py-lg">
      <h1 class="bbh">
        <span>Nosotros</span>
      </h1>
    </div>
    <div class="row content q-mb-xl">
      <figure class="q-my-lg"><img src="statics/stc/as-logo.jpg" alt="Autostock Internacional S.A."></figure>
      <h2>Autostock Internacional S.A.</h2>
      <p>Una empresa fundada en el año 2002 dedicada a la importación de autopiezas para el mercado de la República Argentina.</p>
      <p>Nuestro sistema de comercialización se sustenta en una RED de DISTRIBUIDORES MAYORISTAS de primer nivel en todo el territorio del país.</p>
      <p>Adecuados niveles de EXISTENCIAS en nuestros almacenes de Buenos Aires Y ZONA FRANCA de LA PLATA aseguran un abastecimiento fluido al canal de distribución, sumando a la calidad de nuestros productos un elevado porcentaje de eficiencia de entregas.</p>
      <p>Nuestro objetivo: <strong>“aportar valor al mercado de autopiezas desde nuestra especialización en comercio internacional”</strong>.</p>

    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  components: {
    'HeaderSmall': require('components/HeaderSmall.vue').default
  },
}
</script>

<style lang="stylus" scoped>


</style>
