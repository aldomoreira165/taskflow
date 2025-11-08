import { taskflowApi } from "../../config/api/taskflowApi";
import { Task } from "../../domain/entities/task";
import { Response } from "../../infrastructure/interfaces/tasks.responses";

export const updateCreateTask = (task: Partial<Task>) => {

    if (task.TareaID) {
        return updateTask(task);
    }

    return createTask(task)
}

const updateTask = async (task: Partial<Response>) => {
    const { TareaID, ...rest } = task;

    try {

        const { data } = await taskflowApi.put(`/tasks/${TareaID}`, {
            ...rest
        })
        return data.response;

    } catch (error) {
        throw new Error('Error al actualizar el producto')
    }
}

const createTask = async (task: Partial<Response>) => {
    const { TareaID, ...rest } = task;

    try {

        const { data } = await taskflowApi.post(`/tasks`, {
            ...rest
        })
        
        return data.response;

    } catch (error) {
        throw new Error('Error al actualizar el producto')
    }

}