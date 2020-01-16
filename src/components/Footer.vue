<template>
  <footer class="row mainFoot justify-between items-end q-pa-lg">
    <figure><img src="~assets/img/sakura-autostock.png" alt="Filtros Sakura + AutoStock S.A."></figure>
    <ul>
      <li><span>Líneas directas:</span> <a href="tel:0800-777-7862">0800-777-7862</a></li>
      <li><span>Pedidos y consultas:</span> <a href="tel:1147899393">(011) 4789 9393</a></li>
      <li><span>Correo:</span> <a href="mailto:&#118;&#101;&#110;&#116;&#097;&#115;&#064;&#097;&#117;&#116;&#111;&#115;&#116;&#111;&#099;&#107;&#045;&#115;&#097;&#046;&#099;&#111;&#109;&#046;&#097;&#114;">&#118;&#101;&#110;&#116;&#097;&#115;&#064;&#097;&#117;&#116;&#111;&#115;&#116;&#111;&#099;&#107;&#045;&#115;&#097;&#046;&#099;&#111;&#109;&#046;&#097;&#114;</a></li>
      <li><a href="#"><img src="~assets/img/icon-fb.png" alt="Facebook"></a><a href="#"><img src="~assets/img/icon-insta.png" alt="AutoStock en Instagram"></a><a href="#"><img src="~assets/img/icon-tw.png" alt="AutoStock en Twitter"></a></li>
    </ul>
    <p>Copyright © 2019 Autostock Internacional S.A.</p>
  </footer>
</template>

<script>

export default {
  data() {
    return {
    }
  },
}
</script>

<style lang="stylus">
  .mainFoot { background: #161616; color: white }
  .mainFoot figure { margin-right: 20px; }
  .mainFoot ul { list-style: none; padding: 0; text-transform: uppercase; font-size: 23px; 
    margin: 0; margin-right: auto; font-weight: 400; }
  .mainFoot ul li { margin-top: 7px; }
  .mainFoot ul span { color: #ce0000; }
  .mainFoot a { display: inline-block; color: white; margin-left: 10px } .mainFoot ul a { margin-right: 10px;}
</style>