import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  const isAuth = sessionStorage.getItem("isAuthenticated")
 
  if (to.name !== 'login' && !isAuth) {   
    console.log("entro redireccion main")
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
