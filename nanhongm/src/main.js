// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import httpUrl from "../src/api/url.vue"
import 'lib-flexible'
// vant
import {
  Swipe,
  SwipeItem,
  Lazyload,
  NoticeBar,
  Collapse,
  CollapseItem,
  Toast,
  Step,
  Steps,
  Uploader,
  AddressEdit,
  RadioGroup,
  Radio
} from 'vant';

Vue.use(Swipe), Vue.use(SwipeItem), Vue.use(Lazyload),
  Vue.use(NoticeBar), Vue.use(Collapse),
  Vue.use(CollapseItem), Vue.use(Toast), Vue.use(Step),
  Vue.use(Steps), Vue.use(Uploader), Vue.use(AddressEdit), Vue.use(Radio),
  Vue.use(RadioGroup);


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


import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '1psZ4xyaMn41pcE5m2kqZLCStXpNslkh'
})
// api
Vue.prototype.$axios = Axios
Vue.prototype.httpUrl = httpUrl.httpUrl;
Axios.defaults.baseURL = "https://www.scnhjd.com/";
Axios.defaults.headers["Content-type"] = "application/json";


Vue.use(Vuex)

// 导航守卫前置
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  console.log(to, 'to');
  console.log(from, 'from');
  // console.log(next, 'next');
  // 控制banner的走马灯显示
  if (to.meta.iconshow) {
    store.state.isbanshow = false
  } else {
    store.state.isbanshow = true
  }
  // 控制头部swiper
  if (to.meta.isswiper) {
    store.state.isswiper = false;
    console.log(store.state.isswiper, '1');
  } else {
    store.state.isswiper = true;
    console.log(store.state.isswiper, '2');
  }
  // 判断是否登录
  if (to.meta.requireLogin) {
    console.log(1)
    let islogin = store.state.islogin
    if (islogin == false) {
      // confirm("请登录")
      if (confirm("请登录") == true) {
        next("/shoppingmall")
        store.state.logreg = true
        console.log(store.state.logreg);

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
