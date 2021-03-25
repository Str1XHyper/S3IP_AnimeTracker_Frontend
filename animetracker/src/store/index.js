import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: {
      username: "Str1X",
      email: "",
      iD:""
    },

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

  },
  actions: {
  },
  modules: {
  }
})
 