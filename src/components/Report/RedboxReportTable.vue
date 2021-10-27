<template>
    <div>
        <table>
            <thead>
                <tr colspan='6'>
                    <th colspan='6' class="text-right text-base">
                        <p>Report id: {{ this.created_at | moment("YYMMDD-HHMMss-SSSS") }} </p> </th>
                </tr>
                <tr>
                    <th colspan='6'>
                        <h2 class="text-3xl">RedBox Report</h2>
                    </th>
                </tr>
                <tr>
                    <th colspan="6">
                        <h3 class="text-xl">{{ this.selectedMonth | moment("MM/YYYY") }}</h3>
                    </th>
                </tr>
                <tr>
                    <th colspan="6" class="text-right text-base">
                         <p>{{ this.created_at | moment("DD/MM/YYYY (HH:mm:ss)") }}</p>
                    </th>
                </tr>
                <tr>
                    <th>RedBox ID</th>
                    <th>RedBoxName</th>
                    <th>Report ID</th>
                    <th>Report Note</th>
                    <th>Report At</th>
                    <th>Report By</th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr>
                    <td>RedBox ID</td>
                <td>RedBoxName</td>
                <td>Report ID</td>
                <td>Report Note</td>
                <td>Report At</td>
                <td>Report By</td>
                </tr> -->
                <template v-for="(item,i) in allRedBoxes">
                    <tr :key="i">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                    </tr>
                    <tr v-for="(report,index) in item.reports" :key='index+":"+i'>
                        <td></td>
                        <td></td>
                        <td>{{ report.id }}</td>
                        <td>{{ report.note }}</td>
                        <td>{{ report.created_at | moment("DD-MMM-YYYY HH:ss") }}</td>
                        <td>{{ report.assignment.patrol_name }}</td>
                    </tr>
                </template>
                
            </tbody>
        </table>
  </div>
</template>

<script>
import RedBoxesService from '../../services/RedBox'
import AssignmentSevices from '../../services/Assignment'
export default {
    props: ["RedBoxes","SelectedMonth","Created_at"],
    data(){
        return {
            allRedBoxes:"",
            selectedMonth:"",
            created_at:""
        }
    },
    watch:{
        RedBoxes(val, OldVal) {
        // console.log("------------------");
        // console.log(val);
        // console.log(OldVal);
        // console.log("------------------");
        this.fetchAllRedBox();
        },
    },
    methods:{
        async fetchAllRedBox(){
            // let res = await RedBoxesService.getAllRedBoxes();
            // let res = await AssignmentSevices.getAllAssignment();
            // console.log(res);
            this.allRedBoxes = this.RedBoxes
            this.selectedMonth = this.SelectedMonth
            this.created_at = this.Created_at
            // this.allRedBoxes = res.assignments
            // console.log(this.allRedBoxes);
        }
    },
    async created(){
     await this.fetchAllRedBox();
     console.log(this.allRedBoxes);
  }
}
</script>

<style>

</style>