const express = require('express');
const { verificarAuth } = require('../middlewares/verificarAutenticacion');
const { create, get, update, getById, getPriorities, getStatuses, getCategories } = require('../controllers/taskController');

const router = express.Router();

router.route('/')
    .get(verificarAuth, get)
    .post(verificarAuth, create);

router.route('/priorities')
    .get(verificarAuth, getPriorities)

router.route('/statuses')
    .get(verificarAuth, getStatuses)

router.route('/categories')
    .get(verificarAuth, getCategories)

router.route('/:TareaID')
    .get(verificarAuth, getById)
    .put(verificarAuth, update)

module.exports = router;