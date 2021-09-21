import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Registro from '../views/Registro'
import Login from '../views/Login'
import Contenedor from '../views/Contenedor'
import Usuarios from '../views/Usuarios'
import Reporte from '../views/Reporte'
import Permisos from '../views/Permisos'

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
        path: '/reporte',
        name: 'Reporte',
        component: Reporte
      },
      {
        path: '/permisos',
        name: 'Permisos',
        component: Permisos
      }
    ]
  }
]

const router = new VueRouter({ 
  routes
})

export default router
