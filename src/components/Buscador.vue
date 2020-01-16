<template>
  <div class="row buscador content">
    <div class="full-width">
      <h3>Buscador</h3>

        <q-dialog v-model="alert"><q-card><q-card-section><div class="text-h6">No encontrado</div></q-card-section>
          <q-card-section><div v-html="mensaje_alert"></div></q-card-section>
          <q-card-actions align="right"><q-btn flat label="OK" color="primary" v-close-popup /></q-card-actions></q-card>
        </q-dialog>

        <q-form class="content q-pa-lg bg-grey-1">
        <div class="row q-col-gutter-md">
          <div class="col-md-8 col-xs-12 q-mb-sm">
            <div class="row q-col-gutter-md">
              <div class="col-md-4 col-xs-12 q-mb-sm">
                <q-select filled v-model="marcaInput" use-input input-debounce="1000" label="Elige la marca de tu vehículo"
                  :options="marcasDeAuto" @filter="filterFn" behavior="menu" :loading="loading">
                  <template v-slot:prepend><q-icon name="img:statics/icons/icon-one.png"></q-icon></template>
                  <template v-slot:no-option>
                    <q-item><q-item-section class="text-grey">No hay resultados</q-item-section></q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-md-8 col-xs-12">
                <q-select class="q-mb-sm" filled v-model="modeloInput" use-input input-debounce="1000" 
                label="Elige el modelo" :options="modelosDeAuto" @filter="filterFn2" behavior="menu" :loading="loading2"
                @input="getProductos" :disable="loading2">
                  <template v-slot:prepend><q-icon name="img:statics/icons/icon-two.png"></q-icon></template>
                  <template v-slot:no-option>
                    <q-item><q-item-section class="text-grey">No hay resultados</q-item-section></q-item>
                  </template>
                  <template v-slot:append><q-icon @click.stop="getProductos" class="cursor-pointer" outline round color="red" name="search" /></template>
                </q-select>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-xs-12">
            <q-input class="q-mb-sm" v-model="codigo" debounce="1000" filled placeholder="Buscar por código">
              <template v-slot:append><q-icon @click.stop="getProductoByCode" class="cursor-pointer" outline round color="red" name="search" /></template></q-input>
          </div>
        </div>

      </q-form>
    </div>
  </div>
</template>

<script>
import buscador from '../mixins/buscador'
import tools from '../mixins/tools'
const fb = require('../firebaseConfig.js')

export default {
  data() {
    return {
      codigo: '',
      alert: false,
      mensaje_alert: ''
    }
  },
  mixins: [buscador,tools],
  methods: {
    getProductos() {
      this.$router.push({ name: 'Productos', params: { modelo: this.modelos.find(item => item.name == this.modeloInput).slug } })
    },
    getProductoByCode() {
      var self = this
      fb.productos.where('slug', '==', self.codigo.toLowerCase()).get().then(function (querySnapshot) {
        console.log('first q ')
        console.log(querySnapshot)
        if (!querySnapshot.empty) {
          querySnapshot.forEach(function (doc) {
            var docData = doc.data()
            docData.id = doc.id
            console.log('docdata is: ')
            console.log(docData)
            self.$store.commit('setProductoByCode', docData)
            self.$router.push({ name: 'Producto', params: { slug: docData.slug } })
          });
        } else {
          fb.productos.where('codigos_array', 'array-contains', self.codigo).get().then(function (querySnapshot) {
            console.log('second q')
            if (!querySnapshot.empty) {
              querySnapshot.forEach(function (doc) {
                var docData = doc.data()
                docData.id = doc.id
                console.log('docdata is: ')
                console.log(docData)
                self.$store.commit('setProductoByCode', docData)
                self.$router.push({ name: 'Producto', params: { slug: docData.slug } })
              });
            } else {
              self.mensaje_alert = 'No se encontro un producto con el código: <strong>' + self.codigo + '</strong>. <br> Intente buscar por marca y modelo de vehículo.'
              self.alert = true
            }
          }).catch(function (error) {
            console.log("Error getting documents: ", error);
          });
        }
      }).catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    }
  }
}
</script>

<style lang="stylus">

</style>