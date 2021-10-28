import Axios from "axios"
const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || 'http://localhost:8000'
export default {
    async getAllAssignment(){
        let url = `${api_endpoint}/api/assignments`
        // console.log(url);
        try {
           let res = await Axios.get(url);
        //    console.log(res);
           if(res.status === 200){
            return {
                success: true,
                assignments: res.data.data,
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
    async getAssignment(id){
        let url = `${api_endpoint}/api/assignments/${id}`
        // console.log(url);
        try {
           let res = await Axios.get(url);
        //    console.log(res);
           if(res.status === 200){
            return {
                success: true,
                assignments: res.data.data,
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

    async addAssignment(nameAndIDPatrol , nameAndIDRedBox , detail , time ,commanderCurrentId)
    {
        let url = `${api_endpoint}/api/assignments`
        let payload = {
            detail: detail ,
            time: time ,
            commander_id : commanderCurrentId ,
            patrol_id : nameAndIDPatrol[0] ,
            red_box_id : nameAndIDRedBox[0] ,
            status : "NEW"

        }
        try {
            let res = await Axios.post(url,payload);
            console.log("it is res" ,res);
            if(res.status === 201){
             return {
                 success: true,
                 assignments: res.data.data,
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
    } ,

    async getAssignmentByCommander(id){
        let url = `${api_endpoint}/api/assignments/admin/${id}`
        console.log(url);
        try {
           let res = await Axios.get(url);
           console.log("..." ,res.data);
           if(res.status === 200){
            return {
                success: true,
                assignments: res.data,
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
    async updateStatus(status , id){
        console.log(status);
        let url = `${api_endpoint}/api/assignments/update/${id}`
        try {
            let res = await Axios.put(url, { status: status ,});
            console.log("res" ,res);
            if(res.status === 200){
             return {
                 success: true,
                 assignments: res.data,
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
    }

}