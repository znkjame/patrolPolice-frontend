<template>
    <div class="grid justify-items-center mt-10">
        <div>
            <h5 class="text-5xl">การสร้างรายงาน</h5>
        </div>
        <div class="m-5">
            <div class="">
                <label for="">ประเภทของรายงาน :</label>
                <select class="m-3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200" name="" id="" v-model="reportType">
                    <option value="">กรุณาเลือกประเภท</option>
                    <option value="Redbox">ตามตู้แดง</option>
                    <option value="Assignment">ตามงานที่ถูกมอบหมาย</option>
                </select>
            </div>
            <div class="m-3">
                <label for="">เดือนปีที่ต้องการ :</label>
                <input type="month" v-model="selectedMonth" class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200">
            </div>
            <div>
                <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-gray-100 focus:border-4 focus:border-green-300" @click="showTable()">Submit</button>
                <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-gray-100 focus:border-4 focus:border-red-300" @click="reset()">Reset</button>
            </div>
        </div>
        <redbox-report-table v-if="this.isRedBox"
        :RedBoxes="this.filterRedBox"
        :SelectedMonth="this.selectedMonth"
        :Created_at="this.reports_created_at"></redbox-report-table>
        <assignment-report-table v-if="this.isAssignment"
        :Assignments="this.filterAssignment"
        :SelectedMonth="this.selectedMonth"
        :Created_at="this.reports_created_at"></assignment-report-table>
    </div>
</template>

<script>
import RedboxReportTable from '../../components/Report/RedboxReportTable.vue'
import RedBoxesService from '../../services/RedBox'
import AssignmentSevices from '../../services/Assignment'
import moment from "moment";
import AssignmentReportTable from '../../components/Report/AssignmentReportTable.vue';
export default {
    components: { RedboxReportTable, AssignmentReportTable },
     data(){
        return {
            allRedBoxes:"",
            allAssignment:"",
            reportType:"",
            selectedMonth:"",
            filterRedBox:[],
            filterAssignment:[],
            isAssignment:false,
            isRedBox:false,
            reports_created_at:""
        }
    },
    methods:{
        async fetchAllRedBoxAndAssignment(){
            let res1 = await RedBoxesService.getAllRedBoxes();
            this.allRedBoxes = res1.redBoxes
            let res = await AssignmentSevices.getAllAssignment();
            // console.log(res);
            this.allAssignment = res.assignments
            // console.log(this.allRedBoxes);
        },
        showTable(){
            // console.log(this.selectedMonth);
            // console.log(this.reportType);
            if(this.selectedMonth !== "" && this.reportType !== ""){
                this.isAssignment=false;
                this.isRedBox=false;
                this.reports_created_at = moment();
                // console.log(this.reports_created_at);
                if(this.reportType === "Assignment"){
                    // console.log(this.filterAssignment);
                //     this.filterAssignment = []
                //    this.allAssignment.forEach(element => {
                //        if(moment(element.created_at).format("YYYY-MM") === this.selectedMonth){
                //            this.filterAssignment.push(element);
                //        }
                //    });
                //    this.isAssignment = true;

                    // this.filterAssignment = JSON.parse(JSON.stringify(this.allAssignment))
                    let assignmentFilterd = this.allAssignment.filter((item)=>{
                        // console.log(item);
                        // console.log(moment(item.created_at).format("YYYY-MM"));
                        return moment(item.created_at).format("YYYY-MM") === this.selectedMonth
                    })
                    this.filterAssignment = assignmentFilterd;
                    console.log(this.filterAssignment);
                    this.isAssignment = true;
                }
                else if (this.reportType === "Redbox"){
                    // this.filterRedBox = this.allRedBoxes.slice();
                    this.filterRedBox = JSON.parse(JSON.stringify(this.allRedBoxes));
                    // console.log(this.filterRedBox);
                    // console.log("--------------------------------------------");
                    this.filterRedBox.forEach(element =>{
                        var reportFiltered = element.reports.filter((item) => {
                            return moment(item.created_at).format("YYYY-MM") === this.selectedMonth
                        });
                        element.reports = reportFiltered;
                    })
                    console.log(this.filterRedBox);
                    this.isRedBox = true;
                }
            }
            else{
                    this.$swal(
                        "You are not select Report type or Month and year",
                        "Please select and submit again",
                        "error"
                    );
                }
        },
        reset(){
            this.$router.go()
        }
    },
    async created(){
     await this.fetchAllRedBoxAndAssignment();
    //  console.log(this.allRedBoxes);
  },
//   computed:{
//       filterAssignment(){
//             var filterAssignmentArr = this.allRedBoxes
//             console.log(this.filterAssignmentArr);
//             filterAssignmentArr = filterAssignmentArr.filter((item)=> {
//                 return (item.created_at === this.selectedMonth)
//             })
//             return filterAssignment;
//       }
//   }
}
</script>

<style>

</style>