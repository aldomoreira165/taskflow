const express = require('express');
const { crearUsuario, actualizarUsuario, obtenerUsuarios, obtenerUsuarioId, obtenerUsuarioActivo, obtenerUsuarioInactivo, activarUsuario, inactivarUsuario } = require('./../controllers/usuarioController');
const { verificarAuth } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router.route('/')
    .post(crearUsuario)
    .get(obtenerUsuarios)

router
    .route('/activos')
    .get(obtenerUsuarioActivo)

router
    .route('/inactivos')
    .get(obtenerUsuarioInactivo)

router
    .route('/activar/:id')
    .put(activarUsuario)

router
    .route('/inactivar/:id')
    .put(inactivarUsuario)

router
    .route('/:id')
    .get(obtenerUsuarioId)
    .put(actualizarUsuario)

module.exports = router;