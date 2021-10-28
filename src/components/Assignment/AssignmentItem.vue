<template>
  <div>
      <table class="w-full mt-10">
          <thead>
              <tr class="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th class="px-4 py-3"></th>
                <th class="px-4 py-3">
                    Detail
                </th>
                <th class="px-4 py-3">
                    Assigned By
                </th>
                <th class="px-4 py-3">
                    RedBox
                </th>
                <th class="px-4 py-3">
                    Status
                </th>
                <th class="px-4 py-3">
                    Created At
                </th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(assignment,index) in allAssignments" :key="index" class="text-gray-500">
                  <td class="px-4 py-3 text-ms font-semibold border">{{ index+1 }}</td>
                  <td 
                  class="px-4 py-3 text-ms font-semibold
                  border text-black hover:bg-green-500 hover:text-white focus:border-4 focus:border-green-300"> 
                  <router-link :to="{name :'AssignmentDetail', params:{id: assignment.id}}">
                      {{ assignment.detail }}</router-link></td>
                  <td class="px-4 py-3 text-ms font-semibold border"> {{ assignment.commander_name }}</td>
                  <td class="px-4 py-3 text-ms font-semibold border">{{ assignment.red_box_name }}</td>
                  <td class="px-4 py-3 text-ms font-semibold border">{{ assignment.status }}</td>
                  <td class="px-4 py-3 text-ms font-semibold border">{{ assignment.created_at | moment("DD-MMM-YYYY HH:mm:ss")}}  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
    props:["assignments"],
    data() {
        return {
            allAssignments:""
        }
    },
    methods:{
        getDataFromProps(){
            this.allAssignments = this.assignments;
        },
        goToAssignmentDetail(item){
            this.$route.push({name:'AssignmentDetail',params:{id : item.id}});
        }
    },
    created(){
        this.getDataFromProps();
    },
    watch:{
    assignments(val, OldVal) {
      // console.log("------------------");
      // console.log(val);
      // console.log(OldVal);
      // console.log("------------------");
      this.getDataFromProps();
    },
  },
}
</script>

<style>

</style>