import { taskflowApi } from "../../config/api/taskflowApi"

export const getUsers = async () => {

    try {
        const { data } = await taskflowApi.get('/usuarios/get-all');

        return data.response;

    } catch (error) {
        console.log(error)        
    }

}