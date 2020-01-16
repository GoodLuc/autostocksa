<template>
  <q-layout>
    <main>
      <q-page-container>
        <router-view  />
        <Footer></Footer>
      </q-page-container>
    </main>
  </q-layout>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
    }
  },
  components: {
    'Footer': require('components/Footer.vue').default
  }
}
</script>

<style lang="stylus">
  body { font-family: 'Rajdhani', sans-serif; font-size: 19px; min-width: 400px }
  img { max-width: 100% }
  body h1, body h2, body h3 { text-transform: uppercase; font-weight: 500; line-height: 1.3em }
  h1 { font-size: 34px }
  h2 { font-size: 30px }
  h3 { font-size: 24px; font-weight: bold }
  figure { margin: 0 }
  .content { max-width: 1200px; margin-left: auto; margin-right: auto; width: 100%; padding-left: 24px; padding-right: 24px }
  .content.wcol { padding-left: 0; }
  select { font-size: 19px; }
  .mainhead {
    background: url('~assets/img/header-bg.jpg') center center no-repeat; width: 100%;
  }
  .mainhead h2 { color: white } 
  .buscador h3 { color: white; margin: 0 }
  .mainmenu { display: flex; justify-content: space-between; background: white; list-style: none; padding: 15px; }
  .mainmenu li a { text-align: center; color: #2f3032; text-transform: uppercase; text-decoration: none;
    font-size: 21px; font-family: 'Rajdhani', sans-serif; font-weight: 500; }
  .mainmenu li a.router-link-active { color: red }
  .responsiveMenu { display: none }
  .responsiveMenu .mainmenu { flex-direction: column }
  .responsiveMenu .mainmenu li { margin-bottom: 15px }
  .norad { border-radius: 0; height: 50px }

  @media (max-width: 900px) {
    .mainhead { padding-top: 50px }
    .desktopMenu { display: none }
    .responsiveMenu { display: flex; align-items: flex-start;
      position: fixed; left: -200px; top: 0; z-index: 4; height: 100vh }
    .responsiveMenu.rMOpen { left: 0 }
    .responsiveMenu .mainmenu { width: 200px; margin: 0; height: 100%; justify-content: flex-start }
  }

  .buscador { margin-top: 100px; margin-bottom: 50px; }
  .airContainer { width: 100%; max-width: 1200px; margin: auto; }

  .lh a, .bh a { line-height: 1em; display: flex; align-items: center; margin: 0 auto 20px; 
    text-decoration: none; color: inherit } 
  .lh a > *:last-child { margin-left: auto }
  .lh a > *:first-child, .bh a > *:first-child { margin-right: 8px }
  .bh a, .bbh { padding-bottom: 10px; border-bottom: 1px solid #CE0000; font-weight: 200; font-size: 50px; width: 100% }
  
  .boton a { background: #CE0000; color: white; padding: 20px; display: inline-block; 
    font-weight: 500; text-transform: uppercase; text-decoration: none }
  .boton { margin-bottom: 5px }

  
  .typeselector > div { text-transform: uppercase; display: flex; flex-wrap: wrap } 
  .typeselector > div a { border-right: 1px solid white; background: #232323; color: white; 
    text-decoration: none; padding: 10px 20px 10px 10px; display: block; margin: 0 0px 1px }
  .typeselector > div >div:last-of-type a { border-right: none }
  .typeselector > div a:hover, .istype a.router-link-exact-active { background: #CE0000 }

</style>
