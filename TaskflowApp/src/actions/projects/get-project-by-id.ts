import { taskflowApi } from "../../config/api/taskflowApi";
import { ProjectUpsertDTO } from "../../domain/entities/project";
import { ProjectDetailResponse, TaskFlowProduct } from "../../infrastructure/interfaces/projects.responses";

const emptyProject: ProjectUpsertDTO = {
    Nombre: "",
    FechaInicio: new Date(),
    FechaEntrega: new Date(),
    Descripcion: ""
}

export const getProjectById = async (id?: number) => {
    if (!id) return null;

    try {
        const { data } = await taskflowApi.get<TaskFlowProduct>(`/projects/${id}`);
        const r: ProjectDetailResponse = data.response;

        const safeParse = (s?: string) => {
            if (!s) return [];
            try { return JSON.parse(s); } catch { return []; }
        };

        const miembros = safeParse(r.Miembros);          
        const idsRaw = safeParse(r.MiembrosUsuarioIDsJson); 

        const MiembrosUsuarioIDs: number[] = Array.isArray(idsRaw) && idsRaw.length
            ? idsRaw.map((x: any) => Number(x.UsuarioID ?? x)).filter(Boolean)
            : miembros.map((m: any) => Number(m.UsuarioID)).filter(Boolean);

        return {
            ...r,
            FechaInicio: r.FechaInicio ? new Date(r.FechaInicio) : undefined,
            FechaEntrega: r.FechaEntrega ? new Date(r.FechaEntrega) : undefined,
            MiembrosParsed: miembros as Array<{ UsuarioID: number; Nombre: string }>,
            MiembrosUsuarioIDs,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};