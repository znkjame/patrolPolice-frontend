<template>
  <div class="grid justify-items-center mt-10">
    <div>
      <h1>รายละเอียดของงานที่ {{ selectedAssignment.id }}</h1>
    </div>
    <div>
      <h4>รายละเอียดของงาน : {{ selectedAssignment.detail }}</h4>
    </div>
    <div>
      <h4>เวลาที่ต้องไปทำการตรวจ : {{ selectedAssignment.time }}</h4>
    </div>
    <div>
      <h4>สถานะปัจจุบันของงาน : {{ selectedAssignment.status }}</h4>
    </div>
    <div>
      <h4>ถูกมอบหมายโดย : {{ selectedAssignment.commander.rank }} {{ selectedAssignment.commander.firstname }}
        {{ selectedAssignment.commander.lastname }}
      </h4>
    </div>
    <div>
      <h4>ถูกมอบหมายเมื่อ : {{ selectedAssignment.created_at | moment("DD/MM/YYYY HH:mm:ss")}}</h4>
    </div>
      <map-loader
      :RedBoxes="AllredBox"
      :Assignment="this.selectedAssignment"></map-loader>
  </div>
</template>

<script>
import MapLoader from '../../components/Maps/MapLoader.vue'
import AssignmentSevices from '../../services/Assignment'
export default {
    components: {
        MapLoader
  },
  data(){
    return {
      selectedAssignment:"",
      assignment_Id:0,
      redBox:{
        id:"",
        name:"",
        position: {lat:0,lng:0},
        created_at:"",
        updated_at:""
      },
      AllredBox :[]
    }
  },
  methods:{
    async getAssignmentDetail(){
      let res = await AssignmentSevices.getAssignment(this.assignment_Id);
      // console.log(res);
      this.selectedAssignment = res.assignments;
        // console.log(this.selectedAssignment);
    },
    getDataFromProp(){
      this.assignment_Id = this.$route.params.id;
    },
    setRedBoxArray(){
      this.redBox.id = this.selectedAssignment.red_box.id;
      this.redBox.name = this.selectedAssignment.red_box.name;
      this.redBox.position.lat = this.selectedAssignment.red_box.latitude;
      this.redBox.position.lng = this.selectedAssignment.red_box.longitude;
      this.redBox.created_at = this.selectedAssignment.red_box.created_at;
      this.redBox.updated_at = this.selectedAssignment.red_box.updated_at;
      // console.log(this.redBox);
      this.AllredBox.push(this.redBox);
      // console.log(this.AllredBox);
    }
  },
  async created(){
    this.getDataFromProp();
    await this.getAssignmentDetail();
    // console.log(this.$route.params.id);
    this.setRedBoxArray();
    console.log(this.selectedAssignment);
  }
}
</script>

<style>


</style>