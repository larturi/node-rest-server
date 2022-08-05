const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validations');

const router = Router();

router.post('/login', [
    check('email', 'Email es obligatorio').isEmail(),
    check('password', 'Password es obligatorio').notEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('google_token', 'El google_token es obligatorio').notEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;