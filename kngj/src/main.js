// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import httpUrl from "../src/api/url.vue"
import 'lib-flexible'
import Axios from 'axios'
Vue.prototype.$axios = Axios
Vue.prototype.httpUrl = httpUrl.httpUrl;
Axios.defaults.baseURL = "http://kenr.5151fw.com/";
Axios.defaults.headers["Content-type"] = "application/json";
import {
  Swipe,
  SwipeItem
} from 'vant';
import {
  Toast
} from 'vant';

Vue.use(Toast);
Vue.use(Swipe);
Vue.use(SwipeItem);

import {
  Image as VanImage
} from 'vant';

Vue.use(VanImage);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
