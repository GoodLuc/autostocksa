<template>
  <q-page>
    <HeaderSmall></HeaderSmall>
    <div class="row content q-py-lg">
      <h1 class="bbh">
        <q-icon size="xl" name="policy" class="q-mr-md" />
        <span>Filtración Triple Capa BIOGUARD</span>
      </h1>
    </div>
    <div class="row content wcol q-col-gutter-lg">
      <p>Sakura es pionero en el sistema de filtrado BIOGUARD, con una triple capa de seguridad que ofrece una calidad de aire única.</p>
      <div class="col-md-4">
        <figure><img src="statics/stc/filtros-de-aire-triple-capa.jpg" alt="Filtro bioguard"></figure>
      </div>
      <div class="col-md-8">
        <h2>1. Capa Bio-protectora</h2>
        <p>Protege contra virus, gérmenes, alergénicos, bacterias u hongos de ingresar a la cabina del vehículo. También remueve cualquiera de ellos que haya sido transportado al vehículo antes de la instalación del filtro Bio-Protector de Sakura.</p>
        <h2>2. Capa de Carbón Activado</h2>
        <p>Remueve olores desagradables y reduce el impacto de los nocivos gases de escape.</p>
        <h2>3. Capa Protectora</h2>
        <p>Elimina partículas microscópicas y polen.</p>
      </div>
      <div class="col-md-12">
        <h1>Propiedades Especiales</h1>
        <div class="row">
          <div class="col-md-3">
            <figure><img src="statics/stc/virus.png" alt="Virus"></figure>
          </div>
          <div class="col-md-9">
            <h3>Detiene el desarrollo de los virus</h3>
            <p>La Bio-Protección de Sakura provee la mas eficaz protección al eliminar  virus y gérmenes  que causan enfermedades.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <figure><img src="statics/stc/bacteria.png" alt="Bacterias"></figure>
          </div>
          <div class="col-md-9">
            <h3>Inhibe el desarrollo de bacterias y moho</h3>
            <p>La Bio-Protección de Sakura es capaz de desactivar peligrosas bacterias y así prever la futura formación de moho en el filtro.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <figure><img src="statics/stc/alergia.png" alt="Alergias"></figure>
          </div>
          <div class="col-md-9">
            <h3>Previene alergias</h3>
            <p>La Bio-Protección de Sakura mantiene la circulación de aire limpia y reduce la presencia de alergénicos causantes de reacciones no deseadas, como el asma. Esto se debe a la excepcional propiedad absortiva de los filtros Sakura, mayor al 99%.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <figure><img src="statics/stc/micron.png" alt="Filtración"></figure>
          </div>
          <div class="col-md-9">
            <h3>Máximo poder de filtración: Retiene particulas de 2.5 micrones de tamaño (0.0025mm)</h3>
            <p>La Bio-Protección de Sakura contiene y filtra partículas de polvo de hasta 2.5 micrones, o en sistema de medidas internacional 0.0025 mm.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <figure><img src="statics/stc/odour.png" alt="Anti-hedor"></figure>
          </div>
          <div class="col-md-9">
            <h3>Barrera Anti-Hedor</h3>
            <p>La Bio-Protección de Sakura contiene capaz extra de media de carbón activado que remueven hedores desagradables y peligrosos como el Dióxido de Azufre y el Oxido de Nitrógeno.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <figure><img src="statics/stc/tiempo.png" alt="Reemplazo"></figure>
          </div>
          <div class="col-md-9">
            <h3>Reemplazo</h3>
            <p>La Bio-Protección de Sakura debe ser reemplazado cada 15.000 Km o cada 1 año después de la instalación, para lograr resultados 100% eficientes. La duración del filtro dependerá del ambiente en el cual se desenvuelva el vehículo.</p>
          </div>
        </div>
        <div class="q-my-xl">
          <figure style="margin: auto; text-align: center"><img src="statics/stc/pruebas-de-laboratorio-sakura.png" alt="Pruebas de laboratorio"></figure>
          <p style="margin: auto; text-align: center">Todos los filtros de cabina Sakura tienen su  versión TRIPLE CAPA, consulte disponibilidad.</p>
        </div>
      </div>
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
