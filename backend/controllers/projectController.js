const { QueryTypes } = require("sequelize");
const sequelize = require("../config/db");

const get = async (req, res) => {
    try {

        const UsuarioID = req.usuario.id;

        console.log("UsuarioID: ", UsuarioID)

        const response = await sequelize.query('EXEC SP_Proyectos_Listar @UsuarioID = :UsuarioID', {
            type: QueryTypes.SELECT,
            replacements: {
                UsuarioID
            }
        })

        return res.status(200).json({
            status: 'success',
            response
        })

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

const getById = async (req, res) => {
    try {

        const { ProyectoID } = req.params;

        const response = await sequelize.query('EXEC SP_Proyectos_ListarPorID @ProyectoID = :ProyectoID', {
            type: QueryTypes.SELECT,
            plain: true,
            replacements: {
                ProyectoID
            }
        })

        return res.status(200).json({
            status: 'success',
            response
        })

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
}

const create = async (req, res) => {

    try {

        const { Nombre, FechaInicio, FechaEntrega, Descripcion, MiembrosUsuarioIDs = [] } = req.body;

        const UsuarioCreadorID = req.usuario.id;

        const query = `
            EXEC SP_Proyectos_Crear
                @Nombre = :Nombre,
                @FechaInicio = :FechaInicio,
                @FechaEntrega = :FechaEntrega,
                @UsuarioCreadorID = :UsuarioCreadorID,
                @Descripcion = :Descripcion,
                @MiembrosJson   = :MiembrosJson
        `;

        const response = await sequelize.query(query, {
            type: QueryTypes.SELECT,
            plain: true,
            replacements: {
                Nombre,
                FechaInicio,
                FechaEntrega,
                UsuarioCreadorID,
                Descripcion,
                MiembrosJson: JSON.stringify(MiembrosUsuarioIDs),
            }
        })

        return res.status(201).json({
            status: 'success',
            response
        });

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

const update = async (req, res) => {
    try {

        const { ProyectoID } = req.params;
        const { Nombre, FechaInicio, FechaEntrega, Descripcion, MiembrosUsuarioIDs = [] } = req.body;

        const query = `
            EXEC SP_Proyectos_Editar
                @ProyectoID = :ProyectoID,
                @Nombre = :Nombre,
                @FechaInicio = :FechaInicio,
                @FechaEntrega = :FechaEntrega,
                @Descripcion = :Descripcion,
                @MiembrosJson   = :MiembrosJson
        `;

        const response = await sequelize.query(query, {
            type: QueryTypes.SELECT,
            plain: true,
            replacements: {
                ProyectoID,
                Nombre,
                FechaInicio,
                FechaEntrega,
                Descripcion,
                MiembrosJson: JSON.stringify(MiembrosUsuarioIDs),
            }
        })

        return res.status(200).json({
            status: 'success',
            response
        });

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

const remove = async (req, res) => {
    try {

        const { ProyectoID } = req.params;

        const response = await sequelize.query('EXEC SP_Proyector_Eliminar @ProyectoID = :ProyectoID', {
            type: QueryTypes.SELECT,
            replacements: {
                ProyectoID
            }
        })

        return res.sendStatus(204);

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

const getAll = async (req, res) => {
    try {

        const response = await sequelize.query('EXEC SP_Proyectos_ListarTodos', {
            type: QueryTypes.SELECT
        })

        return res.status(200).json({
            status: 'success',
            response
        });

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
}

module.exports = {
    get,
    getById,
    create,
    update,
    remove,
    getAll,
}