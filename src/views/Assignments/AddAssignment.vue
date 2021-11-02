<template>
  <div>
      <div >
          <div class="text-2xl">
              <div class="m-10">
                  รายละเอียด
              <textarea v-model="detail" placeholder="รายละเอียด" class="bg-gray-100 " rows="4" cols="50"> </textarea>
              </div> 
              เวลา
              <input type="time" v-model="time" placeholder="รายละเอียด" class="bg-gray-100 mt-10 mr-10"> 
                <select name="" id="" v-model="nameAndIDRedBox" class="mr-16" >
                    <option disabled value="" >Select RedBox</option>
                    <option v-for="(box , index) in allRedBox" :key="index">
                        {{box.id}} : {{box.name}}
                    </option>
                </select>
                <select name="" id=""  v-model="nameAndIDPatrol">
                    <option disabled value="">Select Police</option>
                    <option v-for="(police , index) in allPolice" :key="index" >
                        {{police.id}} : {{police.firstname}} {{police.lastname}}
                    </option>
                </select>
            <button class="ml-3" @click="addAssign(nameAndIDPatrol , nameAndIDRedBox , detail , time ,commanderCurrent.user.id)"> ยืนยัน</button>
          </div>
          
      </div>
      
  </div>
</template>

<script>
import RedBoxesService from '../../services/RedBox'
import PoliceService from '../../services/Police'
import AssignmentService from '../../services/Assignment'
import AuthService from '../../services/AuthService'
import AuthUser from '../../store/AuthUser'
export default {
    data(){
        return{
            allPolice: "" ,
            allRedBox: "" ,
            nameAndIDPatrol:"" ,
            nameAndIDRedBox: "" ,
            commanderCurrent: "" ,  
            detail: "" ,
            time: "" ,

        }
    },
    methods :{
        async fetchAllRedBox(){
          let res = await RedBoxesService.getAllRedBoxes();
           console.log(res);
          this.allRedBox = res.redBoxes
          // console.log(this.allRedBoxes);
        },

        async fetchAllPolice(){
          let res = await PoliceService.getAllPolice();
           console.log(res);
          this.allPolice = res.police
          console.log("police"  ,this.allPolice);
        },
        addAssign(nameAndIDPatrol , nameAndIDRedBox , detail , time ,commanderCurrentId){
            // console.log("is name Patrol" ,nameAndIDPatrol);
            // console.log("is id Patrol" ,(nameAndIDPatrol[0] + nameAndIDPatrol[1]).trim());
            // console.log("is name RedBox" ,nameAndIDRedBox);
            // console.log("is id RedBox" ,nameAndIDRedBox[0]);
            // console.log("is id detail" ,detail);
            // console.log("is id time" ,time);
            // console.log("is id commenderid" ,commanderCurrentId);
            swal({
				title: "เพิ่มงาน",
				text: "ท่านจะเพิ่มงานนี้ใช่ไหม",
				icon: "warning",
				dangerMode: true,
				buttons: true,
			}).then(async (willDelete) => {
				if (willDelete) {
					let res = await AssignmentService.addAssignment(nameAndIDPatrol , nameAndIDRedBox , detail , time ,commanderCurrentId);
					if (res.success) {
						swal("เพิ่มงานสำเร็จ", {
							icon: "success",
						});
                        this.$router.push("/")
						
					} else {
						this.$swal("Cannot Remove Comment.", "error");
					}
				}
			});
        
        },

        getCurrentUser() {
			this.commanderCurrent = AuthUser.getters.getCurrentUser;
            console.log("this commander" , this.commanderCurrent);
	    },
        isAuthen(){
            return AuthUser.getters.isAuthen;
        }
    },
    created(){
        
        this.getCurrentUser();
        if (this.isAuthen() === false) {
			this.$swal(
				"You are not logged in.",
				"Please login and go to this page again",
				"error"
			);
			this.$router.push("/login");
		}
        this.fetchAllPolice();
        this.fetchAllRedBox();
        

        // console.log(process.env.VUE_APP_VARIABLE);
        // console.log(process.env.VUE_APP_SHOP_ENDPOINT);
    },
    


}
</script>

<style>

</style>