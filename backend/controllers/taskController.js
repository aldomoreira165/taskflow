const { QueryTypes } = require("sequelize");
const sequelize = require("../config/db");

const get = async (req, res) => {
    try {
        const UsuarioID = req.usuario.id;

        const response = await sequelize.query('EXEC SP_Tareas_Listar @UsuarioID = :UsuarioID', {
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

        const { TareaID } = req.params;

        const response = await sequelize.query('EXEC SP_Tareas_ListarPorID @TareaID = :TareaID', {
            type: QueryTypes.SELECT,
            plain: true,
            replacements: {
                TareaID
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

        const { Nombre, Descripcion, ProyectoID, PrioridadID, UsuarioAsignadoID, FechaInicio, FechaEntrega, CategoriaID } = req.body;

        const UsuarioCreadorID = req.usuario.id;

        const query = `
            EXEC SP_Tareas_Crear
                @Nombre = :Nombre,
                @Descripcion = :Descripcion,
                @ProyectoID = :ProyectoID,
                @PrioridadID = :PrioridadID,
                @UsuarioCreadorID = :UsuarioCreadorID,
                @UsuarioAsignadoID = :UsuarioAsignadoID,
                @FechaInicio = :FechaInicio,
                @FechaEntrega = :FechaEntrega,
                @CategoriaID = :CategoriaID
        `;

        const response = await sequelize.query(query, {
            type: QueryTypes.SELECT,
            plain: true,
            replacements: {
                Nombre,
                Descripcion,
                ProyectoID,
                PrioridadID,
                UsuarioCreadorID,
                UsuarioAsignadoID,
                FechaInicio,
                FechaEntrega,
                CategoriaID
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
}

const update = async (req, res) => {
    try {

        const { TareaID } = req.params;
        const { Nombre, Descripcion, ProyectoID, PrioridadID, UsuarioAsignadoID, FechaInicio, FechaEntrega, CategoriaID } = req.body;


        const query = `
            EXEC SP_Tareas_Editar
                @TareaID = :TareaID,
                @Nombre = :Nombre,
                @Descripcion = :Descripcion,
                @ProyectoID = :ProyectoID,
                @PrioridadID = :PrioridadID,
                @UsuarioAsignadoID = :UsuarioAsignadoID,
                @FechaInicio = :FechaInicio,
                @FechaEntrega = :FechaEntrega,
                @CategoriaID = :CategoriaID
        `;

        const response = await sequelize.query(query, {
            type: QueryTypes.SELECT,
            plain: true,
            replacements: {
                TareaID,
                Nombre,
                Descripcion,
                ProyectoID,
                PrioridadID,
                UsuarioAsignadoID,
                FechaInicio,
                FechaEntrega,
                CategoriaID
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

const getPriorities = async (req, res) => {
    try {

        const response = await sequelize.query('EXEC SP_Prioridades_Listar', {
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

const getStatuses = async (req, res) => {
    try {

        const response = await sequelize.query('EXEC SP_Estados_Listar', {
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

const getCategories = async (req, res) => {
    try {

        const response = await sequelize.query('EXEC SP_Categorias_Listar', {
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
    getPriorities,
    getStatuses,
    getCategories,
}