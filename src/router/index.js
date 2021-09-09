import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Registro from '../views/Registro'
import Login from '../views/Login'
import Contenedor from '../views/Contenedor'
import Usuarios from '../views/Usuarios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'contenedor',
    component: Contenedor
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Contenedor,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/registro',
        name: 'Registro',
        component: Registro
      },
      {
        path: '/usuarios',
        name: 'Usuarios',
        component: Usuarios
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  }
]

const router = new VueRouter({ 
  routes
})

export default router
