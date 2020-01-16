const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/buscar',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Buscar.vue') }
    ]
  },
  {
    path: '/tecnologia',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Tecnologia.vue') },
      { path: 'supreme-guard', component: () => import('pages/Tecnologia_Supreme-guard.vue') },
      { path: 'bioguard', component: () => import('pages/Tecnologia_Bioguard.vue') }
    ]
  },
  {
    path: '/sakura',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Sakura.vue') }
    ]
  },
  {
    path: '/nosotros',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Nosotros.vue') }
    ]
  },
  {
    path: '/contacto',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Contacto.vue') }
    ]
  },
  {
    path: '/tienda',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Tienda.vue') }
    ]
  },
  {
    path: '/comprar/:slug',
    component: () => import('layouts/Main.vue'),
    children: [
      { name: 'Comprar', path: '', component: () => import('pages/Comprar.vue') }
    ]
  },
  {
    path: '/productos/:modelo',
    component: () => import('layouts/Main.vue'),
    children: [
      { name: 'Productos', path: '', component: () => import('pages/Productos.vue') }
    ]
  },
  {
    path: '/producto',
    component: () => import('layouts/Main.vue'),
    children: [
      { name: 'Producto', path: ':slug', component: () => import('pages/Producto.vue') },
      //{ name: 'Producto', path: ':code', component: () => import('pages/Producto.vue') }
    ]
  },
  {
    path: '/kit',
    component: () => import('layouts/Main.vue'),
    children: [
      { name: 'Kit', path: ':slug', component: () => import('pages/Kit.vue') },
      //{ name: 'Producto', path: ':code', component: () => import('pages/Producto.vue') }
    ]
  },
  { path: '/acceso', name: 'Acceso', component: () => import('pages/Acceso.vue') },
  { path: '/acceso/:mensaje', name: 'Acceso-Mensaje', component: () => import('pages/Acceso.vue') },
  {
    path: '/panel',
    meta: { requiresAuth: true },
    component: () => import('layouts/Panel.vue'),
    children: [
      { name: 'Panel-Home', path: '', component: () => import('pages/Panel_Home.vue') },
      { name: 'Panel-Edit', path: 'add', component: () => import('pages/Panel_Edit.vue') },
      { name: 'Panel-Edit-Product', path: 'edit/:producto', component: () => import('pages/Panel_Edit.vue') },
      { name: 'Panel-Aplicaciones', path: 'aplicaciones', component: () => import('pages/Panel_Aplicaciones.vue') },
      { name: 'Panel-Productos', path: 'productos', component: () => import('pages/Panel_Productos.vue') },
      { name: 'Panel-Productos-Search', path: 'productos/:modelo', component: () => import('pages/Panel_Productos.vue') }
    ]
  },
  
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
