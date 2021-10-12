import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AssignmentDetail from '../views/Assignments/AssignmentDetail.vue'
import AddNewRedBox from '../views/Redboxes/AddNewRedBox.vue'
import AllRedBox from '../views/Redboxes/AllRedBox.vue'
import AllAssignment from '../views/Assignments/AllAssignment.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/assignments/:id',
    name: 'AssignmentDetail',
    component: AssignmentDetail
  },
  {
    path: '/redboxes/add',
    name: 'AddNewRedBox',
    component: AddNewRedBox
  },
  {
    path: '/redboxes',
    name: 'AllRedBox',
    component: AllRedBox
  },  
  {
    path: '/assignments',
    name: 'AllAssignment',
    component: AllAssignment
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
