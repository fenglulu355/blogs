import Vue from 'vue'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const Home = () => import('@/pages/Home')
const Survey = () => import('@/pages/Survey')
const Major = () => import('@/pages/Major')
const Examination = () => import('@/pages/Examination')
const Teaching = () => import('@/pages/Teaching')
const Campus = () => import('@/pages/Campus')
const Charge = () => import('@/pages/Charge')
const Contact = () => import('@/pages/Contact')
const MajorD = () => import('@/pages/MajorD')
const CampusD = () => import('@/pages/CampusD')
const ExaminationD = () => import('@/pages/ExaminationD')



Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/survey',
      name: 'survey',
      component: Survey
    }, {
      path: '/major',
      name: 'major',

      component: Major
    }, {
      path: '/examination',
      name: 'examination',

      component: Examination
    }, {
      path: '/teaching',
      name: 'teaching',

      component: Teaching
    }, {
      path: '/campus',
      name: 'campus',

      component: Campus
    }, {
      path: '/charge',
      name: 'charge',

      component: Charge
    }, {
      path: '/contact',
      name: 'contact',

      component: Contact
    }, {
      path: '/majorD/:id',
      name: 'majorD',

      component: MajorD
    }, {
      path: '/campusD/:id',
      name: 'campusD',

      component: CampusD
    }, {
      path: '/examinationD/:id',
      name: 'examinationD',

      component: ExaminationD
    }
  ]

})
