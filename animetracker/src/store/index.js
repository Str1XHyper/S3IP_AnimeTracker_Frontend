import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: {},
    apiError: false,
  },
  mutations: {
    setLoggedIn(state){
      state.loggedIn = true
    },
    setLoggedOut(state){
      state.loggedIn = false
    },
    setUser(state, user) {
      state.user = user
    },
    setError(state){
      state.apiError = true;
    },
    clearError(state){
      state.apiError = false;
    },
  },
  actions: {
  },
  modules: {
  }
})
 