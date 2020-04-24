// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */ )

// vuex
import Vuex from 'vuex'
import store from './store'

// city
import Distpicker from 'v-distpicker'
Vue.component('v-distpicker', Distpicker)


// api
// Axios.defaults.baseURL = "http://nhjd.public.5151fw.com/";
// Axios.defaults.headers["Content-type"] = "application/json";

Vue.use(Vuex)

// 导航守卫前置
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  console.log(to, 'to');
  console.log(from, 'from');
  // console.log(next, 'next');
  // 控制banner的走马灯显示
  to.name == 'shoppingmall' || to.name == 'mine' || to.name == 'commoditydetails' || to.name == 'payment' ||
    to.name == 'minecenter' || to.name == 'shoppingcar' || to.name == 'orderlist' ||
    to.name == 'order' ? store.state.isbanshow = false : store.state.isbanshow = true;
  if (to.meta.requireLogin) {
    console.log(1)
    let islogin = store.state.islogin
    if (islogin == false) {
      confirm("请登录")
      if (confirm("请登录") == true) {
        next("/shoppingmall")
        store.state.logreg = true
      } else {
        return
      }

    } else {
      next()
    }

  } else {

    next()
  }



})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
