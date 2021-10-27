import Axios from "axios"
const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || 'http://localhost:8000'

export default {
    async getAllPolice(){
        let url = `${api_endpoint}/api/polices`
        console.log(url);
        try {
           let res = await Axios.get(url);
           if(res.status === 200){
            return {
                success: true,
                police: res.data.data,
            }
            }
        } catch (e) {
            console.log(e);
            let error = ""
                for (let items in e.response.data.errors)
                {
                    // console.log(`${e.response.data.errors[items]}`);
                    error = error  +`${e.response.data.errors[items]}` + "\n";
                }
                // console.log(error);
                return {
                    success: false,
                    message: error
                }
        }
    },
}    