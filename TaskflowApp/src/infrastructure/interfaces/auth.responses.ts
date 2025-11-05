export interface AuthResponse {
    status:   string;
    response: Response;
    token:    string;
}

export interface Response {
    UsuarioID: number;
    Password:  string;
    Nombre:    string;
    Usuario:   string;
}
