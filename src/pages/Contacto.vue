<template>
  <q-page>
    <HeaderSmall></HeaderSmall>
    <div class="row content q-py-lg q-col-gutter-md q-mb-xl">

      <q-dialog v-model="alert"><q-card><q-card-section></q-card-section>
        <q-card-section><div v-html="mensaje_alert"></div></q-card-section>
        <q-card-actions align="right"><q-btn flat label="OK" color="primary" v-close-popup /></q-card-actions></q-card>
      </q-dialog>

      <q-dialog v-model="confirmed" persistent><q-card><q-card-section class="row items-center">
        <q-card-section><div class="text-h6"><q-avatar icon="check_circle" color="green" text-color="white" class="q-mr-md" /> Gracias</div></q-card-section>
        <span class="q-ml-sm"><div v-html="mensaje_confirmed"></div></span></q-card-section>
        <q-card-actions align="right"><q-btn flat label="OK" color="primary" v-close-popup /></q-card-actions></q-card>
      </q-dialog>

      <h1 class="bbh">Contáctenos</h1>
      <div class="col-md-6 col-sm-12 contact">
        <ul>
          <!-- <li><span>Líneas directas:</span> <a href="tel:0800-777-7862">0800-777-7862</a></li> -->
          <li><span>Pedidos y consultas:</span> <a href="tel:1147899393">(011) 4789 9393</a></li>
          <li><span>Correo:</span> <a href="mailto:&#118;&#101;&#110;&#116;&#97;&#115;&#64;&#97;&#115;&#116;&#111;&#99;&#107;&#46;&#99;&#111;&#109;&#46;&#97;&#114;">&#118;&#101;&#110;&#116;&#97;&#115;&#64;&#97;&#115;&#116;&#111;&#99;&#107;&#46;&#99;&#111;&#109;&#46;&#97;&#114;</a></li>
          <li class="social"><a href="#"><img src="~assets/img/icon-fb.png" alt="Facebook"></a><a href="#"><img src="~assets/img/icon-insta.png" alt="AutoStock en Instagram"></a><a href="#"><img src="~assets/img/icon-tw.png" alt="AutoStock en Twitter"></a></li>
        </ul>
      </div>
      <form ref="contactform" action="" class="col-md-6 col-sm-12">
        <q-input class="full-width q-mb-md" outlined v-model="nombre" type="text" label="* Nombre y apellido" />
        <q-input class="full-width q-mb-md" outlined v-model="email" type="text" label="* Email" />
        <q-input class="full-width q-mb-md" outlined v-model="telefono" type="text" label="* Teléfono" />
        <q-input class="full-width q-mb-md" outlined v-model="empresa" type="text" label="Empresa" />
        <q-input class="full-width q-mb-md" outlined v-model="mensaje" type="textarea" label="Mensaje" />
        <input type="text" name="ant" v-model="ant" style="display: none">
        <q-btn :disable="disable" size="lg" color="red" icon="mail" type="submit" @click.prevent="enviar"
        :loading="submitting" label="Enviar" class="q-mt-md">
        </q-btn>
      </form>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PageIndex',
  data () {
    return {
      nombre: '',
      email: '',
      telefono: '',
      empresa: '',
      mensaje: '',
      ant: '',
      submitting: false,
      alert: false,
      mensaje_alert: 'Por favor complete los campos requeridos.',
      confirmed: false,
      mensaje_confirmed: 'Su mensaje ha sido enviado. Nos pondremos en contacto con usted a la brevedad.',
      disable: false
    }
  },
  components: {
    'HeaderSmall': require('components/HeaderSmall.vue').default
  },
  methods: {
    enviar: function() {
      var self = this
      this.submitting = true
      if ((this.nombre == '') || (this.email == '') || (this.telefono == '')) {
        this.mensaje_alert = 'Por favor complete los campos requeridos.'
        this.alert = true
        this.submitting = false
      } else {
        var data = new FormData();
        data.append('nombre', this.nombre);
        data.append('email', this.email);
        data.append('telefono', this.telefono);
        data.append('empresa', this.empresa);
        data.append('mensaje', this.mensaje);
        data.append('ant', this.ant);
        axios.post('https://autostock-sa.com.ar/app/gracias.php', data).then(response => {
          if (response.data == 'Mail enviado') {
            this.submitting = false
            this.confirmed = true
            this.disable = true
          } else {
            this.submitting = false
            this.mensaje_alert = 'Ocurrió un error y no pudo enviarse el formulario. Por favor intente nuevamente o comuniquese via mail o teléfono.'
            this.alert = true
            console.log(response.data)
          }
        });
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .contact ul { list-style: none; padding: 0; text-transform: uppercase; font-size: 23px; 
    margin: 0; margin-right: auto; font-weight: 400; }
  .contact ul li { margin-top: 7px; }
  .contact ul span {  }
  .contact a { display: inline-block; margin-left: 10px; color: #ce0000 }
  .social a { background: #ce0000; border-radius: 5px; padding: 8px 8px 0; margin-left: 0; margin-right: 10px }

</style>
