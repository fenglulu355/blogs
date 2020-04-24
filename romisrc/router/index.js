import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import curriculum from '../views/curriculum.vue'
import logReg from '../views/logReg.vue'

import search from '../views/search.vue'
import setting from '../views/setting.vue'
import playing from '../views/playing.vue'



Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/curriculum',
    name: 'curriculum',
    component: curriculum
  },
  {
    path: '/logReg',
    name: 'logReg',
    component: logReg
  },

  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/setting',
    name: 'setting',
    component: setting
  },
  {
    path: '/playing',
    name: 'playing',
    component: playing
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router