const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validations');

const router = Router();

router.post('/login', [
    check('email', 'Email es obligatorio').isEmail(),
    check('password', 'Password es obligatorio').notEmpty(),
    validarCampos
], login);

module.exports = router;