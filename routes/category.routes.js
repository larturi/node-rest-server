const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getCategories, 
    getCategoryById, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} = require( '../controllers/category.controller' );
const { existeCategoriaById } = require( '../helpers/db-validators' );
const { validarJWT, validarCampos, hasRole } = require('../middlewares');
const router = Router();

/**
 * {{url}}/api/categories
 */

// LISTADO DE CATEGORIAS
router.get('/', getCategories);

// GET CATEGORIA POR ID
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos,
], getCategoryById);

// CREAR CATEGORIA
router.post('/', [
    validarJWT,
    check('name', 'El campo name es obligatorio').notEmpty(),
    validarCampos
], createCategory);

// ACTUALIZAR CATEGORIA
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], updateCategory);

// BAJA LOGICA DE CATEGORIA
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    hasRole('ADMIN_ROLE'),
    validarCampos
], deleteCategory);


module.exports = router;