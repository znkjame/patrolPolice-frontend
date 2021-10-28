import Axios from "axios"
const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || 'http://localhost:8000'

export default {
    async addReport(data){
        let url = `${api_endpoint}/api/reports/`
        console.log(data)
        let res = await Axios.post(url, data);
        console.log(res);
    },
}    