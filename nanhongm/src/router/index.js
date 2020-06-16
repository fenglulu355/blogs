import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../pages/home.vue')
const About = () => import('../pages/about.vue')
const Cases = () => import('../pages/cases.vue')
const News = () => import('../pages/news.vue')
const Product = () => import('../pages/product.vue')
const Service = () => import('../pages/service.vue')
const Shoppingmall = () => import('../pages/shoppingmall.vue')
const Shoppingcar = () => import('../pages/shoppingcar.vue')
const Order = () => import('../pages/order.vue')
const Orderlist = () => import('../pages/orderlist.vue')
const Shopshow = () => import('../pages/shopshow.vue')
const Detail = () => import('../pages/recruit.vue')
const Details = () => import('../pages/details.vue')
const Mine = () => import('../pages/mine.vue')
const Minecenter = () => import('../pages/mine-center.vue')
const Payment = () => import('../pages/payment.vue')
// const Privacy = () => import('../components/privacy.vue')
// const Policy = () => import('../components/policy.vue')
// const Statemap = () => import('../components/statemap.vue')
const Prodetails = () => import('../pages/details')
const Commoditydetails = () => import('../pages/commoditydetails.vue')
const Searchs = () => import('../pages/searchs.vue')

// import about from '../pages/about.vue'
// import home from '../pages/home.vue'
// import cases from '../pages/cases.vue'
// import news from '../pages/news.vue'
// import product from '../pages/product.vue'
// import service from '../pages/service.vue'
// import shoppingmall from '../pages/shoppingmall.vue'
// import shoppingcar from '../pages/shoppingcar.vue'
// import order from '../pages/order.vue'
// import orderlist from '../pages/orderlist.vue'
// import shopshow from '../pages/shopshow.vue'
// import detail from '../pages/recruit.vue'
// import details from '../pages/details.vue'
// import mine from '../pages/mine.vue'
// import minecenter from '../pages/mine-center.vue'
// import payment from '../pages/payment.vue'
// import commoditydetails from '../pages/commoditydetails .vue'
import cs from '../pages/cs.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/about',
      name: 'about',
      component: About
    }, {
      path: '/prodetails',
      name: 'prodetails',
      component: Prodetails
    }, {
      path: '/searchs',
      name: 'searchs',
      component: Searchs,
      meta: {
       
      }
    }, {
      path: '/payment',
      name: 'payment',
      component: Payment,
      meta: {
        requireLogin: true,
        iconshow: true,
        isswiper: true
      }
    },
    {
      path: '/commoditydetails',
      name: 'commoditydetails',
      component: Commoditydetails,
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
      component: Orderlist,
      meta: {
        requireLogin: true,
        iconshow: true,
        isswiper: true
      }
    },
    {
      path: '/minecenter',
      name: 'minecenter',
      component: Minecenter,
      meta: {
        requireLogin: true,
        iconshow: true,
        isswiper: true
      }
    }, {
      path: '/shoppingcar',
      name: 'shoppingcar',
      component: Shoppingcar,
      meta: {
        requireLogin: true,
        iconshow: true,
        isswiper: true
      }
    }, {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        requireLogin: true,
        iconshow: true,
        isswiper: true
      }
    }, {
      path: '/mine',
      name: 'mine',
      component: Mine,
      meta: {
        requireLogin: true,
        iconshow: true,
        isswiper: true
      }
    }, {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta: {
        isswiper: true
      }
    }, {
      path: '/cases',
      name: 'cases',
      component: Cases
    }, {
      path: '/news',
      name: 'news',
      component: News
    }, {
      path: '/product',
      name: 'product',
      component: Product
    }, {
      path: '/service',
      name: 'service',
      component: Service
    }, {
      path: '/shoppingmall',
      name: 'shoppingmall',
      component: Shoppingmall,
      meta: {
        iconshow: true,
      }
    }, {
      path: '/shopshow',
      name: 'shopshow',
      component: Shopshow
    }
  ]
})
