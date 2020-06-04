import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home.vue'
import morecur from '../components/morecur/mcindex.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/morecur',
      name: 'morecur',
      component: morecur
    },
  ]
})
