const dotenv = require("dotenv");
dotenv.config({ path: "./../.env" });
const sequelize = require("../config/db");
const { QueryTypes } = require("sequelize");
const { compararContraseña } = require('./../helpers/handleBcrypt');
const { generarToken } = require('./../helpers/handleToken');

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

        // await insertarToken(token);

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

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        await sequelize.query(
            `EXEC p_eliminarToken @token = '${token}'`
        );
        res.status(200).json({
            estado: "exito",
            mensaje: "Sesión cerrada correctamente"
        });
    } catch (error) {
        res.status(400).json({
            estado: "error",
            mensaje: error.message
        });
    }
};

const insertarToken = async (token) => {
    try {
        await sequelize.query(
            `EXEC p_insertarToken @token = '${token}'`
        );
    } catch (error) {
        throw new Error("Error al insertar el token en la base de datos");
    }
}

module.exports = {
    login,
    logout
};