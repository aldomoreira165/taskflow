import { taskflowApi } from "../../config/api/taskflowApi"

export const getCategories = async () => {

    try {
        const { data } = await taskflowApi.get('/tasks/categories');

        return data.response;

    } catch (error) {
        console.log(error)        
    }

}