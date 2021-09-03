import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'

Vue.config.productionTip = false
const isAuth = sessionStorage.getItem("isAuthenticated")

router.beforeEach((to, from, next) => {
  console.log(to.name)
  console.log(isAuth)
  
  if (to.name !== 'login' && !isAuth) {
    console.log("entrooo if")
    next({ name: 'login' })
  } else {
    console.log("etro else")
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
