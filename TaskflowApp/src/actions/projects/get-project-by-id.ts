import { taskflowApi } from "../../config/api/taskflowApi";
import { ProjectUpsertDTO } from "../../domain/entities/project";
import { TaskFlowProduct } from "../../infrastructure/interfaces/projects.responses";

const emptyProject: ProjectUpsertDTO = {
    Nombre: "",
    FechaInicio: new Date(),
    FechaEntrega: new Date(),
    Descripcion: ""
}

export const getProjectById = async (id?: number) => {

    if (!id) return emptyProject;

    try {

        const { data } = await taskflowApi.get<TaskFlowProduct>(`/projects/${id}`);

        return data.response;

    } catch (error) {
        console.log(error);
        return null;
    }
}