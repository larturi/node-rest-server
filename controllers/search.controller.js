const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Category, Role, Product } = require( '../models' );

const validCollections = [
    'users',
    'roles',
    'products',
    'categories',
];

const buscarUsuarios = async (term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term);

    // Busqueda por id
    if(isMongoID) {
        const usuario = await User.findById(term);
        return res.json({
            results: usuario ? [ usuario ] : []
        });
    }

    // Busqueda por name o email
    const regex = new RegExp(term, 'i');
    const usuarios = await User.find({ 
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}]
    });

    return res.json({
        results: usuarios
    });
}

const buscarProductos = async (term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term);

    // Busqueda por id
    if(isMongoID) {
        const producto = await Product.findById(term)
            .populate('category', 'name')
            .populate('user', 'email');
        return res.json({
            results: producto ? [ producto ] : []
        });
    }

    // Busqueda por name o email
    const regex = new RegExp(term, 'i');
    const productos = await Product.find({ 
        $or: [{name: regex}],
        $and: [{isActive: true}]
    })
    .populate('category', 'name')
    .populate('user', 'email');

    return res.json({
        results: productos
    });
}

const buscarCategorias = async (term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term);

    // Busqueda por id
    if(isMongoID) {
        const categoria = await Category.findById(term);
        return res.json({
            results: categoria ? [ categoria ] : []
        });
    }

    // Busqueda por name o email
    const regex = new RegExp(term, 'i');
    const categorias = await Category.find({ 
        $or: [{name: regex}],
        $and: [{isActive: true}]
    });

    return res.json({
        results: categorias
    });
}

const buscarRoles = async (term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term);

    // Busqueda por id
    if(isMongoID) {
        const role = await Role.findById(term);
        return res.json({
            results: role ? [ role ] : []
        });
    }

    // Busqueda por name o email
    const regex = new RegExp(term, 'i');
    const roles = await Role.find({ 
        $or: [{name: regex}],
    });

    return res.json({
        results: roles
    });
}

const search = (req, res = response) => {

    const { collection, term } = req.params;

    if (!validCollections.includes(collection)) {
        return res.status(400).json({ 
            msg: `Collection is invalid. Valid colections: ${validCollections}` 
        });
    }

    switch (collection) {
        case 'users':
            buscarUsuarios(term, res)
            break;

        case 'roles':
            buscarRoles(term, res)
            break;

        case 'products':
            buscarProductos(term, res)
            break;

        case 'categories':
            buscarCategorias(term, res)
            break;
    
        default:
            return res.status(500).json({msg: `Valid colections: ${validCollections}` });
    }
}

module.exports = {
    search
}