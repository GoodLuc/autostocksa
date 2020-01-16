<template>
  <q-page>
    <HeaderSmall></HeaderSmall>
    <div class="row content q-py-lg">
      <h1 class="bbh">Tienda</h1>
    </div>
    <div class="row q-col-gutter-md content q-mb-xl">
      <h2>¡Bienvenido a nuestra Tienda Virtual!</h2>
      <p>Aquí encontrará una selección especial de Sets de filtros disponibles para compra directa con los principales medios de pago.</p>
      <p>Recuerde que además puede solicitar cotización sobre más de 500 filtros Sakura para todo tipo de vehículo, disponibles en la sección Catálogo</p>
      
      <div class="col-md-4 list-product q-my-lg" v-for="(producto, idx) in productos" :key="idx">
        <div v-if="producto.en_tienda.incluido == true">
          <figure v-if="producto.tipo_de_filtro != 'Kit'"><router-link :to="'/producto/'+producto.slug"><img v-bind:src="producto.image" :alt="producto.titulo"></router-link></figure>
          <figure v-else><router-link :to="'/kit/'+producto.slug"><img v-bind:src="producto.image" :alt="producto.titulo"></router-link></figure>
          <p v-if="producto.tipo_de_filtro != 'Kit'"><router-link :to="'/producto/'+producto.slug">{{ producto.titulo }}</router-link></p>
          <p v-else><router-link :to="'/kit/'+producto.slug">{{ producto.titulo }}</router-link></p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import productos from '../mixins/productos'

export default {
  name: 'Tienda',
  data() {
    return {
    }
  },
  mixins: [productos],
  components: {
    'HeaderSmall': require('components/HeaderSmall.vue').default
  },
  created() {
    this.getProductosDeTienda()
  }
}
</script>

<style lang="stylus" scoped>
  h1.modeloMain { font-size: 26px; border-bottom: 1px solid red; }

  .list-product figure { border: 1px solid grey; border-bottom: none; height: 15em; padding: 20px }
  .list-product figure a { display: flex; align-items: center; justify-content: center; width: 100%; height: 100% }
  .list-product img { display: block; max-width: 100%; max-height: 100% }
  .list-product p { width: 100%; margin: 0; font-size: 24px; font-weight: bold }
  .list-product p a { color: inherit; text-decoration: none; padding: 15px; display: inline-block; width: 100%
    background: black; color: white;  }
  .list-product:hover p a { background: #CE0000 }
</style>
