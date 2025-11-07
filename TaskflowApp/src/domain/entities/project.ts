
export interface Project {
    ProyectoID: number;
    Nombre: string;
    FechaInicio: Date;
    FechaEntrega: Date;
    EstadoID: number;
    UsuarioCreadorID: number;
    Descripcion: string;
}

export interface  ProjectUpsertDTO {
  ProyectoID?: number | null;
  Nombre: string;
  Descripcion: string;
  FechaInicio?: Date | null;  
  FechaEntrega?: Date | null;
};