// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import httpUrl from "../src/api/url.vue"
Vue.config.productionTip = false


import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */ )

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

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
