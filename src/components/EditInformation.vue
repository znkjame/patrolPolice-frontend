<template>
  <div>
    <h2 class="text-4xl mt-5 font-bold">แก้ไขข้อมูล</h2>
    <div>
      <form @submit.prevent="edit"
      class="mt-5">
        <div>
          <label>ตำแหน่ง :</label>
          <!-- <input class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200" 
          type="text" v-model="form.rank"> -->
          <select 
          class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
          v-model="form.rank">
  				  <option disabled value="">Select your rank</option>
  				  <option>General</option>
  				  <option>Lieutenant General</option>
  				  <option>Major General</option>
				    <option>Colonel</option>
				    <option>Lieutenant Colonel</option>
				    <option>Major</option>
				    <option>Captain</option>
				    <option>Lieutenant</option>
				    <option>Sub-Lieutenant</option>
				    <option>Senior Sergeant Major</option>
				    <option>Sergeant Major</option>
				    <option>Sergeant</option>
				    <option>Corporal</option>
				    <option>Lance Corporal</option>

			    </select>
        </div>
        <div>
          <label>ชื่อ :</label>
          <input class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200" 
          type="text" v-model="form.firstname">
        </div>
        <div>
          <label>นามสกุล :</label>
          <input class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200" 
          type="text" v-model="form.lastname">
        </div>
        <div>
          <label>รหัสประจำตัว :</label>
          <input class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
          type="text" v-model="form.phone">
        </div>
      </form>
      <div class="mt-10 ">
          <button @click="edit()" 
          class="p-2 pl-5 pr-5 bg-transparent border-2 border-green-500 text-green-500 rounded-lg 
          hover:bg-green-500 hover:text-gray-100 focus:border-4 focus:border-green-300"
          >แก้ไข
          </button>
      </div>
    </div>
  </div>
</template>

<script>
import AuthUser from '../store/AuthUser'
import AuthService from '../services/AuthService'
export default {
  data() {
    return {
      form : {
        rank:"",
        firstname:"",
        lastname:"",
        rank:"",
      },
      currentUser:"",
      policeInfo:""
    }
  },

  methods : {
    async fetchCurrentUser() {
			this.currentUser = JSON.parse(
				JSON.stringify(AuthUser.getters.getCurrentUser)
			);
			console.log("CurrentUserInEdit", this.currentUser);
      console.log("ThisisIDInEdit", this.currentUser.user.id);
    },

    async fetchUser(){
      let res = await AuthService.fetchUser(this.currentUser.user.id);
      console.log("ThisisPoliceInfoInEdit",res)
      this.policeInfo = res;
      this.form.rank = this.policeInfo.rank
      this.form.firstname = this.policeInfo.firstname
      this.form.lastname = this.policeInfo.lastname
      this.form.phone = this.policeInfo.phone
    },

    async edit() {
			if (
				this.form.rank !== "" &&
				this.form.firstname !== "" &&
				this.form.lastname !== "" &&
        this.form.phone !== ""
			) {
        console.log("ThisisIDEIEI",this.currentUser.user.id)
				let res = await AuthService.editInformation(
					this.form,
					this.currentUser.user.id
				);
				this.$swal("Edit Success", " ", "success");
				this.$router.push("/user-information");
			} else {
				this.$swal("Edit Failed", "Fill up this form!", "error");
			}
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
