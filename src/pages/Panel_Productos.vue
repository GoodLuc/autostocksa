<template>
  <q-layout view="hhh lpR fFf">

    <div class="airContainer q-pa-lg">
      <q-page>
        <div class="row q-mb-md justify-end">
          <q-btn color="primary" unelevated @click="$router.push('/panel/add')" 
            icon="add" class="q-mt-md" label="Agregar producto" />
        </div>
        <div class="q-my-md bg-grey-1">
          <BuscadorPanel v-if="searchReload"></BuscadorPanel>
        </div>
        <div class="q-pb-xl">
          <h1 v-if="modelo.name" class="modeloMain">{{ modelo.name }}</h1>
          <div class="row justify-between q-my-md">
            <q-btn v-if="page > 1" @click="prevPage" flat primary label="Página anterior" /><div v-else></div>
            <div v-if="page > 1">Página {{ page }}</div>
            <q-btn v-if="isMorePage" @click="nextPage" flat primary label="Página siguiente" /><div style="width: 150px" v-else></div>
          </div>
          <div class="row q-col-gutter-md" v-if="productos.length">
            <div class="col-md-3 col-sm-12 q-mb-sm" v-for="(producto, idx) in productos" :key="idx">
              <div class="list-product">
                <figure>
                  <router-link :to="'/panel/edit/'+producto.slug">
                    <img v-bind:src="producto.image" :alt="producto.titulo">
                  </router-link>
                </figure>
                <div class="row">
                  <p>{{ producto.titulo }}</p>
                  <div class="row justify-between align-center full-width">
                    <q-btn color="green" unelevated size="md" label="Ver en Front" 
                    @click="$router.push({path:'/producto/'+producto.slug})" />
                    <q-btn color="primary" unelevated size="md" label="Editar" 
                    @click="$router.push({path:'/panel/edit/'+producto.slug})" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>No se encontraron productos para este modelo.</p>
          </div>
        </div>
      </q-page>
    </div>

  </q-layout>
</template>

<script>
import Vue from 'vue'
import productos from '../mixins/productos'

export default {
  data() {
    return {
      searchReload: true
    }
  },
  mixins: [productos],
  components: {
    'BuscadorPanel': require('components/BuscadorPanel.vue').default
  },
  watch: {
    $route(to, from) {
      if (!this.$route.params.modelo) {
        this.getProductosByLatest()
        this.searchReload = false
        var self = this
        Vue.nextTick(function (){
          self.searchReload = true;
        })
      }
    }
  },
  mounted() {
    if (this.$route.params.modelo) {
      this.getProductosByModelo(this.$route.params.modelo)
      this.getModeloBySlug(this.$route.params.modelo)
    } else { 
      this.getProductosByLatest()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .campos { padding: 30px; border: 1px solid red } 
  span.aplicacion { display: inline-block }
  span.aplicacion:hover { background: white; border-radius: 20px; cursor: context-menu }
  .uploadPlace { max-width: 300px; border: 1px solid red; cursor: cell } .uploadPlace img { display: block }
  .list-product { padding: 20px; border: 1px solid blue; border-radius: 5px }
  .list-product figure { height: 200px; overflow: hidden; text-align: center } 
  .list-product img { max-height: 100%; width: auto }
  .list-product p { margin: 0  }
  .list-product.first { padding-top: 98px; padding-bottom: 98px }
</style>
