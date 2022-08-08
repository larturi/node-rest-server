const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getCategories, 
    getCategoryById, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} = require( '../controllers/category.controller' );
const router = Router();

/**
 * {{url}}/api/categories
 */

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);


module.exports = router;