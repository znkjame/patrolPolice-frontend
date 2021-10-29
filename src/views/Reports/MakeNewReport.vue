<template>
  <div>
        <label for="note">หมายเหตุ :</label>
        <input
        class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
        type="text" placeholder="หมายเหตุ" v-model="reportForm.note">
        <div class="p-1">
            <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-gray-100 focus:border-4 focus:border-green-300" 
            @click="addReport()">Submit</button>
        </div>
  </div>
</template>

<script>
import ReportService from '../../services/Report'
import AssignmentService from '../../services/Assignment'
export default {
    data(){
        return {
            reportForm :{
                note:"",
                assignment_id:"",
                red_box_id:""
            }
        }
    },
    methods: {
        async addReport() { 
          this.reportForm.assignment_id = this.$route.params.assignment_id;
          this.reportForm.red_box_id = this.$route.params.red_box_id;
          console.log(this.reportForm)
          if (this.reportForm.note !== "")
          {
                this.$swal(
				    "Reported Success",
					`${this.reportForm.note}`,
					"success"
				);
                let res = await ReportService.addReport(this.reportForm)
                let res2 = await AssignmentService.updateStatus("Reported",this.reportForm.assignment_id)
                this.$router.push("/assignments")
          }
          else{
              this.$swal("Reported Failed","Please fill up the note" ,"error");
          }
          
        },
    },

}
</script>

<style>

</style>