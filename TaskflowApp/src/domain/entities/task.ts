
export interface Task {
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

export interface TaskUpsertDTO {
    TareaID?: number | null;
    Nombre: string;
    Descripcion: string;
    ProyectoID: number;
    EstadoID: number;
    UsuarioAsignadoID: number;
    FechaInicio: Date;
    FechaEntrega: Date;
    CategoriaID: number;
};