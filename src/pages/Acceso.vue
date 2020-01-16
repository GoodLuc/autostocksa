<template>
  <q-layout view="hhh lpR fFf">

    <q-header elevated class="bg-grey-10 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/img/single-logo.png">
          </q-avatar>
          AutoStock
        </q-toolbar-title>
      </q-toolbar>

    </q-header>

    <q-page-container>
      <q-layout view="lHh lpR fFf">
        <div class="airContainer q-pa-lg">
          <div class="login">
            <h1>Ingrese su email y contraseña para acceder</h1>
            <p class="text-deep-orange" v-if="mensaje" v-html="mensaje"></p>
            <form @submit.prevent="login">
              <q-input v-model="email" class="q-mb-md" outlined type="email" label="E-mail" />
              <q-input v-model="password" outlined :type="isPwd ? 'password' : 'text'" label="Contraseña">
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
                </template>
              </q-input>
              <div class="row justify-end">
                <q-btn type="submit" :loading="loggingIn" label="Ingresar" class="q-mt-md"  size="lg" color="primary" icon="lock_open" >
                  <template v-slot:loading><q-spinner /></template>
                </q-btn>
              </div>
            </form>
          </div>
        </div>
      </q-layout>
    </q-page-container>

  </q-layout>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
  data () {
    return {
      email: '',
      password: '',
      loggingIn: false,
      isPwd: true,
      mensaje: null
    }
  },
  methods: {
    login () {
      var self = this
      self.loggingIn = true
      fb.auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
        self.loggingIn = false
        fb.db.collection('usuarios').doc(user.user.uid).get().then(function(doc) {
          var usuario = doc.data()
          usuario.uid = user.user.uid
          self.$store.commit('setCurrentUser', usuario)
          self.$router.push('/panel')
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
      }).catch(err => {
          self.loggingIn = false
          if (err.code == 'auth/user-not-found') {
            self.mensaje = 'No se ha encontrado un usuario con el email <b>'+self.email+'</b>.'
          } else if (err.code == 'auth/wrong-password') {
            self.mensaje = 'Por favor revise la contraseña.'
          }
          console.log(err)
      })
    },
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.mensaje == 'logout') {
        this.mensaje = 'Sesión cerrada.'
      } else {
        this.mensaje = null
      }
    }
  },
  mounted() {
    if (this.$route.params.mensaje == 'logout') {
      this.mensaje = 'Sesión cerrada.'
    } else {
      this.mensaje = null
    }
  }
}
</script>

<style lang="stylus">
  body { font-family: 'Rajdhani', sans-serif; font-size: 19px; }
  img { max-width: 100% }
  body h1, body h2, body h3 { text-transform: uppercase; font-weight: 500; line-height: 1.3em }
  h1 { font-size: 30px; } h2 { font-size: 24px; margin: 0 }
  .airContainer { width: 100%; max-width: 1200px; margin: auto; }
  .login { max-width: 600px; padding: 20px; margin: auto; border: 1px solid blue; border-radius: 5px }
</style>
