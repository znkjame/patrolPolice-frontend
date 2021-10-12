import Axios from "axios"
const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || 'http://localhost:8000'

export default {
    async getAllRedBoxes(){
        let url = `${api_endpoint}/api/redboxes`
        console.log(url);
        try {
           let res = await Axios.get(url);
           if(res.status === 200){
            return {
                success: true,
                redBoxes: res.data.data,
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
    async createNewRedBox(data){
        try {
            let url = `${api_endpoint}/api/redboxes/`
            let res = await Axios.post(url, data);
            console.log(res);
            // let res = await Axios.post(url, data,{
            //     headers: {
            //       'Content-Type': "multipart/form-data" ,
            //       Authorization: `Bearer ${jwt}`,
            //     }
            // })
            console.log(res);
            if(res.status === 201){
                return {
                    success: true,
                    foodRecipe: res.data,
                }
            }else{
                console.log("NOT 200", res);
            }
        } catch (e) {
            console.log(e);
            // let error = ""
            // for (let items in e.response.data.errors)
            // {
            //     // console.log(`${e.response.data.errors[items]}`);
            //     error = error  +`${e.response.data.errors[items]}` + "\n";
            // }
            // // console.log(error);
            // return {
            //     success: false,
            //     message: error
            // }
        }
    },
    async deleteCurrent(id)
    {
        try 
        {
            let url = `${api_endpoint}/api/redboxes/${id}`
            console.log();
            // console.log(jwt);
            let res = await Axios.delete(url);
            if(res.status === 200){
                return {
                    success: true
                }
            }
            // let res = await Axios.delete(url,{
            //     headers: {
            //       Authorization: `Bearer ${jwt}` ,               
            //     }
            // })
        }
        catch (e){
            console.log(e);
            return {
                success: false,
            }
        }
    }
}