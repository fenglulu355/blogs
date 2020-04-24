import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import {
  mutations
} from "./mutations"
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        //只储存state中的user
        loginUser: val.loginUser,
        username: val.username,
        chapter: val.chapter,
        video: val.video,
        teacher: val.teacher
      }
    }
  })],
  state: {
    video: '',
    showTOP: true,
    showBOTTOM: true,
    loginUser: '',
    shoppingCart: [], //购物车
    username: '',
    chapter: '',
    item: '',
    infos: [],
    teacher: "",
    httpUrl: "http://10.2.5.34:8888/"
  },
  mutations,
  actions: {},
  modules: {}
})