<template>
  <div>
      <table>
          <thead>
              <th></th>
              <th>
                  Detail
              </th>
              <th>
                  Assigned By
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
          <tbody>
              <tr v-for="(assignment,index) in allAssignments" :key="index">
                  <td>{{ index+1 }}</td>
                  <td> <router-link :to="{name :'AssignmentDetail', params:{id: assignment.id}}">{{ assignment.detail }}</router-link></td>
                  <td> {{ assignment.commander_name }}</td>
                  <td>{{ assignment.red_box_name }}</td>
                  <td>{{ assignment.status }}</td>
                  <td>{{ assignment.created_at }}</td>
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