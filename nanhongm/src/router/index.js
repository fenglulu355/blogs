import Vue from 'vue'
import Router from 'vue-router'
import about from '../pages/about.vue'
import home from '../pages/home.vue'
import cases from '../pages/cases.vue'
import news from '../pages/news.vue'
import product from '../pages/product.vue'
import service from '../pages/service.vue'
import shoppingmall from '../pages/shoppingmall.vue'
import shoppingcar from '../pages/shoppingcar.vue'
import order from '../pages/order.vue'
import orderlist from '../pages/orderlist.vue'
import shopshow from '../pages/shopshow.vue'
import detail from '../pages/recruit.vue'
import details from '../pages/details.vue'
import mine from '../pages/mine.vue'
import minecenter from '../pages/mine-center.vue'
import payment from '../pages/payment.vue'

import commoditydetails from '../pages/commoditydetails .vue'
import cs from '../pages/cs.vue'
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
      path: '/payment',
      name: 'payment',
      component: payment,
      meta: {
        requireLogin: true,
        iconshow: true,
        isswiper: true
      }
    },
    {
      path: '/commoditydetails',
      name: 'commoditydetails',
      component: commoditydetails,
      meta: {
        requireLogin: true,
        iconshow: true,
        isswiper: true
      }
    }, {
      path: '/cs',
      name: 'cs',
      component: cs
    },

    {
      path: '/orderlist',
      name: 'orderlist',
      component: orderlist,
      meta: {
        requireLogin: true,
        iconshow: true,
        isswiper: true
      }
    },
    {
      path: '/minecenter',
      name: 'minecenter',
      component: minecenter,
      meta: {
        requireLogin: true,
        iconshow: true,
        isswiper: true
      }
    }, {
      path: '/shoppingcar',
      name: 'shoppingcar',
      component: shoppingcar,
      meta: {
        requireLogin: true,
        iconshow: true,
        isswiper: true
      }
    }, {
      path: '/details',
      name: 'details',
      component: details
    }, {
      path: '/order',
      name: 'order',
      component: order,
      meta: {
        requireLogin: true,
        iconshow: true,
        isswiper: true
      }
    }, {
      path: '/mine',
      name: 'mine',
      component: mine,
      meta: {
        requireLogin: true,
        iconshow: true,
        isswiper: true
      }
    }, {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {
        isswiper: true
      }
    }, {
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
      component: shoppingmall,
      meta: {
        iconshow: true,
      }
    }, {
      path: '/shopshow',
      name: 'shopshow',
      component: shopshow
    }
  ]
})
