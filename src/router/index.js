import Vue from 'vue'
import VueRouter from 'vue-router'
const fb = require('../firebaseConfig.js')

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store } /* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    
    /*function fetchUserData() {
      return new Promise(function (resolve, reject) {
        var db = firebase.firestore(); // OR realtime db
        db.collection("users").get().then(function (snap) {
          resolve(snap);
        }).catch(function (error) {
          reject(error);
        });
      });
    }*/

    let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth) {
      fb.auth.onAuthStateChanged(user => {
        var currentUser = fb.auth.currentUser
        if (!currentUser) {
          console.log('Por favor ingrese'); next('/acceso')
        } else {
          fb.db.collection('usuarios').doc(currentUser.uid).get().then(function (doc) {
            var usuario = doc.data()
            usuario.uid = currentUser.uid
            store.commit('setCurrentUser', usuario)
            if (store.getters.userRol != 'admin') { console.log('No autorizado'); next('/') }
            if (store.getters.userRol == 'admin') { console.log('Bienvenido'); next() }
          }).catch(function (error) {
            console.log("Error getting document:", error);
          });
        }
      })
    } else {
      next()
    }
  })

  return Router
}
