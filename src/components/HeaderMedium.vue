<template>
  <header class="mainhead medium q-pa-lg">
    <div class="row content">
      <div class="col">
        <div>
          <img alt="AutoStock S.A. Sakura" src="~assets/img/sakura-logo.png">
        </div>
      </div>
      <div class="col">
        <img class="float-right" alt="AutoStock S.A. Sakura" src="~assets/img/autostock-logo.png">
      </div>
    </div>
    <nav class="row content desktopMenu">
      <ul class="col mainmenu">
        <li><a href="/">Home</a></li>
        <li><router-link to="/buscar">Buscador</router-link></li>
        <!--<li><router-link to="/catalogo">Catálogo</router-link></li>-->
        <li><router-link to="/tienda">Tienda online</router-link></li>
        <li><router-link to="/tecnologia">Tecnología</router-link></li>
        <li><router-link to="/sakura">Sakura</router-link>
        <li><router-link to="/nosotros">Nosotros</router-link></li>
        <li><router-link to="/contacto">Contacto</router-link></li>
      </ul>
    </nav>
    <nav :class="['responsiveMenu', {rMOpen: responsiveMenu}]">
      <ul class="mainmenu">
        <li><a href="/">Home</a></li>
        <li><router-link to="/buscar">Buscador</router-link></li>
        <!--<li><router-link to="/catalogo">Catálogo</router-link></li>-->
        <li><router-link to="/tienda">Tienda online</router-link></li>
        <li><router-link to="/tecnologia">Tecnología</router-link></li>
        <li><router-link to="/sakura">Sakura</router-link>
        <li><router-link to="/nosotros">Nosotros</router-link></li>
        <li><router-link to="/contacto">Contacto</router-link></li>
      </ul>
      <q-btn class="bg-red norad" flat @click="responsiveMenu = !responsiveMenu" icon="menu" />
    </nav>

    <Buscador v-show="isshowsearch"></Buscador>

  </header>
</template>

<script>
const fb = require('../firebaseConfig.js')
export default {
  data() {
    return {
      isshowsearch: this.showsearch,
      responsiveMenu: false
    }
  },
  props: ['showsearch'],
  components: {
    'Buscador': require('components/Buscador.vue').default
  },
}
</script>

<style lang="stylus">

</style>