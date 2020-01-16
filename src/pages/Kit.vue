<template>
  <q-page>
    <HeaderMedium :showsearch="showsearch"></HeaderMedium>
    <div class="content q-py-lg q-mb-xl">
      <h1 v-if="modelo != ''" class="modeloMain">{{ modelo.name }}</h1>
      <div class="q-mb-xl">
        <div class="producto" v-if="producto != null">
          <h1 class="row">
            <div class="col-sm-10">{{ producto.titulo }} </div>
            <span class="col-sm-2 text-right"><q-icon size="xl" :name="'img:statics/icons/type_'+producto.tipo_de_filtro.toLowerCase()+'.png'" /> {{ producto.tipo_de_filtro }}</span>
          </h1>
          <div class="aplicaciones">
            <div v-if="producto.aplicaciones.length > 1">
              <q-expansion-item icon="directions_car" :label="'Compatible con '+ producto.aplicaciones[0].modeloName + ' y ' + producto.aplicaciones.length +' modelos más. [Expandir]'">
                <q-card class="bg-grey-9">
                  <q-card-section>
                    <ul><li v-for="(modelo, idx) in producto.aplicaciones" :key="idx">
                      <router-link :to="'/productos/'+modelo.modeloSlug">{{ modelo.modeloName }}</router-link>
                    </li></ul>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>
            <div v-else-if="producto.aplicaciones.length == 1">
              <h2 class="row items-end"><q-icon name="directions_car" size="md" class="q-mr-lg" /> <span>Compatible con <router-link :to="'/productos/'+producto.aplicaciones[0].modeloSlug">{{ producto.aplicaciones[0].modeloName }}</router-link></span></h2>
            </div>
          </div>
          <div class="row q-col-gutter-md q-pa-lg">
            <div class="col-xs-12 col-sm-8 vista1">
              <div v-html="producto.descripcion"></div>
            </div>
            <div class="col-xs-12 col-sm-4 vista1">
              <figure><img v-bind:src="producto.image" :alt="producto.titulo"></figure>
            </div>
          </div>
          <div v-if="productosEnKit" class="productosEnKit">
            <h2>Productos incluídos en el Kit</h2>
            <div v-for="(incluido, idx) in productosEnKit" :key="idx">
              <q-expansion-item :icon="'img:statics/icons/type_'+incluido.tipo_de_filtro.toLowerCase()+'.png'" 
                :label="incluido.tipo_de_filtro+' - '+incluido.titulo">
                <q-card class="productoEnKit">
                  <q-card-section>
                    <div class="row q-col-gutter-md q-py-lg">
                      <div class="col-xs-12 ol-sm-12 col-md-6 vista1">
                        <p>
                          <strong v-if="incluido.detalles.cantidad_por_caja">{{ incluido.detalles.cantidad_por_caja }} por caja</strong>
                          <span v-if="incluido.tipo_de_filtro == 'Aceite'"><br>{{ incluido.clase_de_filtro }}</span>
                          <span v-if="incluido.tipo_de_filtro == 'Aire'"><br>{{ incluido.forma_de_filtro }}</span>
                        </p>
                        <figure><img v-bind:src="incluido.image" :alt="incluido.titulo"></figure>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-6 vista2 tabla">
                        <q-table title="Detalles del filtro" :data="detalles_valores[idx]" :columns="detalles_columnas" virtual-scroll
                          :pagination.sync="pagination" :rows-per-page-options="[0]" row-key="name" hide-header hide-bottom
                          table-style="max-height: 300px" flat bordered />
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>
          </div>
          <div class="row items-center justify-center entienda" v-if="producto.en_tienda.incluido">
            <p class="valor q-mr-lg">Valor: ${{ producto.en_tienda.valor }}</p>
            <q-btn :to="'/comprar/'+producto.slug" label="Comprar" glossy color="green" />
          </div>
        </div>
        <div v-else>
          <p>No se encontraron productos para este modelo.</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import productos from '../mixins/productos'

export default {
  name: 'Producto',
  data() {
    return {
      productoSlug: this.$route.params.slug,
      detalles_columnas: [{ name: 'detalle', label: 'Detalle', field: 'detalle', align: 'left' },
        { name: 'valor', label: 'Valor', field: 'valor', align: 'left' }],
      pagination: { rowsPerPage: 0 },
      showsearch: false,
    }
  },
  mixins: [productos],
  computed: {
    detalles_valores: function() {
      var detalles_array = [];
      var indexis = 0
      var self = this
      this.productosEnKit.forEach((prodkey) => {
        var etiquetas = { alto1: "Alto 1", alto2: "Alto 2", ancho1: "Ancho 1", ancho2: "Ancho 2", cantidad_por_caja: "Cantidad por caja", diametro_de_pico: "Diámetro de pico",
          diametro_externo1: "Diámetro externo 1", diametro_externo2: "Diámetro externo 2", diametro_interno1: "Diámetro interno 1",
          diametro_interno2: "Diámetro interno 2", entrada: "Entrada", junta_diametro_interno: "Junta de diámetro interno",
          junta_diametro_externo: "Junta de diámetro externo", largo1: "Largo 1", largo2: "Largo 2", medida_de_rosca: "Medida de rosca",
          medida_de_tuerca: "Medida de tuerca", metros_cubicos: "Metros cúbicos", salida: "Salida", tipo: "Tipo",
          valvula_antiretorno: "Válvula anti-retorno", valvula_de_derivacion: "Válvula de derivación", aclaracion: 'Aclaración'}
        var detalles_array_ind = [];
        Object.keys(self.productosEnKit[indexis].detalles).forEach((key) => {
          if (self.productosEnKit[indexis].detalles[key]) {
            if (key == 'valvula_antiretorno') {
              if (self.productosEnKit[indexis].detalles[key] === true) {
                detalles_array_ind.push({detalle: etiquetas[key], valor: 'Sí' });
              } 
            } else {
              detalles_array_ind.push({detalle: etiquetas[key], valor: self.productosEnKit[indexis].detalles[key] });
            }
          }
        });
        detalles_array.push(detalles_array_ind)
        indexis++
      })
      return detalles_array
    }
  },
  components: {
    'HeaderMedium': require('components/HeaderMedium.vue').default
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.slug) {
      this.getProductoBySlug(this.$route.params.slug)
      } else if (this.$route.params.code) {
        this.getProductoByCode(this.$route.params.code)
      }
    }
  },
  mounted() {
    if (this.$route.params.slug) {
      this.getKitBySlug(this.$route.params.slug)
    }
    this.showsearch = false
  }
}
</script>

<style lang="stylus">
  h1.modeloMain { font-size: 26px; border-bottom: 1px solid red; }
  .tabla .q-table tbody td { font-size: 18px } 
  .tabla .q-table__top, .tabla thead tr:first-child th { background: black; color: white }
  .producto { flex-direction: column; display: flex; border: 1px solid grey; margin-top: 30px }
  .producto h1 { width: 100%; padding: 20px; box-sizing: border-box; background: black; color: white; display: flex; 
    flex-wrap: wrap; font-size: 36px; font-weight: bold; margin: 0; line-height: 1.3em }
  .producto h1 span { font-weight: 300; font-size: 24px; margin-left: auto }
  .producto figure { max-width: 400px; padding: 20px; margin: auto }
  .aplicaciones { color: white; background: #232323; padding: 20px; }
  .aplicaciones h2 { font-weight: 200; font-size: 20px; margin: 0 auto 10px; line-height: 1.2em }
  .aplicaciones ul { list-style: none; padding: 0; font-size: 20px; margin: 0; font-weight: 400 }
  .aplicaciones a { color: inherit; text-decoration: none }
  .productosEnKit { color: white; background: #232323; padding: 2px; }
  .productosEnKit h2 { margin: 0 0 10px; padding: 20px 20px 10px }
  .productoEnKit { color: black }
  .entienda { padding: 20px }
  .entienda .valor { font-weight: bold; color: green; margin-bottom: 0 }
</style>
