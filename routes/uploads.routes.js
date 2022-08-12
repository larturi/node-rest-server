const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile } = require( '../controllers/uploads.controller' );
const { validarCampos } = require('../middlewares/validations');

const router = Router();

router.post('/', uploadFile);

module.exports = router;