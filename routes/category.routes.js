const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getCategories, 
    getCategoryById, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} = require( '../controllers/category.controller' );

const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/categories
 */

router.get('/', getCategories);

router.get('/:id', getCategoryById);

router.post('/', [
    validarJWT,
    check('name', 'El campo name es obligatorio').notEmpty(),
    validarCampos
], createCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);


module.exports = router;