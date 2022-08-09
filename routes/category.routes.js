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
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const router = Router();

/**
 * {{url}}/api/categories
 */

router.get('/', getCategories);

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos,
], getCategoryById);

router.post('/', [
    validarJWT,
    check('name', 'El campo name es obligatorio').notEmpty(),
    validarCampos
], createCategory);

router.put('/:id', [
    validarJWT,
    check('name', 'El campo name es obligatorio').notEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], updateCategory);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    esAdminRole,
    validarCampos
], deleteCategory);


module.exports = router;