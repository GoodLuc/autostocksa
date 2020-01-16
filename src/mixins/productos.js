import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')
import tools from '../mixins/tools'

export default {
  data() {
    return {
      modeloSlug: this.$route.params.modelo,
      lastVisible: [],
      page: 1,
      isMorePage: true,
      productosEnKit: []
    }
  },
  mixins: [tools],
  watch: {
    $route(to, from) {
      if (this.$route.params.modelo) {
        this.getProductosByModelo(this.$route.params.modelo)
        this.getModeloBySlug(this.$route.params.modelo)
        if ((this.marcaH != null) && (this.marcaInput == null)) {
          this.marcaInput = this.marcaH
          this.modeloInput = this.modelo.name
        }
      } else {
        this.$store.commit('clearMarcayModelo')
      }
    }
  },
  computed: {
    ...mapState(['marcaH', 'modelo', 'productos', 'producto']),
    type_cabina: function () {
      if (this.productos.filter(producto => (producto.tipo_de_filtro == "Cabina"))) {
        return this.productos.filter(producto => (producto.tipo_de_filtro == "Cabina"))
      } else {
        return false
      }
    },
    type_aire: function () {
      if (this.productos.filter(producto => (producto.tipo_de_filtro == "Aire"))) {
        return this.productos.filter(producto => (producto.tipo_de_filtro == "Aire"))
      } else {
        return false
      }
    },
    type_combustible: function () {
      if (this.productos.filter(producto => (producto.tipo_de_filtro == "Combustible"))) {
        return this.productos.filter(producto => (producto.tipo_de_filtro == "Combustible"))
      } else {
        return false
      }
    },
    type_aceite: function () {
      if (this.productos.filter(producto => (producto.tipo_de_filtro == "Aceite"))) {
        return this.productos.filter(producto => (producto.tipo_de_filtro == "Aceite"))
      } else {
        return false
      }
    },
    type_kit: function () {
      if (this.productos.filter(producto => (producto.tipo_de_filtro == "Kit"))) {
        return this.productos.filter(producto => (producto.tipo_de_filtro == "Kit"))
      } else {
        return false
      }
    }
  },
  methods: {
    getProductosByModelo(modeloSlug) {
      let self = this
      fb.productos.where('aplicaciones_array', 'array-contains', modeloSlug).get().then(function (querySnapshot) {
        var productos = [];
        console.log('querysnapshot is:')
        console.log(querySnapshot)
        querySnapshot.forEach(function (doc) {
          productos.push(doc.data());
        });
        self.$store.commit('setProductos', productos)
        console.log(productos);
      })
    },
    getProductosDeTienda() {
      let self = this
      fb.productos.where('tipo_de_filtro', '==', 'Kit').get().then(function (querySnapshot) {
        var productos = [];
        console.log('querysnapshot is:')
        console.log(querySnapshot)
        querySnapshot.forEach(function (doc) {
          productos.push(doc.data());
        });
        self.$store.commit('setProductos', productos)
        console.log(productos);
      })
    },
    getProductosByLatest() {
      let self = this
      if (this.page > 1) {
        var pageIndex = self.page-2
        console.log('query starting at: ' + this.lastVisible[pageIndex])
        fb.productos.orderBy("date", "desc").startAfter(self.lastVisible[pageIndex]).limit(25).get().then(function (documentSnapshots) {
          if (documentSnapshots.docs.length < 25) {
            self.isMorePage = false
          } else {
            self.lastVisible.push(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
          }
          var productos = [];
          documentSnapshots.forEach(function (doc) {
            productos.push(doc.data());
          });
          self.$store.commit('setProductos', productos)
          self.$q.loading.hide()
        });
      } else {
        console.log('query starting at zero')
        fb.productos.orderBy("date", "desc").limit(25).get().then(function (documentSnapshots) {
          self.lastVisible.push(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
          var productos = [];
          documentSnapshots.forEach(function (doc) {
            productos.push(doc.data());
          });
          self.$store.commit('setProductos', productos)
          self.$q.loading.hide()
        });
      }
    },
    nextPage() {
      this.page = this.page + 1
      this.getProductosByLatest()
      this.$q.loading.show()
      console.log('page is: ' + this.page)
    },
    prevPage() {
      this.page = this.page - 1
      this.isMorePage = true
      this.getProductosByLatest()
      this.$q.loading.show()
    },
    getModeloBySlug(slug) {
      var self = this
      fb.modelos.where('modelosArr', 'array-contains', slug).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log("slug for model: ")
          console.log(doc.data().modelos.find(item => item.slug == slug).name)
          self.$store.commit('setModeloBySlug', doc.data().modelos.find(item => item.slug == slug))
          self.$store.commit('setMarcaByModelo', doc.id)
        });
      }).catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    },
    getProductoBySlug(slug) {
      var self = this
      fb.productos.where('slug', '==', slug).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var docData = doc.data()
          docData.id = doc.id
          console.log('docdata is: ')
          console.log(docData)
          self.$store.commit('setProductoBySlug', docData)
        });
      }).catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    },
    getKitBySlug(slug) {
      var self = this
      fb.productos.where('slug', '==', slug).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var docData = doc.data()
          docData.id = doc.id
          console.log('docdata is: ')
          console.log(docData)
          self.$store.commit('setProductoBySlug', docData)
          doc.data().incluidos.forEach(function (element) {
            fb.productos.where('slug', '==', self.slugify(element)).get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                var docData = doc.data()
                docData.id = doc.id
                self.productosEnKit.push(docData)
              })
            }).catch(function (error) {
              console.log("Error getting documents: ", error);
            });

          })
        });
      }).catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    },

    
  },
  mounted() {
    if (!this.$route.params.modelo) {
      this.$store.commit('clearMarcayModelo')
    }
  }
}