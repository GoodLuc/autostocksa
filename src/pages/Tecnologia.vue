<template>
  <q-page>
    <HeaderSmall></HeaderSmall>
    <div class="row content q-py-lg">
      <h1 class="bbh">Nuevas tecnologías Sakura</h1>
    </div>
    <div class="row content wcol q-col-gutter-lg items-stretch q-mb-xl">
      <div class="col-md-6 col-sm-12">
        <router-link to="/tecnologia/supreme-guard">
          <figure><img src="statics/stc/supreme-guard.jpg" alt="Supreme Guard"></figure>
        </router-link>
      </div>
      <div class="col-md-6 col-sm-12">
        <router-link to="/tecnologia/bioguard">
          <figure><img src="statics/stc/bioguard.jpg" alt="Bioguard"></figure>
        </router-link>
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
