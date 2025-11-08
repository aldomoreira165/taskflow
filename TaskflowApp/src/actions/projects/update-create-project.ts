import { taskflowApi } from "../../config/api/taskflowApi";
import { Project } from "../../domain/entities/project";
import { ProjectDetailResponse } from "../../infrastructure/interfaces/projects.responses";

export const updateCreateProject = (project: Partial<Project>) => {
    if (project.ProyectoID) return updateProject(project);
    return createProject(project)
}

const updateProject = async (project: Partial<ProjectDetailResponse>) => {
    const { ProyectoID, ...rest } = project;

    try {

        const { data } = await taskflowApi.put(`/projects/${ProyectoID}`, {
            ...rest
        })

        return data.response;

    } catch (error) {
        throw new Error('Error al actualizar el producto')
    }

}

const createProject = async (project: Partial<ProjectDetailResponse>) => {
    const { ProyectoID, ...rest } = project;

    try {

        const { data } = await taskflowApi.post(`/projects`, {
            ...rest
        })

        return data.response;

    } catch (error) {
        throw new Error('Error al actualizar el producto')
    }

}