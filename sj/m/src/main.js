// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'lib-flexible/flexible'
import MintUI from 'mint-ui'
import BaiduMap from 'vue-baidu-map'
import 'mint-ui/lib/style.css'
import VueScroller from 'vue-scroller'
import * as ajax from './requests'
import unit from './unit'
import router from './router'




Vue.prototype.$ajax = ajax
Vue.use(VueScroller)
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(BaiduMap, {
  ak: 'yjyHzxOaM2kgXwpASmbBzTG1DTU7n1Gu' //这个地方是官方提供的ak密钥
})

router.afterEach((to, from, next) => {
  let _that = this
  _that.scrollTop -= 50
  document.getElementsByClassName("app-mine")[0].scrollTop = _that.scrollTop
})
/* eslint-disable no-new */
//  window.addEventListener('popstate', function(e) {
//          history.go(-1)
//  }, false)

new Vue({
  el: '#app',
  unit,
  router,
  components: {
    App
  },
  template: '<App/>'
})
