import { taskflowApi } from "../../config/api/taskflowApi"
import { TaskResponse } from "../../infrastructure/interfaces/tasks.responses";

export const getTasks = async () => {

    try {
        const { data } = await taskflowApi.get<TaskResponse>('/tasks');

        return data.response;

    } catch (error) {
        console.log(error)        
    }

}