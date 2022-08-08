const { request, response } = require('express');
const Category = require('../models/category');

const getCategories = async(req = request, res = response) => {
    // const { limit = 5, init = 0 } = req.query;
    // const filter = { status: true };

    // const [total, users] = await Promise.all([
    //     User.countDocuments(filter),
    //     User.find(filter)
    //     .skip(Number(init))
    //     .limit(Number(limit))
    // ]);

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
    // Privado, cualquier rol
    res.json({
        msg: "createCategory"
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