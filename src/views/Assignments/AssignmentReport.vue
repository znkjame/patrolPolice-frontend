<template>
    <div>
        <div class="m-2">
            <h1>รายละเอียดของงานที่ {{ Assignments.id }}</h1>
        </div >
        <div class="m-2">
            <h4>รายละเอียดของงาน : {{ Assignments.detail }}</h4>
        </div>
        <div class="m-2">
            <h4>เวลาที่ต้องไปทำการตรวจ : {{ Assignments.time }}</h4>
        </div>
        <div class="m-2">
            <h4>สถานะปัจจุบันของงาน : {{ Assignments.status }}</h4>
        </div>
        <div class="m-2">
            <h4>มอบหมายให้ : {{ Assignments.patrol_name}} </h4>
        </div>
        <div>
            <h1 class="text-3xl font-semibold m-4">Report</h1>
        </div>
        <div class="grid  justify-center">
            <table>
            <thead>
                <th></th>
                <th>
                    Detail
                </th>
                <th>
                    Report by
                </th>
                <th>
                    RedBox
                </th>
                
            </thead>
            <tbody >
                <tr v-for="(report,index) in Assignments.reports" :key="index" >
                    <td>{{ index+1 }}</td>
                    <!-- <td> <router-link :to="{name :'AssignmentDetail', params:{id: assignment.id}}">{{ assignment.detail }}</router-link></td> -->
                    <!-- <td class="p-2" > <router-link :to="{name :'AssignmentByCommenderID', params:{id: assignment.id}}">{{ assignment.detail }}</router-link></td> -->
                    <td class="p-3">{{ report.note}}</td>
                    <td class="p-3">{{ report.report_by}}</td>
                    <td class="p-3">{{ report.red_box_id}}</td>
                    
                </tr>
            </tbody>
        </table>
        <div>
            <button class="bg-green-300 p-1 rounded-lg mt-4" @click="update(Success) ">ครบถ้วน</button>
            <button class="bg-red-300 p-1 rounded-lg ml-4" @click="update(Cancel)">ยกเลิก</button>
        </div>
        </div>
        
    </div>
</template>

<script>
import AssignmentSevices from '../../services/Assignment'
import AuthUser from '../../store/AuthUser'
import AuthService from '../../services/AuthService'
export default {
    data() {
        return {
            Assignments:"",
            id : "",
            Success: "SUCCESS",
            Cancel: "CANCEL"
        }
    },
    methods:{
        
        getCurrentUser() {
			this.currentUser = AuthUser.getters.getCurrentUser;
            this.id = this.currentUser.user.id
	    },
    //     async getCommanderWithAssignment(id){
    //       let res = await AssignmentSevices.getAssignmentByCommander(id);
    //     //   console.log("res" ,res);
    //       this.allAssignments = res.assignments
    //     console.log("allAssignments" , this.allAssignments);
    //   },
        getDataFromProp(){
            this.id = this.$route.params.id;
            console.log("" ,this.id);
        },
        async getAssignment(){
            let res = await AssignmentSevices.getAssignment(this.id);
            this.Assignments = res.assignments
            console.log("assign" ,this.Assignments);
        } ,
        async update(status){
            console.log(status);

            if (status === "SUCCESS")
            {
                swal({
				title: "ตรวจสอบ",
				text: "รายงานครบถ้วนหรือไม่",
				icon: "info",
				dangerMode: true,
				buttons: true,
			}).then(async (willDelete) => {
				if (willDelete) {
                    console.log("" ,this.Assignments.id);
					let res = await AssignmentSevices.updateStatus( status , this.Assignments.id);
					if (res.success) {
						swal("ตรวจสอบเสร็จสิ้น", {
							icon: "success",
						});
                        this.$router.push("/assignments/admin/allassignment/")
						
					} else {
						this.$swal("ยกเลิก", "error");
					}
				}
			});
            }
            else
            {
                swal({
				title: "ยกเลิก",
				text: "จะยกเลิกงานนี้หรือไม่",
				icon: "warning",
				dangerMode: true,
				buttons: true,
			}).then(async (willDelete) => {
				if (willDelete) {
                    console.log("" ,this.Assignments.id);
					let res = await AssignmentSevices.updateStatus( status , this.Assignments.id);
					if (res.success) {
						swal("ยกเลิกเสร็จสิ้น", {
							icon: "success",
						});
                        this.$router.push("/assignments/admin/allassignment/")
						
					} else {
						this.$swal("ยกเลิก", "error");
					}
				}
			});
            }
            
        }
    },
    created(){
        this.getCurrentUser();
        this.getDataFromProp()
        this.getAssignment()
        
    },
}
</script>