<template>
  <q-layout view="hhh lpR fFf">

    <div class="airContainer q-pa-lg">
      <h1>Aplicaciones</h1>

      <div>
        <q-dialog v-model="alert"><q-card><q-card-section><div class="text-h6">Alerta</div></q-card-section>
            <q-card-section>Debe ingresar un título de producto para guardar.</q-card-section>
            <q-card-actions align="right"><q-btn flat label="OK" color="primary" v-close-popup /></q-card-actions></q-card>
        </q-dialog>

        <q-form class="q-gutter-md">
          <div class="content q-my-md q-py-lg bg-grey-1">
            <div>
              <div>
                <q-form>
                  <div class="row q-col-gutter-md">
                    <div class="col-md-4 col-sm-12 q-my-sm">
                      <q-select filled v-model="marcaInput" use-input input-debounce="1000" label="Elige la marca del vehículo"
                        :options="marcasDeAuto" @filter="filterFn" behavior="menu" :loading="loading">
                        <template v-slot:prepend><q-icon name="img:statics/icons/icon-one.png"></q-icon></template>
                        <template v-slot:no-option>
                          <q-item><q-item-section class="text-grey">No hay resultados</q-item-section></q-item>
                        </template>
                      </q-select>
                    </div>
                    <div class="col-md-8 col-sm-12 q-my-sm">
                      <q-select filled v-model="modeloInput" use-input input-debounce="1000" label="Vea los modelos"
                        :options="modelosDeAuto" @filter="filterFn2" behavior="menu" :loading="loading2">
                        <template v-slot:prepend><q-icon name="img:statics/icons/icon-two.png"></q-icon></template>
                        <template v-slot:no-option>
                          <q-item><q-item-section class="text-grey">No hay resultados</q-item-section></q-item>
                        </template>
                      </q-select>
                    </div>
                  </div>
                </q-form>
              </div>
            </div>
            <div class="q-pt-md">
              <div class="row q-col-gutter-md">
                <div class="col-md-10">
                  <q-input v-if="!marcaInput" outlined disable label="Elija primero una marca en el menú superior" />
                  <q-input ref="nueva_aplicacion" v-if="marcaInput" outlined v-model="nueva_aplicacion" 
                  :label="'Ingrese un nuevo modelo para la marca '+ marcaInput" />
                </div>
                <div class="col-md-2">
                  <q-btn label="Guardar" :loading="adding" type="submit" size="lg" 
                  :color="button_color" icon="save" @click="saveApp" />
                </div>
                <transition appear enter-active-class="animated zoomIn" leave-active-class="animated fadeOut">
                  <p style="margin-bottom: 0" key="test" v-if="mensaje" 
                  class="animated fadeInUp text-green col-md-12" v-html="mensaje"></p>
                </transition>
              </div>
            </div>
            <div>
              <ul class="modelos">
                <li v-for="(aplicacion, idx) in modelosNames" :key="idx">
                  {{ aplicacion }}
                </li>
              </ul>
            </div>
          </div>
          
        </q-form>

      </div>
    </div>

  </q-layout>
</template>

<script>
import buscador from '../mixins/buscador'
import tools from '../mixins/tools'
const fb = require('../firebaseConfig.js')

export default {
  name: 'Panel-Aplicaciones',
  data() {
    return {
      alert: false,
      mensaje: null,
      adding: false,
      nueva_aplicacion: null,
      button_color: 'primary',
      noty: new Audio(require('../statics/sounds/noty.mp3'))
    }
  },
  mixins: [tools,buscador],
  methods: {
    saveApp() {
      if (this.nueva_aplicacion != null) {
        this.button_color = 'green'
        this.adding = true
        this.mensaje = null
        var self = this
        var modelo = { name: this.nueva_aplicacion, slug: this.slugify(this.nueva_aplicacion) }
        self.$store.commit('addModelo', modelo)
        fb.modelos.doc(self.marcaInput).set(
          { modelos: self.modelos, modelosArr: self.modelosSlugs }
        ).then(function(docRef) {
          self.mensaje = 'Se ha agregado el modelo <b>'+ self.nueva_aplicacion +'</b> a la marca <b>' + self.marcaInput +'</b>'
          self.nueva_aplicacion = null
          self.adding = false
          console.log("Modelos actualizados.")
          self.button_color = 'primary'
          self.noty.play()
          self.$refs.nueva_aplicacion.focus()
        })
      } else {
        this.alert = true
      }
    }
  },
  mounted() {
    this.$store.commit('setModelos', [])
    this.$store.commit('setModelosNamesByMarca', [])
    this.$store.commit('setModelosSlugsByMarca', [])
  }
}
</script>

<style lang="stylus" scoped>
  .campos { padding: 30px; border: 1px solid red } 
  span.aplicacion { display: inline-block }
  span.aplicacion:hover { background: white; border-radius: 20px; cursor: context-menu }
  .uploadPlace { max-width: 300px; border: 1px solid red; cursor: cell } .uploadPlace img { display: block }
  ul.modelos { padding-left: 20px }
</style>
