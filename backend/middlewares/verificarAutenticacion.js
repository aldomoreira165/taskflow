const { verificarToken } = require('./../helpers/handleToken');
const sequelize = require("../config/db");
const { QueryTypes } = require('sequelize');

const verificarAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verificarToken(token);
        const response = await buscarToken(token);

        // verificar si el token existe
        if (response.length === 0) {
            return res.status(401).json({
                estado: "error",
                mensaje: "No se cuenta con los permisos necesarios"
            });
        }

        // verificar si el token es valido
        if (tokenData.id) {
            req.usuario = tokenData;
            next();
        } else {
            res.status(401).json({
                estado: "error",
                mensaje: "No se cuenta con los permisos necesarios"
            });
        }
    } catch (error) {
        res.status(401).json({
            estado: "error",
            mensaje: "No se cuenta con los permisos necesarios"
        });
    }
};

const buscarToken = async (Token) => {
    try {
        const response = await sequelize.query(`EXEC SP_Token_ListarPorToken @Token = :Token`, {
            type: QueryTypes.SELECT,
            replacements: {
                Token
            }
        });

        return response;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    verificarAuth,
}