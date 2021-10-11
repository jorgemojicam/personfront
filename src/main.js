/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Add a request interceptor
axios.interceptors.request.use(config => {
  const auth_token = JSON.parse(localStorage.getItem('token'))
  if (auth_token) {
    config.headers.Authorization = `Bearer ${auth_token}`
  }

  return config
}, error => Promise.reject(error))

axios.interceptors.response.use(response => response, error => Promise.reject(error))

router.beforeEach((to, from, next) => {
  const isAuth = sessionStorage.getItem('isAuthenticated')
  if (to.name !== 'login' && !isAuth) {
    next({
      name: 'login',
    })
  } else {
    const user = JSON.parse(localStorage.getItem('user'))
    store.state.isAuthenticated = isAuth
    store.state.user = user
    next()
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
