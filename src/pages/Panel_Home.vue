<template>
  <q-layout view="lHh lpR fFf">

    <div class="airContainer q-pa-lg">
      <h1 v-if="currentUser">Bienvenido {{ currentUser.nombre }}</h1>

      <q-btn class="q-mb-md" label="Agregar producto" type="submit" size="lg" color="primary" icon="add_box"
      @click="$router.push({ name: 'Panel-Edit' })" /><br>
      <q-btn class="q-mb-md" label="Ver productos" type="submit" size="lg" color="primary" icon="amp_stories"
      @click="$router.push({ name: 'Panel-Productos' })" /><br>
      <q-btn label="Aplicaciones" type="submit" size="lg" color="primary" icon="directions_car"
      @click="$router.push({ name: 'Panel-Aplicaciones' })" />

    </div>

  </q-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Panel-Home',
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  components: {
    'HeaderMedium': require('components/HeaderMedium.vue').default
  },
}
</script>

<style lang="stylus">
  
</style>
