<template>
    <div>
        <table class="min-w-full border-collapse block md:table">
            <thead class="block md:table-header-group">
                <tr colspan='6' class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th colspan='6' class="text-right text-base bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                        <p>Report id: {{ this.created_at | moment("YYMMDD-HHMMss-SSSS") }} </p> </th>
                </tr>
                <tr>
                    <th colspan='6' class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell text-center">
                        <h2 class="text-3xl">RedBox Report</h2>
                    </th>
                </tr>
                <tr>
                    <th colspan="6" class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell text-center">
                        <h3 class="text-xl">{{ this.selectedMonth | moment("MM/YYYY") }}</h3>
                    </th>
                </tr>
                <tr>
                    <th colspan="6" class="text-right text-base bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                         <p>{{ this.created_at | moment("DD/MM/YYYY (HH:mm:ss)") }}</p>
                    </th>
                </tr>
                <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th class="p-2 md:border md:border-grey-500 text-left block md:table-cell">RedBox ID</th>
                    <th class="p-2 md:border md:border-grey-500 text-left block md:table-cell">RedBoxName</th>
                    <th class="p-2 md:border md:border-grey-500 text-left block md:table-cell">Report ID</th>
                    <th class="p-2 md:border md:border-grey-500 text-left block md:table-cell">Report Note</th>
                    <th class="p-2 md:border md:border-grey-500 text-left block md:table-cell">Report At</th>
                    <th class="p-2 md:border md:border-grey-500 text-left block md:table-cell">Report By</th>
                </tr>
            </thead>
            <tbody class="block md:table-row-group">
                <!-- <tr>
                    <td>RedBox ID</td>
                <td>RedBoxName</td>
                <td>Report ID</td>
                <td>Report Note</td>
                <td>Report At</td>
                <td>Report By</td>
                </tr> -->
                <template v-for="(item,i) in allRedBoxes">
                    <tr :key="i" class="bg-white border border-grey-500 md:border-none block md:table-row">
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">{{ item.id }}</td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">{{ item.name }}</td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell"></td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell"></td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell"></td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell"></td>
                    </tr>
                    <tr v-for="(report,index) in item.reports" :key='index+":"+i' class="bg-white border border-grey-500 md:border-none block md:table-row">
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell"></td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell"></td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">{{ report.id }}</td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">{{ report.note }}</td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">{{ report.created_at | moment("DD-MMM-YYYY HH:mm:ss") }}</td>
                        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">{{ report.assignment.patrol_name }}</td>
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