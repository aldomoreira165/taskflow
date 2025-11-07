export interface ProjectResponse {
    status: string;
    response: Response[];
}

export interface TaskFlowProduct {
    status: string;
    response: Response;
}

export interface Response {
    ProyectoID: number;
    Nombre: string;
    FechaInicio: Date;
    FechaEntrega: Date;
    EstadoID: number;
    UsuarioCreadorID: number;
    Descripcion: string;
}
