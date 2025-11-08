import { taskflowApi } from "../../config/api/taskflowApi"
import type { ProjectResponse } from "../../infrastructure/interfaces/projects.responses";

export const getProjects = async () => {

    try {
        const { data } = await taskflowApi.get<ProjectResponse>('/projects');

        return data.response;

    } catch (error) {
        console.log(error)        
    }

}

export const getAllProjects = async () => {

    try {
        const { data } = await taskflowApi.get('/projects/get-all');

        return data.response;

    } catch (error) {
        console.log(error)        
    }

}