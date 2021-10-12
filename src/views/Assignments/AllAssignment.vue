<template>
  <div>
      <assignment-item
      :assignments="allAssignment">
      </assignment-item>
  </div>
</template>

<script>
import AssignmentItem from '../../components/Assignment/AssignmentItem.vue'
import AssignmentSevices from '../../services/Assignment'
export default {
  components: { AssignmentItem },
  data(){
      return {
          currentUser:"",
          allAssignment:""
      }
  },
  methods:{
      async getAllAssignment(){
          let res = await AssignmentSevices.getAllAssignment();
          this.allAssignment = res.assignments;
          console.log(this.allAssignment);
      },
      getCurrentUserWithAssignment(){

      }
  },
  created(){
      this.getAllAssignment();
  }
}
</script>

<style>

</style>