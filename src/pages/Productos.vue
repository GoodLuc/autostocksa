<template>
  <q-page>
    <HeaderMedium showsearch="true"></HeaderMedium>
    <div class="content q-py-lg q-mb-xl">
      <h1 class="modeloMain">{{ modelo.name }}</h1>
      <div class="row q-col-gutter-md" v-if="productos.length">
        <div class="col-xs-12 typeselector q-my-md">
          <div>
            <div v-if="type_cabina[0]" class="istype">
              <router-link :to="'/producto/'+type_cabina[0].slug">
                <q-icon size="xl" name="img:statics/icons/type_cabina.png" /> Cabina
              </router-link>
            </div>
            <div v-if="type_aire[0]" class="istype">
              <router-link :to="'/producto/'+type_aire[0].slug">
                <q-icon size="xl" name="img:statics/icons/type_aire.png" /> Aire
              </router-link>
            </div>
            <div v-if="type_combustible[0]" class="istype">
              <router-link :to="'/producto/'+type_combustible[0].slug">
                <q-icon size="xl" name="img:statics/icons/type_combustible.png" /> Combustible
              </router-link>
            </div>
            <div v-if="type_aceite[0]" class="istype">
              <router-link :to="'/producto/'+type_aceite[0].slug">
                <q-icon size="xl" name="img:statics/icons/type_aceite.png" /> Aceite
              </router-link>
            </div>
            <div v-if="type_kit[0]" class="istype">
              <router-link :to="'/kit/'+type_kit[0].slug">
                <q-icon size="xl" name="img:statics/icons/type_kit.png" /> Kit
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 list-product" v-for="(producto, idx) in productos" :key="idx">
          <figure v-if="producto.tipo_de_filtro != 'Kit'"><router-link :to="'/producto/'+producto.slug"><img v-bind:src="producto.image" :alt="producto.titulo"></router-link></figure>
          <figure v-else><router-link :to="'/kit/'+producto.slug"><img v-bind:src="producto.image" :alt="producto.titulo"></router-link></figure>
          <p v-if="producto.tipo_de_filtro != 'Kit'"><router-link :to="'/producto/'+producto.slug">{{ producto.titulo }}</router-link></p>
          <p v-else><router-link :to="'/kit/'+producto.slug">{{ producto.titulo }}</router-link></p>
        </div>
      </div>
      <div v-else>
        <p>No se encontraron productos para este modelo.</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import productos from '../mixins/productos'

export default {
  name: 'Productos',
  data() {
    return {
    }
  },
  mixins: [productos],
  components: {
    'HeaderMedium': require('components/HeaderMedium.vue').default
  },
  created() {
    this.getProductosByModelo(this.$route.params.modelo)
    this.getModeloBySlug(this.$route.params.modelo)
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
