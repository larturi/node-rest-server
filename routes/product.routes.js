const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require( '../controllers/product.controller' );
const { existeCategoriaById, existeProductoById } = require( '../helpers/db-validators' );
const { validarJWT, validarCampos, hasRole } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/products
 */

// OBTENER LISTA DE PRODUCTOS ACTIVOS
router.get('/', getProducts);

// OBTENER PRODUCTO POR ID
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos,
], getProductById);

// CREAR PRODUCTO
router.post('/', [
    validarJWT,
    check('name', 'El campo name es obligatorio').notEmpty(),
    check('category', 'No es un ID valido').isMongoId(),
    check('category').custom(existeCategoriaById),
    validarCampos
], createProduct);

// ACTUALIZAR PRODUCTO
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoById),
    hasRole('ADMIN_ROLE'),
    validarCampos
], updateProduct);

// BAJA LOGICA PRODUCTO
router.delete('/:id', [
    validarJWT,
    check('id').custom(existeProductoById),
    check('id', 'No es un ID valido').isMongoId(),
    hasRole('ADMIN_ROLE'),
    validarCampos
], deleteProduct);


module.exports = router;