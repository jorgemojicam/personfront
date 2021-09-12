import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import axios from 'axios';

Vue.config.productionTip = false

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const auth_token = JSON.parse(localStorage.getItem('token'));
  if (auth_token) {
    config.headers.Authorization = `Bearer ${auth_token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

router.beforeEach((to, from, next) => {
  const isAuth = sessionStorage.getItem("isAuthenticated")
  if (to.name !== 'login' && !isAuth) {
    next({
      name: 'login'
    })
  } else {
    const user = JSON.parse(localStorage.getItem("user"))
    store.state.isAuthenticated = isAuth
    store.state.user = user;
    next()
  }
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')