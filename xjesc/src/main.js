// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.$axios = Axios
// Vue.prototype.httpUrl = 'http://www.xjxesc.com/';
// Axios.defaults.baseURL = "http://www.xjxesc.com/";
Axios.defaults.headers["Content-type"] = "application/json";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
