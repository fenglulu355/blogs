// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

import httpUrl from "../src/api/url.vue"
// element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */ )

// vant
import {
  Uploader,
} from 'vant';

Vue.use(Uploader)

import 'vant/lib/index.css';


// vuex
import Vuex from 'vuex'
import store from './store'

// city
import Distpicker from 'v-distpicker'
Vue.component('v-distpicker', Distpicker)


import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '1psZ4xyaMn41pcE5m2kqZLCStXpNslkh'
})


// api
Vue.prototype.$axios = Axios

Vue.prototype.httpUrl = httpUrl.httpUrl;
// Axios.defaults.baseURL = "http://nhjd.public.5151fw.com/";
Axios.defaults.baseURL = "https://www.scnhjd.com/";
Axios.defaults.headers["Content-type"] = "application/json";

Vue.use(Vuex)


// 导航守卫前置
router.beforeEach((to, from, next) => {
  console.log(to, 'to');
  console.log(from, 'from');
  if (to.path == '/privacy' || to.path == '/policy') {
    store.state.ispri = false
  } else {
    store.state.ispri = true
  }
  // 控制轮播
  to.meta.islb ? store.state.islb = true : store.state.islb = false
  // 控制banner的走马灯显示
  to.meta.isbanner ? store.state.isbanshow = false : store.state.isbanshow = true;
  // 判断是否登录
  if (to.meta.requireLogin) {
    let islogin = store.state.islogin
    if (islogin == false) {
      // confirm("请登录")
      if (confirm("请登录") == true) {
        next("/shoppingmall")
        store.state.logreg = true
      } else {
        // next("/shoppingmall")
        store.state.logreg = false
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
