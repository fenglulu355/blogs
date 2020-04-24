// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import Axios from 'axios'
import httpUrl from "../src/api/url.vue"
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import VueTouch from 'vue-touch'
Vue.use(VueTouch, {
  name: 'v-touch'
})

Vue.config.productionTip = false


Vue.prototype.$axios = Axios
Vue.prototype.httpUrl = httpUrl;
// Axios.defaults.baseURL = "http://www.cdswcmy.com/";
Axios.defaults.baseURL = "http://als.public.5151fw.com/";
Axios.defaults.headers["Content-type"] = "application/json";


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
