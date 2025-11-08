import { taskflowApi } from "../../config/api/taskflowApi";
import { Task, TaskUpsertDTO } from "../../domain/entities/task";
import { TaskFlowProduct } from "../../infrastructure/interfaces/projects.responses";
import { TaskFlowTask } from "../../infrastructure/interfaces/tasks.responses";

const emptyProject: Task = {
    Nombre: "",
    Descripcion: "",
    ProyectoID: null,
    PrioridadID: null,
    EstadoID: null,
    UsuarioCreadorID: null,
    UsuarioAsignadoID: null,
    FechaInicio: new Date(),
    FechaEntrega: new Date(),
    CategoriaID: null,
}

export const getTaskById = async (id?: number) => {

    if (!id) return emptyProject;

    try {

        const { data } = await taskflowApi.get<TaskFlowTask>(`/tasks/${id}`);

        return data.response;

    } catch (error) {
        console.log(error);
        return null;
    }
}