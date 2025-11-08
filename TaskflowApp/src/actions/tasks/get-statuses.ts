import { taskflowApi } from "../../config/api/taskflowApi"

export const getStatuses = async () => {

    try {
        const { data } = await taskflowApi.get('/tasks/statuses');

        return data.response;

    } catch (error) {
        console.log(error)
    }

}