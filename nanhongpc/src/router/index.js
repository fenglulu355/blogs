import Vue from 'vue'
import Router from 'vue-router'
import about from '../pages/about.vue'
import home from '../pages/home.vue'
import cases from '../pages/cases.vue'
import news from '../pages/news.vue'
import product from '../pages/product.vue'
import service from '../pages/service.vue'
import shoppingmall from '../pages/shoppingCar.vue'
import shopshow from '../pages/shopshow.vue'
import detail from '../pages/recruit.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home
  }, {
    path: '/about',
    name: 'about',
    component: about
  }, {
    path: '/detail',
    name: 'detail',
    component: detail
  },
  , {
    path: '/cases',
    name: 'cases',
    component: cases
  }, {
    path: '/news',
    name: 'news',
    component: news
  }, {
    path: '/product',
    name: 'product',
    component: product
  }, {
    path: '/service',
    name: 'service',
    component: service
  }, {
    path: '/shoppingmall',
    name: 'shoppingmall',
    component: shoppingmall
  }, {
    path: '/shopshow',
    name: 'shopshow',
    component: shopshow
  }]
})
