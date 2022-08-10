const { request, response } = require('express');
const Category = require('../models/category');

const getCategories = async(req = request, res = response) => {

    const { limit = 5, init = 0 } = req.query;
    const filter = { isActive: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(filter),
        Category.find(filter)
            .populate('user', 'name')
            .skip(Number(init))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        categories,
    });
}

const getCategoryById = async(req = request, res = response) => {

    const { id } = req.params;

    const category = await Category.findById(id).populate('user', 'name');

    res.json({
        category
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
    const { id } = req.params;
    const { _id, isActive, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.usuarioAutenticado._id

    const categoryUpdated = await Category.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json(categoryUpdated);
}

const deleteCategory = async(req = request, res = response) => {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, { isActive: false }, { new: true });

    res.json(category);
}

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}