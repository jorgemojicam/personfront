import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,   
    user: {},
    modulos: {}
  },
  getters: {
    getUser: state => state.user,
    getmodulos: state => state.modulos
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
