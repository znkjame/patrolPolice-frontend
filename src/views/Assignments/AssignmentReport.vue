<template>
    <div>
        <div>
            <h1>รายละเอียดของงานที่ {{ Assignments.id }}</h1>
        </div>
            <div>
            <h4>รายละเอียดของงาน : {{ Assignments.detail }}</h4>
        </div>
        <div>
            <h4>เวลาที่ต้องไปทำการตรวจ : {{ Assignments.time }}</h4>
        </div>
        <div>
            <h4>สถานะปัจจุบันของงาน : {{ Assignments.status }}</h4>
        </div>
        <div>
            <h4>ถูกมอบหมายโดย : {{ Assignments.commander.rank }} {{ Assignments.commander.firstname }}
                {{ Assignments.commander.lastname }}
            </h4>
        </div>
        <div>
            <h1 class="text-3xl font-semibold m-4">Report</h1>
        </div>
        <div class="grid justify-item-center">
            <table>
            <thead>
                <th></th>
                <th>
                    Detail
                </th>
                <th>
                    Assigned to
                </th>
                <th>
                    RedBox
                </th>
                <th>
                    Status
                </th>
                <th>
                    Created At
                </th>
            </thead>
            <tbody >
                <tr v-for="(assignment,index) in allAssignments" :key="index" >
                    <td>{{ index+1 }}</td>
                    <!-- <td> <router-link :to="{name :'AssignmentDetail', params:{id: assignment.id}}">{{ assignment.detail }}</router-link></td> -->
                    <td class="p-2" > <router-link :to="{name :'AssignmentByCommenderID', params:{id: assignment.id}}">{{ assignment.detail }}</router-link></td>
                    <td class="p-2">{{ assignment.patrol_name }}</td>
                    <td class="p-2">{{ assignment.red_box_name }}</td>
                    <td class="p-2">{{ assignment.status }}</td>
                    <td class="p-2">{{ assignment.created_at }}</td>
                </tr>
            </tbody>
        </table>
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
        }
    },
    created(){
        this.getCurrentUser();
        this.getDataFromProp()
        this.getAssignment()
        
    },
}
</script>