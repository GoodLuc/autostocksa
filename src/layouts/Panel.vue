<template>
  <q-layout view="hhh lpR fFf">

    <q-header elevated class="bg-grey-10 text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="settings_applications" @click="$router.push({ name: 'Panel-Home' })" />

        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/img/single-logo.png">
          </q-avatar>
          AutoStock
        </q-toolbar-title>
        <div v-if="producto">
          <q-btn flat @click="$router.push('/producto/'+producto)"><q-icon left size="1.5em" name="description" /><div>Ver producto</div></q-btn><br>
        </div>
        <q-btn flat @click="$router.push('/')" ><q-icon left size="1.5em" name="home" /><div>Ver Home</div></q-btn><br>
        <q-btn flat @click="logout" ><q-icon left size="1.5em" name="exit_to_app" /><div>Cerrar sesión</div></q-btn>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/panel/add" label="Agregar producto" />
        <q-route-tab to="/panel/productos" label="Productos" />
        <q-route-tab to="/panel/aplicaciones" label="Aplicaciones" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>

  </q-layout>
</template>

<script>
const fb = require('../firebaseConfig.js')
import { mapState } from 'vuex'

export default {
  name: 'Panel',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['producto'])
  },
  methods: {
    logout() {
      fb.auth.signOut().then(() => {
        this.$store.dispatch('clearData')
        this.$router.push('/acceso/logout')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus">
  body { font-family: 'Rajdhani', sans-serif; font-size: 19px; }
  img { max-width: 100% }
  body h1, body h2, body h3 { text-transform: uppercase; font-weight: 500; }
  h1 { font-size: 30px; } h2 { font-size: 24px; margin: 0 }
  figure { margin: 0 }
  select { font-size: 19px; }
  .airContainer { width: 100%; max-width: 1200px; margin: auto; }
</style>
