const express = require('express');
const { crearUsuario, actualizarUsuario, obtenerUsuarios, obtenerUsuarioId } = require('./../controllers/usuarioController');
const { verificarAuth } = require('../middlewares/verificarAutenticacion');

const router = express.Router();

router.route('/')
    .post(crearUsuario)
    .get(obtenerUsuarios)

router.route('/get-all')
    .get(verificarAuth, obtenerUsuarios)

router
    .route('/:id')
    .get(obtenerUsuarioId)
    .put(actualizarUsuario)

module.exports = router;