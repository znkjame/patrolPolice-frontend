<template>
    <div>
        <label for="note">หมายเหตุ :</label>
        <input
        class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
        type="text" placeholder="หมายเหตุ" v-model="note">
        <div class="p-1">
            <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-gray-100 focus:border-4 focus:border-green-300" 
            @click="addReport()">Submit</button>
        </div>
    </div>
</template>

<script>
import ReportService from '../../services/Report'
export default {
    data() {
        return {
            note:""
        }
    },
    methods: {
        async addReport() {
          console.log(this.note);  
          let res = await ReportService.addReport(this.note)
        },
    }
}
</script>

