<template>
  <q-page>
    <HeaderBig></HeaderBig>
    <div class="row content wcol q-col-gutter-lg q-mt-lg">
      <div class="col-md-6 col-sm-12">
        <h2 class="lh">
          <router-link to="/nosotros">
            <q-icon size="sm" name="img:statics/icons/icon_s.png" />
            <span>AutoStock Internacional S.A.</span>
            <q-icon size="sm" name="img:statics/icons/icon_red-arrow-right.png" />
          </router-link>
        </h2>
        <ul class="intro-as">
          <li>
            <q-icon size="64px" name="img:statics/icons/icon_red.png" />
            <span>Red de distribuidores mayoristas de primer nivel en todo el territorio del país.</span>
          </li>
          <li>
            <q-icon size="64px" name="img:statics/icons/icon_tecnologias.png" />
            <span>Tecnologías de filtrado innovadoras con máxima eficiencia demostrada en laboratorios.</span>
          </li>
          <li>
            <q-icon size="64px" name="img:statics/icons/icon_sakura.png" />
            <span>Calidad y seguridad normativa SAKURA exportada a más de 80 países.</span>
          </li>
          <li>
            <q-icon size="64px" name="img:statics/icons/icon_stock.png" />
            <span>Adecuados niveles de stock en nuestros almacenes de Buenos Aires y Zona Franca de La Plata.</span>
          </li>
        </ul>
      </div>
      <div class="col-md-6 col-sm-12">
        <h2 class="lh">
          <router-link to="/nosotros">
            <q-icon size="sm" name="class" style="color: #CE0000" />
            <span>Catálogo online</span>
            <q-icon size="sm" name="img:statics/icons/icon_red-arrow-right.png" />
          </router-link>
        </h2>
        <div class="intro-ctlg">
          <p>Descubra el universo de productos sakura desde el buscador o accediendo al catálogo</p>
          <figure><img src="statics/catalogo-sakura.jpg" alt="Catálogo filtros Sakura"></figure>
          <div>
            <p class="boton"><router-link to="/buscar">Buscar por modelo o código</router-link></p>
            <p class="boton"><router-link to="/catalogo">Ver catálogo</router-link></p>
          </div>
        </div>
      </div>
    </div>

    <div class="intro-nt full-width q-my-xl q-py-xl">
      <div class="row content">
        <h1 class="bh">
          <router-link to="/tecnologia">
            <q-icon size="sm" name="img:statics/icons/icon_white.png" />
            Nuevas tecnologías Sakura
          </router-link>
        </h1>
      </div>
      <div class="row content wcol q-col-gutter-lg">
        <div class="col-md-6">
          <article class="row">
            <figure class="col-md-6"><router-link to="/tecnologia/bioguard"><img src="statics/stc/bioguard.jpg" alt="Bioguard"></router-link></figure>
            <div class="col-md-6">
              <router-link to="/tecnologia/bioguard">
                <h2>Bioguard, el filtro triple capa probado en laboratorios</h2>
                <span><q-icon size="md" name="arrow_right_alt" color="white" /></span>
              </router-link>
            </div>
          </article>
        </div>
        <div class="col-md-6">
          <article class="row">
            <figure class="col-md-6"><router-link to="/tecnologia/supreme-guard"><img src="statics/stc/supreme-guard.jpg" alt="Supreme Guard"></router-link></figure>
            <div class="col-md-6">
              <router-link to="/tecnologia/supreme-guard">
                <h2>SupremeGuard, filtro de aceite de extra larga duración</h2>
                <span><q-icon size="md" name="arrow_right_alt" color="white" /></span>
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  components: {
    'HeaderBig': require('components/HeaderBig.vue').default,
  },
}
</script>

<style lang="stylus" scoped>
.intro-as { padding: 0; margin: 0 }
.intro-as li { display: flex; background: #161616; color: white; text-transform: uppercase; 
  margin-bottom: 15px; list-style: none; padding: 25px; align-items: center }
.intro-as li img { flex-shrink: 0 }
.intro-as li:last-of-type { margin-bottom: 0 }
.intro-as li > *:first-child { margin-right: 13px }

.intro-ctlg { border: 1px solid #CE0000 }
.intro-ctlg > p { padding: 20px; background: #CE0000; text-transform: uppercase; color: white; font-size: 23px }
.intro-ctlg > div, .intro-ctlg > figure { padding: 20px; display: flex; justify-content: space-between }

.intro-nt { background: #161616; color: white }
//.intro-nt article { display: flex }
.intro-nt article div { background: white }
//.intro-nt article figure { width: 30% }
.intro-nt article div a { display: flex; flex-direction: column; justify-content: space-between; color: #232323; text-decoration: none; height: 100% }
.intro-nt article h2 { padding: 0 20px; font-size: 24px }
.intro-nt article div a span { background: #CE0000; padding: 20px; text-align: right }

</style>
