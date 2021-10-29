<template>
  <nav class="flex items-center justify-between flex-wrap bg-green-600 p-6" >
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <!-- <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg> -->
    <router-link to="/" class="font-semibold text-xl tracking-tight">PatrolPolice</router-link>
  </div>
  <div class="block lg:hidden">
    <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <router-link to="/assignments" v-if="!isAdmin()" class="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4 text-lg flex-1 flex justify-center mr-auto">
        Assignment
      </router-link>
      <router-link to="/assignments/admin/allassignment" v-if="isAdmin()" class="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4 text-lg">
        Assignment
      </router-link>
      <router-link to="/assignments/admin/add" v-if="isAdmin()" class="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4 text-lg">
        Add Assignment
      </router-link>
      <router-link to="/redboxes" v-if="isAdmin()" class="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4 text-lg">
        RedBox List
      </router-link>
      <router-link to="/redboxes/add" v-if="isAdmin()" class="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white text-lg">
        Add RedBox
      </router-link>
      <router-link to="/reports" v-if="isAdmin()" class="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4 text-lg ml-4" >
        Make Reports
      </router-link>
    </div>
    <div class="space-x-2 ">
      <router-link v-if="isAuthen()" to="/user-information"
      class="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4 text-lg flex-1 flex justify-center mr-auto" >{{ this.policeInfo.rank}} {{ this.policeInfo.firstname}} {{this.policeInfo.lastname}} </router-link>
      <router-link v-if="!isAuthen()" to="/login" 
      class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent 
      hover:text-green-600 hover:bg-white mt-4 lg:mt-0">Login</router-link>
      <router-link  v-if="!isAuthen()" to="/register" 
      class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent 
      hover:text-green-600 hover:bg-white mt-4 lg:mt-0">Register</router-link>
      <router-link v-if="isAuthen()" to="/logout" 
      class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent 
      hover:text-green-600 hover:bg-white mt-4 lg:mt-0">Logout</router-link>
    </div>
  </div>
</nav>
</template>

<script>
import AuthUser from '../store/AuthUser'
import AuthService from '../services/AuthService'
export default {
  data() {
    return {
      currentUser:"",
      policeInfo:""
    }
  },
  methods : {
    async fetchCurrentUser() {
			this.currentUser = JSON.parse(
				JSON.stringify(AuthUser.getters.getCurrentUser)
			);
			console.log("CurrentUser", this.currentUser);
      console.log("ThisisID", this.currentUser.user.id);
		},
    
    async fetchUser(){
      let res = await AuthService.fetchUser(this.currentUser.user.id);
      console.log("ThisisPoliceInfo",res)
      this.policeInfo = res;
    },

    isAuthen() {
      return AuthUser.getters.isAuthen;
    },
    isAdmin(){
      return AuthUser.getters.isAdmin;
    },
  },
  created() {
		this.fetchCurrentUser();
    this.fetchUser();

	},
}
</script>

<style>

</style>