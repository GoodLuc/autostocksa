<template>
  <q-page>
    <HeaderSmall></HeaderSmall>
    <div v-if="producto" class="row content q-py-lg">
      
      <q-dialog v-model="alert"><q-card><q-card-section></q-card-section>
        <q-card-section><div v-html="mensaje_alert"></div></q-card-section>
        <q-card-actions align="right"><q-btn flat label="OK" color="primary" v-close-popup /></q-card-actions></q-card>
      </q-dialog>

      <h1 class="bbh">Comprar</h1>
      <div class="producto">
        <h2>{{ producto.titulo }}</h2>
        <div class="row q-col-gutter-md q-pa-lg">
          <div class="col-xs-12 col-sm-8 vista1">
            <div v-html="producto.descripcion"></div>
          </div>
          <div class="col-xs-12 col-sm-4 vista1">
            <figure><img v-bind:src="producto.image" :alt="producto.titulo"></figure>
          </div>
        </div>
        <div class="row items-center justify-center entienda" v-if="producto.en_tienda.incluido">
          <p class="valor q-mr-lg">Valor: ${{ producto.en_tienda.valor }}</p>
        </div>
      </div>
      <div class="producto">
        <h2>Datos de entrega</h2>
        <form ref="contactform" action="" class="col-md-6">
          <div class="row q-col-gutter-md q-pa-lg">
            <div class="col-md-6 col-xs-12">
              <q-input class="q-mr-md q-mb-md" outlined v-model="nombre" label="* Nombre y apellido" />
            </div>
            <div class="col-md-6 col-xs-12">
              <q-input class="q-mr-md q-mb-md" outlined v-model="empresa" label="Empresa" />
            </div>
            <div class="col-md-6 col-xs-12">
              <q-input class="q-mr-md q-mb-md" outlined v-model="email" label="* Correo electrónico" />
            </div>
            <div class="col-md-6 col-xs-12">
              <q-input class="q-mr-md q-mb-md" outlined v-model="telefono" label="* Teléfono" />
            </div>
            <div class="col-md-6 col-xs-12">
              <q-input class="q-mr-md q-mb-md" outlined v-model="cuit" label="* DNI / CUIT" />
            </div>
            <div class="col-md-6 col-xs-12">
              <q-input class="q-mr-md q-mb-md" outlined v-model="domicilio" label="Domicilio (en caso de solicitar envío)" />
            </div>
            <div class="col-md-12 col-xs-12">
              <q-input type="textarea" class="q-mr-md q-mb-md" outlined v-model="aclaraciones" label="Aclaraciones" />
              <input type="text" name="ant" v-model="ant" style="display: none">
            </div>
            <div class="col-md-12 col-xs-12 text-center">
              <q-btn :disable="disable" class="q-mb-lg" label="Proceder al portal de pagos" 
              :loading="sending" type="submit" size="lg" color="green" icon="payment" @click.prevent="enviar" />
            </div>
          </div>
        </form>
      </div>
    </div>
    
  </q-page>
</template>

<script>
import productos from '../mixins/productos'
import axios from 'axios';
export default {
  name: 'Comprar',
  components: {
    'HeaderSmall': require('components/HeaderSmall.vue').default
  },
  data() {
    return {
      productoSlug: this.$route.params.slug,
      detalles_columnas: [{ name: 'detalle', label: 'Detalle', field: 'detalle', align: 'left' },
        { name: 'valor', label: 'Valor', field: 'valor', align: 'left' }],
      pagination: { rowsPerPage: 0 },
      showsearch: false,
      nombre: '',
      empresa: '',
      email: '',
      telefono: '',
      cuit: '',
      domicilio: '',
      aclaraciones: '',
      ant: '',
      sending: false,
      alert: false,
      disable: false,
      mensaje_alert: 'Por favor complete los campos requeridos.',
      mensaje_confirmed: 'Su mensaje ha sido enviado. Nos pondremos en contacto con usted a la brevedad.',
    }
  },
  mixins: [productos],
  watch: {
    $route(to, from) {
      if (this.$route.params.slug) {
      this.getProductoBySlug(this.$route.params.slug)
      } else if (this.$route.params.code) {
        this.getProductoByCode(this.$route.params.code)
      }
    }
  },
  methods: {
    enviar: function() {
      var self = this
      this.submitting = true
      if ((this.nombre == '') || (this.email == '') || (this.telefono == '')) {
        this.mensaje_alert = 'Por favor complete los campos requeridos.'
        this.alert = true
        this.sending = false
      } else {
        var data = new FormData();
        data.append('nombre', this.nombre);
        data.append('email', this.email);
        data.append('telefono', this.telefono);
        data.append('cuit', this.telefono);
        data.append('empresa', this.empresa);
        data.append('ant', this.ant);
        data.append('producto', this.producto.titulo);
        data.append('domicilio', this.domicilio);
        data.append('aclaraciones', this.aclaraciones);
        axios.post('https://autostock-sa.com.ar/app/pedido.php', data).then(response => {
          if (response.data == 'Mail enviado') {
            this.sending = false
            //this.confirmed = true
            this.disable = true
            console.log('Pedido enviado. Redireccionando a portal de pagos...')
            window.location = self.producto.linkDePago
          } else {
            this.sending = false
            this.mensaje_alert = 'Ocurrió un error y no pudo enviarse el formulario. Por favor intente nuevamente o comuniquese via mail o teléfono.'
            this.alert = true
            console.log(response.data)
          }
        });
      }
    }
  },
  mounted() {
    if (this.$route.params.slug) {
      this.getProductoBySlug(this.$route.params.slug)
    } else if (this.$route.params.code) {
      this.getProductoByCode(this.$route.params.code)
    }
    this.showsearch = false
  }
}
</script>

<style lang="stylus" scoped>
  .producto { flex-direction: column; display: flex; border: 1px solid grey; margin-top: 30px; width: 100% }
  .producto h2 { width: 100%; padding: 20px; box-sizing: border-box; background: black; color: white; display: flex; 
    flex-wrap: wrap; font-size: 36px; font-weight: bold; margin: 0; line-height: 1.3em }
  .producto figure { max-width: 400px; padding: 20px }
  .entienda .valor { font-weight: bold; color: green; margin-bottom: 0; font-size: 2em }
</style>
