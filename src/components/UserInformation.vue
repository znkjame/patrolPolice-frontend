<template>
    <div class="mt-10">
        <button
			@click="goToEdit()"
				class="
					p-3
					text-2xl
					absolute
					right-24
					cursor-pointer
					bg-white
					text-gray-800
                    border-2 border-gray-500
                    rounded-lg hover:bg-gray-500 
                    hover:text-gray-100 focus:border-4 focus:border-gray-300
					transition
					duration-250
					"
				>
				<font-awesome-icon :icon="['fas', 'edit']" />
				    แก้ไขข้อมูล
			</button>
        <div class="mt-3">
            <label>ตำแหน่ง : 
            {{ this.policeInfo.rank}}
            </label>
        </div>
        <div  class="mt-3">
            <label>ชื่อ : 
            {{ this.policeInfo.firstname}}
            </label>
        </div>
        <div  class="mt-3">
            <label>นามสกุล : 
            {{ this.policeInfo.lastname}}
            </label>
        </div>

        <div  class="mt-3">
            <label>อีเมล :
            {{ this.currentUser.user.email}}
            </label>
        </div>
        <div  class="mt-3">
            <label>รหัสประจำตัว :
            {{ this.policeInfo.phone}}
            </label>
        </div>
    </div>
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

    goToEdit() {
			this.$router.push("/edit-information");
	},
  },
  created() {
		this.fetchCurrentUser();
        this.fetchUser();
	},
}
</script>