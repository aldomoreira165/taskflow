const express = require('express');
const { create, update, remove, get, getById } = require('../controllers/projectController');
const { verificarAuth } = require('../middlewares/verificarAutenticacion');

const router = express.Router();

router.route('/')
    .get(verificarAuth, get)
    .post(verificarAuth, create)

router.route('/:ProyectoID')
    .get(verificarAuth, getById)
    .put(verificarAuth, update)
    .delete(verificarAuth, remove)

module.exports = router;