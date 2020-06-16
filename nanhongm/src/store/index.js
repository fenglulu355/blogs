import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)



export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        //只储存state中的user
        'topath': val.topath,
        'islogin': val.islogin,
        'userid': val.userid,
        'points': val.points,
        'searchinfo': val.searchinfo
      }
    }
  })],
  state: {
    islb: true,
    isbanshow: true,
    islogin: false,
    userid: '',
    logreg: false, //登录注册
    topath: '', //未登录时想去的页面路径
    orderlists: [],
    points: '',
    searchinfo: []
  },
  mutations: {
    setsearchinfo(state, e) {
      state.searchinfo = e
    },
    // 设置积分
    setpoints(state, e) {
      state.points = e
    },
    setorderlist(state, e) {
      state.orderlists = e
      console.log(state.orderlists);
    },
    // 商城的banner不需要走马灯
    setbanner(state, e) {
      state.isbanshow = e
    },
    // 设置登录状态
    setlogin(state, e) {
      state.islogin = e
    },
    // 控制登录注册显示隐藏
    setlogreg(state, e) {
      state.logreg = e
    },
    // 未登录时想去的页面路径
    settopath(state, e) {
      state.topath = e
    },
    setuserid(state, e) {
      state.userid = e
      console.log(state.userid, 'state.userid');
      console.log(e, 'e');

    }
  },
  actions: {
    getorderlist({
      commit
    }, data) {
      commit('setorderlist', data)
    },
    getuserid({
      commit
    }, data) {
      commit('setuserid', data)
    },
    // 获取商城的banner状态
    getbanner({
      commit
    }, data) {
      commit('setbanner', data);
      // console.log(data, 'banner');
    },
    // 记录登录状态
    getlogin({
      commit
    }, data) {
      commit('setlogin', data)
    },
    // 登录注册显示隐藏
    getlogreg({
      commit
    }, data) {
      commit('setlogreg', data)
    },
    // 未登录时想去的页面路径
    gettopath({
      commit
    }, data) {
      commit('settopath', data)
    },
  },
  modules: {},

})
