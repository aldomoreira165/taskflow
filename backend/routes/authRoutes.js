const express = require('express');

const { login, logout, renew } = require('./../controllers/authController');

const { verificarAuth } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router.route('/login')
    .post(login)

router.route('/renew')
    .post(renew)

router
    .route('/logout')
    .delete(verificarAuth, logout)

module.exports = router;