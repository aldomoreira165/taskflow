import { taskflowApi } from "../../config/api/taskflowApi"

export const getPriorities = async () => {

    try {
        const { data } = await taskflowApi.get('/tasks/priorities');

        return data.response;

    } catch (error) {
        console.log(error)        
    }

}