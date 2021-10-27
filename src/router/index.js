import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AssignmentDetail from '../views/Assignments/AssignmentDetail.vue'
import AssignmentByCommender from '../views/Assignments/AssignmentByCommender.vue'
import AddNewRedBox from '../views/Redboxes/AddNewRedBox.vue'
import AllRedBox from '../views/Redboxes/AllRedBox.vue'
import AllAssignment from '../views/Assignments/AllAssignment.vue'
import Login from '../views/User/Login.vue'
import Register from '../views/User/Register.vue'
import Logout from '../views/User/Logout.vue'
import Reports from '../views/Reports/Reports.vue'
import MakeNewReport from '../views/Reports/MakeNewReport.vue'
import AddAssignment from '../views/Assignments/AddAssignment.vue'

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
		path: "/login",
		name: "Login",
		component: Login,
	},

	{
		path: "/logout",
		name: "Logout",
		component: Logout,
	},

	{
		path: "/register",
		name: "Register",
		component: Register,
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
  {
    path: '/reports',
    name: 'AllReport',
    component: Reports
  },
  {
    path: '/reports/make/:assignment_id/:red_box_id',
    name: 'MakeNewReport',
    component: MakeNewReport
  },

  {
    path: '/assignments/admin/add',
    name: 'AddAssignment',
    component: AddAssignment
  },

  {
    path: '/assignments/admin/allassignment',
    name: 'AssignmentByCommender',
    component: AssignmentByCommender
  },

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
