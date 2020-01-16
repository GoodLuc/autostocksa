import Vue from 'vue'
import Vuex from 'vuex'
import tools from '../mixins/tools'
const fb = require('../firebaseConfig.js')
Vue.use(Vuex)

fb.auth.onAuthStateChanged(user => {
  if (user) {
    console.log('usuario logueado: '+user.uid)
  }
})

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

let store
export default function (/* { ssrContext } */) {
  return store = new Vuex.Store({
    state: {
      marcas: null,
      marcaH: null,
      modelo: '',
      modelos: null,
      modelosNames: null,
      modelosSlugs: null,
      productos: [],
      producto: null,
      currentUser: null
    },
    mixins: [tools],
    mutations: {
      setMarcas(state, marcas) {
        state.marcas = marcas
      },
      setModelos(state, modelos) {
        state.modelos = modelos
      },
      addModelo(state, modelo) {
        state.modelos.push(modelo)
        state.modelosSlugs.push(modelo.slug)
        state.modelosNames.push(modelo.name)
      },
      setModelosNamesByMarca(state, names) {
        state.modelosNames = names
      },
      setModelosSlugsByMarca(state, slugs) {
        state.modelosSlugs = slugs
      },
      setModeloBySlug(state, modelo) {
        state.modelo = modelo
      },
      setMarcaByModelo(state, marca) {
        state.marcaH = marca
      },
      clearMarcayModelo(state) {
        state.marcaH = null
        state.modelo = ''
      },
      setProductos(state, productos) {
        state.productos = productos
      },
      setProductoBySlug(state, producto) {
        state.producto = producto
      },
      setProductoByCode(state, producto) {
        state.producto = producto
      },
      setCurrentUser(state, val) {
        state.currentUser = val
      },
    },
    actions: {
      clearData({ commit }) {
        commit('setCurrentUser', null)
        console.log('Deslogueado')
      }
    },
    getters: {
      userRol: state => {
        if (state.currentUser) {
          return state.currentUser.rol
        }
      }
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

}

