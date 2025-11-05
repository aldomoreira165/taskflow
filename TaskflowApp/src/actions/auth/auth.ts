import { taskflowApi } from "../../config/api/taskflowApi";
import { User } from "../../domain/entities/user";
import type { AuthResponse } from "../../infrastructure/interfaces/auth.responses";

const returnUserToken = (data: AuthResponse) => {

    const user: User = {
        UsuarioID: data.response.UsuarioID,
        Nombre: data.response.Nombre,
        Usuario: data.response.Usuario,
    }

    return {
        user: user,
        token: data.token
    }

}

export const authLogin = async (Usuario: string, Password: string) => {
    try {

        const { data } = await taskflowApi.post<AuthResponse>('/auth/login', {
            Usuario,
            Password
        });

        return returnUserToken(data);

    } catch (error) {
        console.log(error);
        return null;
    }
}