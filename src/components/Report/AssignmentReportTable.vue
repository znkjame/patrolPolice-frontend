<template>
    <div>
        <table>
            <thead>
                <tr colspan='9'>
                    <th colspan='9' class="text-right text-base">
                        <p>Report id: {{ this.created_at | moment("YYMMDD-HHMMss-SSSS") }} </p> </th>
                </tr>
                <tr>
                    <th colspan='9'>
                        <h2 class="text-3xl">Assignment Report</h2>
                    </th>
                </tr>
                <tr>
                    <th colspan="9">
                        <h3 class="text-xl">{{ this.selectedMonth | moment("MM/YYYY") }}</h3>
                    </th>
                </tr>
                <tr>
                    <th colspan="9" class="text-right text-base">
                         <p>{{ this.created_at | moment("DD/MM/YYYY (HH:ss)") }}</p>
                    </th>
                </tr>
                <tr>
                <th>Assignment ID</th>
                <th>Assignment Name</th>
                <th>Assigned to</th>
                <th>RedBoxName</th>
                <th>Time</th>
                <th>Report ID</th>
                <th>Report Note</th>
                <th>Report At</th>
                <th>Report By</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(item,i) in allAssignment" >
                    <tr :key="i">
                        <td>{{ item.id }}</td>
                        <td>{{ item.detail }}</td>
                        <td>{{ item.patrol_name }}</td>
                        <td>{{ item.red_box_name }}</td>
                        <td>{{ item.time }}</td>
                    </tr>
                    <tr v-for="(report,index) in item.reports" :key='index+""+i'>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{ report.id }}</td>
                        <td>{{ report.note }}</td>
                        <td>{{ report.created_at | moment("DD-MMM-YYYY HH:mm:ss") }}</td>
                        <td>{{ item.patrol_name }}</td>
                    </tr>
                </template>
                
            </tbody>
        </table>
  </div>
</template>

<script>
export default {
    props: ["Assignments","SelectedMonth","Created_at"],
    data(){
        return {
            allAssignment:"",
            selectedMonth:"",
            created_at:""
        }
    },
    watch:{
        Assignments(val, OldVal) {
        console.log("------------------");
        console.log(val);
        console.log(OldVal);
        console.log("------------------");
        this.fetchAllAssignment();
        },
    },
    methods:{
        async fetchAllAssignment(){
            // let res = await RedBoxesService.getAllRedBoxes();
            // let res = await AssignmentSevices.getAllAssignment();
            // console.log(res);
            this.allAssignment = this.Assignments
            this.selectedMonth = this.SelectedMonth
            this.created_at = this.Created_at
            // this.allRedBoxes = res.assignments
            // console.log(this.allRedBoxes);
        }
    },
    async created(){
     await this.fetchAllAssignment();
    //  console.log(this.allRedBoxes);
  }
}
</script>

<style>

</style>