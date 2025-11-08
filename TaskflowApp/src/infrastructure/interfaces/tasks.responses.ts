export interface TaskResponse {
    status: string;
    response: Response[];
}

export interface TaskFlowTask {
    status: string;
    response: Response;
}

export interface Response {
    TareaID: number;
    Nombre: string;
    Descripcion: string;
    ProyectoID: number | null;
    PrioridadID: number | null;
    EstadoID: number | null;
    UsuarioCreadorID: number | null;
    UsuarioAsignadoID: number | null;
    FechaInicio: Date;
    FechaEntrega: Date;
    CategoriaID: number | null;
}
