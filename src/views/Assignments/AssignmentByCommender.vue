<template>
    <div class="grid justify-items-center ">
        <div class=" text-3xl font-semibold m-4">
          Assignment
        </div>   
        <table>
            <thead class="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th></th>
                <th class="px-4 py-3">
                    Detail
                </th>
                <th class="px-4 py-3">
                    Assigned to
                </th >
                <th class="px-4 py-3">
                    RedBox
                </th>
                <th class="px-4 py-3">
                    Status
                </th>
                <th class="px-4 py-3">
                    Created At
                </th>
            </thead>
            <tbody >
                <tr v-for="(assignment,index) in allAssignments" :key="index" >
                    <td class="px-4 py-3 text-ms font-semibold border">{{ index+1 }}</td>
                    <!-- <td> <router-link :to="{name :'AssignmentDetail', params:{id: assignment.id}}">{{ assignment.detail }}</router-link></td> -->
                    <td class="px-4 py-3 text-ms font-semibold
                  border text-black hover:bg-green-500 hover:text-white focus:border-4 focus:border-green-300 p-2" > <router-link :to="{name :'AssignmentByCommenderID', params:{id: assignment.id}}">{{ assignment.detail }}</router-link></td>
                    <td class="px-4 py-3 text-ms font-semibold border ">{{ assignment.patrol_name }}</td>
                    <td class="px-4 py-3 text-ms font-semibold border">{{ assignment.red_box_name }}</td>
                    <td class="px-4 py-3 text-ms font-semibold border">{{ assignment.status }}</td>
                    <td class="px-4 py-3 text-ms font-semibold border">{{ assignment.created_at | moment("DD/MM/YYYY HH:mm:ss")}}</td>
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