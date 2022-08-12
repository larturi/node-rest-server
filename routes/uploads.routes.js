const { Router } = require('express');
const { check } = require('express-validator');
const { subirArchivo, actualizarImagen } = require( '../controllers/uploads.controller' );
const { validCollections } = require( '../helpers' );
const { validarCampos, validarArchivoUpload } = require( '../middlewares' );

const router = Router();

// HACE EL UPLOAD DE UN FILE
router.post('/', validarArchivoUpload, subirArchivo);

// HACE EL UPDATE DE UN FILE
router.put('/:collection/:id', [
    validarArchivoUpload,
    check('id', 'No es un ID valido').isMongoId(),
    check('collection').custom(c => validCollections(c, ['users', 'products'])),
    validarCampos
], actualizarImagen);

module.exports = router;