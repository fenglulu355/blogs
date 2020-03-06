import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    name: "aaa",
    age: '18'
  },
  mutations: {
    show(state, msg) {
      state.name = msg
    }
  }

})
