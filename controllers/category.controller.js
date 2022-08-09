const { request, response } = require('express');
const Category = require('../models/category');

const getCategories = async(req = request, res = response) => {
    res.json({
        msg: "get"
    });
}

const getCategoryById = async(req = request, res = response) => {
    res.json({
        msg: "getById"
    });
}

const createCategory = async(req = request, res = response) => {
    // Cualquier persona autenticada puede crear categorias

    const name = req.body.name.toUpperCase();

    // Validar que la categoria no exista
    const categoryDB = await Category.findOne({ name });
    if (categoryDB) {
        return res.status(400).json({
            msg: `La categoria ${categoryDB.name} ya existe`
        });
    }

    const data = {
        name, 
        user: req.usuarioAutenticado._id
    }

    const category = await new Category(data);
    await category.save();

    res.status(201).json({
        category
    });
}

const updateCategory = async(req = request, res = response) => {
    // Privado, cualquier rol
    res.json({
        msg: "updateCategory"
    });
}

const deleteCategory = async(req = request, res = response) => {
    // Privado, solo el admin
    res.json({
        msg: "deleteCategory"
    });
}

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}