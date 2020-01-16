<template>
  <q-layout view="hhh lpR fFf">

    <div class="airContainer q-pa-lg">
      <h1>Editar producto</h1>

      <div>
        <q-dialog v-model="alert"><q-card><q-card-section><div class="text-h6">Alerta</div></q-card-section>
          <q-card-section><div v-html="mensaje_alert"></div></q-card-section>
          <q-card-actions align="right"><q-btn flat label="OK" color="primary" v-close-popup /></q-card-actions></q-card>
        </q-dialog>

        <q-dialog v-model="confirmed" persistent><q-card><q-card-section class="row items-center">
          <q-avatar icon="check_circle" color="green" text-color="white" />
          <span class="q-ml-sm"><div v-html="mensaje_confirmed"></div></span></q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cargar otro" @click="addProduct" color="primary" v-close-popup />
          <q-btn flat label="Ver productos" @click="$router.push({ name: 'Panel-Productos' })" color="primary" v-close-popup /></q-card-actions></q-card>
        </q-dialog>

        <q-form>
          <q-input outlined v-model="titulo" label="* Nombre del producto" />
          <div class="content q-my-md q-pa-lg bg-grey-1">
            <BuscadorAplicaciones v-on:addAplicacion="addAplicacion"></BuscadorAplicaciones>
            <div class="q-py-md">
              <span class="aplicacion" v-for="(aplicacion, idx) in aplicaciones" :key="idx">
                {{ aplicacion.modeloName }} <q-btn flat small round color="deep-orange" icon="close" @click="removeAplicacion(idx)" />
              </span>
            </div>
          </div>
          <div class="row content q-my-md q-pa-lg bg-grey-1">
            <div class="col-md-6 col-sm-12">
              <h2>Tipo</h2>
              <div class="q-gutter-sm">
                <q-radio keep-color v-model="tipo_de_filtro" val="Aceite" label="Aceite" color="orange" />
                <q-radio keep-color v-model="tipo_de_filtro" val="Aire" label="Aire" color="cyan" />
                <q-radio keep-color v-model="tipo_de_filtro" val="Cabina" label="Cabina" color="teal" />
                <q-radio keep-color v-model="tipo_de_filtro" val="Combustible" label="Combustible" color="red" />
                <q-radio keep-color v-model="tipo_de_filtro" val="Kit" label="Kit" color="black" />
              </div>
              <div class="q-gutter-sm">
                <q-checkbox v-if="tipo_de_filtro == 'Aceite'" v-model="supreme_guard" label="Aceite Supreme Guard" />
                <q-checkbox v-if="tipo_de_filtro == 'Cabina'" v-model="bioguard" label="Cabina Bioguard" />
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div v-if="(tipo_de_filtro == 'Aceite') || (tipo_de_filtro == 'Combustible')">
                <h2>Clase</h2>
                <q-select style="max-width: 500px; margin-bottom: 30px" 
                outlined v-model="claseDeFiltroInput" :options="clases_de_filtro" label="Seleccione" />
              </div>
              
              <div v-if="(tipo_de_filtro == 'Aire') || (tipo_de_filtro == 'Cabina')">
                <h2>Forma</h2>
                <q-select style="max-width: 500px" outlined 
                v-model="formaDeFiltroInput" :options="formas_de_filtro" label="Seleccione" />
              </div>
            </div>
          </div>
          <div v-if="tipo_de_filtro != 'Kit'" class="content q-my-md q-pa-lg bg-grey-1">
            <h2>Detalles</h2>
            <div class="row">
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.alto1" label="Alto 1" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.alto2" label="Alto 2" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.largo1" label="Largo 1" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.largo2" label="Largo 2" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.ancho1" label="Ancho 1" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.ancho2" label="Ancho 2" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.diametro_interno1" label="Diámetro interno 1" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.diametro_interno2" label="Diámetro interno 2" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.diametro_externo1" label="Diámetro externo 1" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.diametro_externo2" label="Diámetro externo 2" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.metros_cubicos" label="Metros cúbicos" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.medida_de_rosca" label="Medida de rosca" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.diametro_de_pico" label="Diámetro de pico" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.junta_diametro_interno" label="Junta diámetro interno" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.junta_diametro_externo" label="Junta diámetro externo" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.valvula_de_derivacion" label="Válvula de derivación (bar)" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.medida_de_tuerca" label="Medida de tuerca" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.entrada" label="Entrada" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.salida" label="Salida" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.tipo" label="Tipo" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="detalles.cantidad_por_caja" label="Cantidad por caja" />
              <q-input class="q-mr-md q-mb-md" size="51" outlined v-model="detalles.aclaracion" label="Aclaración" />
              <q-checkbox class="q-mr-md q-mb-md" outlined v-model="detalles.valvula_antiretorno" label="Válvula antiretorno" />
            </div>
          </div>
          <div v-if="tipo_de_filtro != 'Kit'" class="content q-my-md q-pa-lg bg-grey-1">
            <h2>Códigos</h2>
            <div class="row">
              <q-input class="q-mr-md q-mb-md" outlined v-model="codigos.oem" label="OEM" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="codigos.mann" label="Mann" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="codigos.wega" label="Wega" />
              <q-input class="q-mr-md q-mb-md" outlined v-model="codigos.fram" label="Fram" />
            </div>
          </div>
          <div v-if="tipo_de_filtro == 'Kit'" class="content q-my-md q-pa-lg bg-grey-1">
            <h2>Productos incluídos</h2>
            <div v-for="(incluido, idx) in incluidosFields" :key="idx" class="row items-center q-mt-md">
              <q-input class="q-mr-md shortfield" outlined v-model="incluidosFields[idx]" label="Ingrese código Sakura" />
              <q-btn round color="primary" icon="note_add" class="q-mr-md" @click="addIncluido" />
              <q-btn v-if="idx" round color="red" icon="delete_outline" @click="removeIncluido(idx)" />
            </div>
          </div>
          <div class="content q-my-md q-pa-lg bg-grey-1">
            <h2>Descripción</h2>
            <q-editor v-model="descripcion" :toolbar="[['bold', 'italic', 'strike', 'underline','unordered','ordered','link','quote']]" />
          </div>
          <div class="row">
            <div class="content q-my-md q-pa-lg bg-grey-1 col-md-6 col-sm-12">
              <h2>Tienda</h2>
              <q-checkbox v-model="en_tienda.incluido" label="Incluír en tienda" />
              <q-input style="max-width: 500px" class="q-mr-md q-mb-md" outlined v-model="en_tienda.valor" label="Valor">
                <template v-slot:prepend><q-icon name="attach_money" /></template>
              </q-input>
              <q-input style="max-width: 500px" class="q-mr-md q-mb-md" outlined v-model="linkDePago" label="Link de pago" />
            </div>
            <div class="content q-my-md q-pa-lg bg-grey-1 col-md-6 col-sm-12">
              <h2>Imagen</h2>
              <p>{{ uploadingMsg }}</p>
              <figure @click="$refs.fileInput.click()" class="uploadPlace"><img :src="imageSrc" alt="Cargar imagen de producto"></figure>
              <input type="file" @change="onFileChanged" style="display: none" ref="fileInput">
            </div>
          </div>
          <div class="row justify-center">
            <q-btn label="Guardar" :loading="adding" type="submit" size="lg" 
            :color="button_color" icon="save" @click="saveProduct" />
          </div>
        </q-form>

      </div>
    </div>

  </q-layout>
</template>

<script>
import axios from 'axios'
const fb = require('../firebaseConfig.js')
import tools from '../mixins/tools'
import productos from '../mixins/productos'
import Vue from 'vue';

export default {
  data() {
    return {
      alert: false,
      mensaje_alert: '',
      alert_tipo: false,
      confirmed: false,
      button_color: 'primary',
      adding: false,
      mensaje_confirmed: '',
      noty: new Audio(require('../statics/sounds/deduction.mp3')),
      error: new Audio(require('../statics/sounds/open-up.mp3')),
      product_id: null,
      titulo: '',
      productoSlug: null,
      aplicaciones: [],
      tipo_de_filtro: null,
      supreme_guard: false,
      bioguard: false,
      claseDeFiltroInput: null,
      formaDeFiltroInput: null,
      detalles: { alto1: null, alto2: null, largo1: null, largo2: null, ancho1: null, ancho2: null, diametro_interno1: null, diametro_interno2: null,
        diametro_externo1: null, diametro_externo2: null, cantidad_por_caja: null, metros_cubicos: null,
        medida_de_rosca: null, diametro_de_pico: null, junta_diametro_interno: null, junta_diametro_externo: null,
        valvula_de_derivacion: null, valvula_antiretorno: false, medida_de_tuerca: null, entrada: null, salida: null, 
        tipo: null, aclaracion: null },
      codigos: { oem: null, wega: null, mann: null, fram: null },
      descripcion: '',
      en_tienda: { incluido: false, valor: null },
      linkDePago: '',
      incluidosFields: [''],
      selectedFile: null,
      uploadingMsg: '',
      imageSrc: 'statics/product-placeholder.png'
    }
  },
  mixins: [tools, productos],
  components: {
    'BuscadorAplicaciones': require('components/BuscadorAplicaciones.vue').default
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  computed: {
    clases_de_filtro: function() {
      if (this.tipo_de_filtro == 'Aceite') {
        return ['Unidad Sellada','Cartucho Ecológico','Cartucho','En línea','Spin-on','En tanque']
      } else if (this.tipo_de_filtro == 'Combustible') {
        return ['Unidad Sellada','Cartucho Ecológico','Cartucho','En línea','Spin-on','En tanque']
      }
    },
    formas_de_filtro: function() {
      if (this.tipo_de_filtro == 'Aire') {
        return ['Ovalado','Cartucho Ecológico','Panel','Redondo','Tubular']
      } else if (this.tipo_de_filtro = 'Cabina') {
        return ['Panel']
      }
    }
  },
  methods: {
    addProduct: function() {
      if (this.$route.name == 'Panel-Edit-Product') { this.$router.push({ name: 'Panel-Edit'}) } else { this.$router.go() }
    },
    addAplicacion: function (modeloInput) {
      var modeloSlug = this.slugify(modeloInput)
      this.aplicaciones.push({modeloSlug: modeloSlug, modeloName: modeloInput})
    },
    removeAplicacion: function (id) {
      this.aplicaciones.splice(id, 1)
    },
    addIncluido() {
      this.incluidosFields.push('')
    },
    removeIncluido(index) {
      this.incluidosFields.splice(index, 1);
    },
    onFileChanged (event) {
      this.selectedFile = event.target.files[0]
      this.uploadingMsg = 'Imagen lista para subir'
      this.uploadImg()
    },
    uploadImg() {
      var formData = new FormData()
      console.log(this.filenamify(this.selectedFile.name))
      var src = this.filenamify(this.selectedFile.name);
      var filename = this.slugify(src[0]) + src[1]
      formData.append('fileToUpload', this.selectedFile, filename)
      axios.post('https://autostock-sa.com.ar/productos-img/uploadProductImg.php', formData, 
        { headers: {'Content-Type': 'multipart/form-data'}, onUploadProgress: uploadEvent => { this.uploadingMsg = 'Subiendo imagen...' } })
        .then(res => { 
          if (res.status == 200) { 
            if (res.data.search("Error") < 0) {
              this.uploadingMsg = 'Imagen lista'
              this.imageSrc = 'https://autostock-sa.com.ar/productos-img/'+ res.data 
            } else {
              this.uploadingMsg =
              'Hubo un error al intentar subir la imagen. Verifique que el tipo de archivo sea JPG o PNG, y que el tamaño de archivo sea menor a 1MB.' 
            } 
            console.log(res) 
          }
        })
    },
    saveProduct() {
      if ((this.titulo != '') && (this.tipo_de_filtro != null)) {
        var self = this
        this.button_color = 'green'
        this.adding = true
        var aplicaciones_array = []
        var codigos_array = []
        this.aplicaciones.forEach(function(item) {
          aplicaciones_array.push(item.modeloSlug)
        })
        for (var codigo in this.codigos) {
          codigos_array.push(this.codigos[codigo])
        }
        if (self.product_id == null) {
          // Check if product name exists
          var productExists = false
          fb.productos.where('slug', '==', self.slugify(self.titulo)).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              if (doc.exists) { productExists = true }
              var docData = doc.data()
              docData.id = doc.id
              console.log('docdata is: ')
              console.log(docData)
            });
            if (productExists) {
              console.log("Error: Ya existe el producto.")
              self.adding = false
              self.button_color = 'primary'
              self.error.play()
              self.mensaje_alert = 'Ups! Ya existe un producto cargado con el mismo título: <strong>'+ self.titulo +'</strong>.'
              self.alert = true
            } else {
              console.log("Product not found")
              console.log(productExists)
              fb.last_id.get().then(function (doc) {
                console.log('last id is:'+doc.data().last_id)
                self.product_id = doc.data().last_id + 1
                console.log('new id is:'+self.product_id.toString())
                fb.last_id.set({ last_id: self.product_id }).then(function() {
                  fb.productos.doc(self.product_id.toString()).set(
                    { titulo: self.titulo, aplicaciones: self.aplicaciones, aplicaciones_array: aplicaciones_array,
                    supreme_guard: self.supreme_guard, bioguard: self.bioguard,
                    incluidos: self.incluidosFields, linkDePago: self.linkDePago,
                    tipo_de_filtro: self.tipo_de_filtro, clase_de_filtro: self.claseDeFiltroInput, forma: self.formaDeFiltroInput,
                    detalles: self.detalles, codigos: self.codigos, codigos_array: codigos_array, descripcion: self.descripcion, 
                    en_tienda: self.en_tienda, image: self.imageSrc, slug: self.slugify(self.titulo), date: new Date() }
                  ).then(function(docRef) { 
                    console.log("Producto guardado.")
                    self.adding = false
                    self.button_color = 'primary'
                    self.noty.play()
                    self.mensaje_confirmed = 'Se ha cargado exitosamente el producto <strong>'+ self.titulo +'</strong>.'
                    self.confirmed = true
                  })
                })
              })
            }
          }).catch(function (error) {
            console.log("Error getting documents: ", error);
          });
        } else {
          fb.productos.doc(self.product_id.toString()).set(
            { titulo: self.titulo, aplicaciones: self.aplicaciones, aplicaciones_array: aplicaciones_array,
            incluidos: self.incluidosFields, linkDePago: self.linkDePago,
            supreme_guard: self.supreme_guard, bioguard: self.bioguard,
            tipo_de_filtro: self.tipo_de_filtro, clase_de_filtro: self.claseDeFiltroInput, forma: self.formaDeFiltroInput,
            detalles: self.detalles, codigos: self.codigos, codigos_array: codigos_array, descripcion: self.descripcion, 
            en_tienda: self.en_tienda, image: self.imageSrc, slug: self.slugify(self.titulo), date: new Date() }
          ).then(function(docRef) { 
            console.log("Producto actualizado.")
            self.adding = false
            self.button_color = 'primary'
            self.noty.play()
            self.mensaje_confirmed = 'Se ha actualizado exitosamente el producto <strong>'+ self.titulo +'</strong>.'
            self.confirmed = true
          })
        }
        
      } else {
        if (this.titulo == '') {
          this.mensaje_alert = 'Debe ingresar un título de producto para guardar.'
          this.alert = true
        } else if (this.tipo_de_filtro == null) { 
          this.mensaje_alert = 'Debe seleccionar un tipo de filtro.'
          this.alert = true
        }
      }
    }
  },
  created() {
    //console.log(this.$route.name)
    if (this.$route.params.producto) {
      var self = this
      this.productoSlug = this.$route.params.producto
      fb.productos.where('slug', '==', self.$route.params.producto).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          if (doc.exists) {
              console.log("Document data:", doc.data());
              self.product_id = doc.id
              self.titulo = doc.data().titulo
              self.aplicaciones = doc.data().aplicaciones
              self.tipo_de_filtro = doc.data().tipo_de_filtro
              self.supreme_guard = doc.data().supreme_guard
              self.bioguard = doc.data().bioguard
              self.claseDeFiltroInput = doc.data().clase_de_filtro
              self.formaDeFiltroInput = doc.data().forma
              self.incluidosFields = doc.data().incluidos,
              self.linkDePago = doc.data().linkDePago,
              self.detalles = doc.data().detalles
              self.codigos = doc.data().codigos
              self.descripcion = doc.data().descripcion
              self.en_tienda = doc.data().en_tienda
              self.imageSrc = doc.data().image
              self.$store.commit('setProductoBySlug', doc.data().slug)

          } else {
              console.log("No such document!");
          }
        })
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    }
  }
}
</script>

<style lang="stylus">
  .campos { padding: 30px; border: 1px solid red } 
  .shortfield { max-width: 280px }
  span.aplicacion { display: inline-block }
  span.aplicacion:hover { background: white; border-radius: 20px; cursor: context-menu }
  .uploadPlace { max-width: 300px; border: 1px solid green; border-radius: 5px; overflow: hidden; cursor: cell } .uploadPlace img { display: block }
</style>
