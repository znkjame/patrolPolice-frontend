<template>
    <div class="grid justify-items-center ">
        <div class="mb-4 text-2xl">
          Assignment
        </div>   
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
                    <td class="p-2">{{assignment.detail}}</td>
                    <td class="p-2">{{ assignment.patrol_name }}</td>
                    <td class="p-2">{{ assignment.red_box_name }}</td>
                    <td class="p-2">{{ assignment.status }}</td>
                    <td class="p-2">{{ assignment.created_at }}</td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>

import AssignmentSevices from '../../services/Assignment'
import AuthUser from '../../store/AuthUser'
import AuthService from '../../services/AuthService'
export default {
    // props:["assignments"],
    data() {
        return {
            allAssignments:"",
            id: "" ,
            currentUser:"",
        }
    },
    methods:{
        
         getCurrentUser() {
			this.currentUser = AuthUser.getters.getCurrentUser;
            this.id = this.currentUser.user.id
	    },
        async getCommanderWithAssignment(id){
          let res = await AssignmentSevices.getAssignmentByCommander(id);
        //   console.log("res" ,res);
          this.allAssignments = res.assignments
        console.log("allAssignments" , this.allAssignments);
      },
    },
    created(){
        this.getCurrentUser();
        this.getCommanderWithAssignment(this.id)
        
    },
//     watch:{
//     assignments(val, OldVal) {
//       // console.log("------------------");
//       // console.log(val);
//       // console.log(OldVal);
//       // console.log("------------------");
//       this.getDataFromProps();
//     },
//   },
}
</script>