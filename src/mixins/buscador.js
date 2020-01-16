import { mapState, mapMutations } from 'vuex'
const fb = require('../firebaseConfig.js')
export default {
  data() {
    return {
      marcaInput: null,
      modeloInput: null,
      marcasDeAuto: [],
      modelosDeAuto: [],
      loading: false,
      loading2: false
    }
  },
  computed: {
    ...mapState(['marcas', 'marcaH', 'modelo', 'modelos', 'modelosNames', 'modelosSlugs']),
  },
  mounted() {
    if (this.marcas == null) {
      var self = this
      this.loading = true
      fb.marcas.get().then(function (doc) {
        if (doc.exists) {
          var marcas = doc.data().marcas
          self.$store.commit('setMarcas', marcas);
          self.loading = false
        }
      })
    }
    if (this.$route.params.modelo) {
      console.log('params is ' + this.$route.params.modelo)
      this.marcaInput = this.modelo.name
    } else {
      console.log('no params')
    }
  },
  watch: {
    marcaInput: function (val, oldVal) {
      this.getModelosByMarca()
    },
    marcaH: function () {
      if ((this.marcaH != null) && (this.marcaInput == null)) {
        this.marcaInput = this.marcaH
      }
    },
    modelo: function () {
      if ((this.modelo != null) && (this.modeloInput == null)) {
        console.log('modelo not null: ' + this.modelo.name)
        this.modeloInput = this.modelo.name
      } else {
        console.log('modelo null:' + this.modelo.name)
      }
    }
  },
  methods: {
    ...mapMutations(['setMarcas']),
    getModelosByMarca: function () {
      this.loading2 = true
      // Getting modelos from marca document
      var self = this
      var modelosNames = []
      var modelosSlugs = []
      var modelos = []
      this.modeloInput = null
      if (this.marcaInput) {
        fb.modelos.doc(this.marcaInput).get().then(function (doc) {
          if (doc.data().modelos) {
            doc.data().modelos.forEach(function (item) {
              modelosNames.push(item.name)
              modelosSlugs.push(item.slug)
              modelos.push(item)
              self.loading2 = false
            });
            self.$store.commit('setModelos', modelos)
            self.$store.commit('setModelosNamesByMarca', modelosNames)
            self.$store.commit('setModelosSlugsByMarca', modelosSlugs)
          } else {
            alert('No se encontraron modelos para esa marca.')
            self.$store.commit('setModelos', [])
            self.$store.commit('setModelosNamesByMarca', [])
            self.$store.commit('setModelosSlugsByMarca', [])
            self.loading2 = false
          }
        })
      }
    },
    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.marcasDeAuto = this.marcas
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.marcasDeAuto = this.marcas.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterFn2(val, update) {
      if (val === '') {
        update(() => {
          this.modelosDeAuto = this.modelosNames
        })
        return
      }
      update(() => {
        const keywords = val.toLowerCase().split(' ')
        this.modelosDeAuto = this.modelosNames.filter(function hasKeywords(value) {
          var inAll = true
          keywords.forEach(function (keyword) {
            if (value.toLowerCase().indexOf(keyword) == -1) {
              inAll = false
            }
          })
          if (inAll) { return value }
        }) 
      })
    }
  },
}