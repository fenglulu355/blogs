import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home.vue'
import about from '../pages/about.vue'
import product from '../pages/product.vue'
import productlist from '../pages/productlist.vue'
import prodetail from '../pages/prodetaile.vue'
import active from '../pages/active.vue'
import videos from '../pages/videos.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/about',
      name: 'about',
      component: about,
    },
    {
      path: '/product',
      name: 'product',
      component: product,
    },
    {
      path: '/productlist',
      name: 'productlist',
      component: productlist,
    },
    {
      path: '/prodetail',
      name: 'prodetail',
      component: prodetail,
    },
    {
      path: '/active',
      name: 'active',
      component: active,
    },
    {
      path: '/videos',
      name: 'videos',
      component: videos,
    }
  ]
})
