<template>
  <div class="grid justify-items-center mt-10">
    <div>
      <h5 class="text-5xl">รายการงานที่ถูกมอบหมาย</h5>
    </div>
      <assignment-item
      :assignments="allAssignment">
      </assignment-item>
  </div>
</template>

<script>
import AssignmentItem from '../../components/Assignment/AssignmentItem.vue'
import AssignmentSevices from '../../services/Assignment'
import AuthUser from '../../store/AuthUser'
import AuthService from '../../services/AuthService'
export default {
  components: { AssignmentItem },
  data(){
      return {
          currentUser:"",
          allAssignment:"",
          currentUserWithAssignment:""
      }
  },
  methods:{
      async getAllAssignment(){
        //   let res = await AssignmentSevices.getAllAssignment();
          this.allAssignment = this.currentUserWithAssignment.police.assigned_assignments;
          console.log(this.allAssignment);
      },
      async getCurrentUserWithAssignment(){
          let res = await AuthService.fetchMe();
          console.log(res);
          this.currentUserWithAssignment = res
          console.log(this.currentUserWithAssignment);
      },
      getCurrentUser() {
			this.currentUser = AuthUser.getters.getCurrentUser;
	    },
        isAuthen(){
            return AuthUser.getters.isAuthen;
        }
  },
  async created(){
      console.log("...");
      this.getCurrentUser();
      console.log("...");
      if (this.isAuthen() === false) {
			this.$swal(
				"You are not logged in.",
				"Please login and go to this page again",
				"error"
			);
			this.$router.push("/login");
		}
      await this.getCurrentUserWithAssignment();
      await this.getAllAssignment();
    //   console.log(this.currentUserWithAssignment);
  }
}
</script>

<style>

</style>