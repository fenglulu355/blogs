import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios'

Vue.use(ElementUI);
Vue.prototype.$axios = Axios;


Vue.config.productionTip = false;
Axios.defaults.baseURL = "http://10.2.3.182:8080";
Axios.defaults.headers["Content-type"] = "application/json";

//导航前置守卫

function set(to) {
  store.commit("SET_TOP_STATE", to.name == "logReg" ? false : true);
  store.commit("SET_BOTTOM_STATE", to.name == "logReg" ? false : true)
}
router.beforeEach((to, from, next) => {
  if (to.name == "setting" || to.name == "curriculum") {

    let loginUser = store.state.loginUser;
    if (!loginUser) {
      confirm("请登录")
      if (confirm("请登录") == true) {
        next("/logReg")
      } else {
        return
      }
    } else {
      set(to);
      next()
    }

  } else {

    set(to);
    next()
  }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')