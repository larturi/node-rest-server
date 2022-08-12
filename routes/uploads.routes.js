const { Router } = require('express');
const { check } = require('express-validator');
const { subirArchivo, actualizarImagen } = require( '../controllers/uploads.controller' );
const { validCollections } = require( '../helpers' );
const { validarCampos } = require( '../middlewares' );

const router = Router();

router.post('/', subirArchivo);
router.put('/:collection/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('collection').custom(c => validCollections(c, ['users', 'products'])),
    validarCampos
], actualizarImagen);

module.exports = router;