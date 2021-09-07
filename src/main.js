import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'

Vue.config.productionTip = false
const isAuth = sessionStorage.getItem("isAuthenticated")

router.beforeEach((to, from, next) => {
 
  if (to.name !== 'login' && !isAuth) {   
    next({ name: 'login' })
  } else {    
    store.state.isAuthenticated = isAuth
    next()    
  }
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
