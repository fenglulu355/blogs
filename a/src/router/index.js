import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home.vue'
import about from '../pages/about.vue'
import appreciation from '../pages/appreciation.vue'
import business from '../pages/business.vue'
import contact from '../pages/contact.vue'
import evaluate from '../pages/evaluate.vue'
import cases from '../pages/cases.vue'
import detail from '../pages/casedetail.vue'
import cs from '../pages/cs.vue'
import evadetails from '../pages/evadetail.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/evadetails',
      name: 'evadetails',
      component: evadetails
    },  {
      path: '/cs',
      name: 'cs',
      component: cs
    }, {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/cases',
      name: 'cases',
      component: cases
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: evaluate
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    },
    {
      path: '/business',
      name: 'business',
      component: business
    },
    {
      path: '/appreciation',
      name: 'appreciation',
      component: appreciation
    },
    {
      path: '/about',
      name: 'about',
      component: about
    }
  ]
})
