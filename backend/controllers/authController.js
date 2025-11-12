const dotenv = require("dotenv");
dotenv.config({ path: "./../.env" });
const sequelize = require("../config/db");
const { QueryTypes } = require("sequelize");
const { compararContraseña } = require('./../helpers/handleBcrypt');
const { generarToken, verificarToken } = require('./../helpers/handleToken');
const { getBearerToken } = require("../helpers/getBearerToken");

const login = async (req, res) => {

    const { Usuario, Password } = req.body;

    try {
        const response = await sequelize.query(
            `EXEC SP_Usuarios_ObtenerPorUsuario @Usuario = :Usuario`, {
            type: QueryTypes.SELECT,
            plain: true,
            replacements: {
                Usuario
            }
        });

        if (!response) {
            return res.status(400).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        const comparacion = await compararContraseña(Password, response.Password);

        if (!comparacion) {
            return res.status(400).json({
                status: "error",
                message: "Contraseña incorrecta"
            });
        }

        const usuarioToken = {
            id: response.UsuarioID,
        };

        const token = await generarToken(usuarioToken);

        // agregando usuario al request
        req.usuario = usuarioToken;

        await insertarToken(token);

        res.status(200).json({
            status: 'success',
            response,
            token: token
        });
    }
    catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

const renew = async (req, res) => {
    try {
        const oldToken = getBearerToken(req);

        if (!oldToken) {
            return res.status(401).json({ status: "error", message: "Token no provisto" });
        }

        let tokenData;
        try {
            tokenData = await verificarToken(oldToken);
        } catch (e) {
            return res.status(401).json({ status: "error", message: "Token inválido o expirado" });
        }

        const tokenEnDb = await sequelize.query(
            `EXEC SP_Token_ListarPorToken @Token = :Token`,
            { type: QueryTypes.SELECT, replacements: { Token: oldToken } }
        );
        if (!tokenEnDb || tokenEnDb.length === 0) {
            return res.status(401).json({ status: "error", message: "Token revocado o inexistente" });
        }

        const user = await sequelize.query(
            `EXEC SP_Usuarios_ObtenerPorID @UsuarioID = :UsuarioID`,
            { type: QueryTypes.SELECT, plain: true, replacements: { UsuarioID: tokenData.id } }
        );
        if (!user) {
            return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
        }

        const newPayload = { id: user.UsuarioID };
        const newToken = await generarToken(newPayload);

        await sequelize.query(`EXEC SP_Tokens_Crear @Token = :Token`, {
            type: QueryTypes.SELECT,
            replacements: { Token: newToken },
        });

        await sequelize.query(`EXEC SP_Tokens_Eliminar @token = :token`, {
            type: QueryTypes.DELETE,
            replacements: { token: oldToken },
        });

        res.status(200).json({
            status: "success",
            response: user,
            token: newToken,
        });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
};


const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();

        await sequelize.query(`EXEC SP_Tokens_Eliminar @token = :token`, {
            type: QueryTypes.SELECT,
            replacements: {
                token
            }
        });

        res.status(200).json({
            status: "exito",
            message: "Sesión cerrada correctamente"
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
};

const insertarToken = async (Token) => {
    try {
        await sequelize.query(`EXEC SP_Tokens_Crear @Token = :Token`, {
            type: QueryTypes.INSERT,
            replacements: {
                Token
            }
        });
    } catch (error) {
        throw new Error("Error al insertar el token en la base de datos");
    }
}

module.exports = {
    login,
    logout,
    renew,
};