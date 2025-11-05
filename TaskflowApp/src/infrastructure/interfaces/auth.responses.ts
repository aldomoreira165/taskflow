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

export interface RegisterResponse {
    status:   string;
    response: Response;
}

export interface Response {
    UsuarioID: number;
    Password:  string;
    Nombre:    string;
    Usuario:   string;
}
