import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  console.log(to.name)
  if (to.name !== 'login' && !localStorage.getItem("isAuthenticated")) {
    console.log("entrrrrrrrrrreeeeeeee")
    next({ name: 'login' })
  } else {
    next()
    //store.state.isAuthenticated = localStorage.getItem("isAuthenticated")
  }
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
