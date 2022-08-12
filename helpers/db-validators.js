const Role = require('../models/role');
const { User, Category, Product } = require('../models');

const isValidRole = async(role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`El rol ${role} no es un rol valido`);
    }
}

const emailExists = async(email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`El email ${email} ya esta registrado`);
    }
}

const userExistsById = async(id) => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`El usuario con id ${id} no existe`);
    }
}

const existeCategoriaById = async(id) => {
    const CategoryExists = await Category.findById(id);
    if (!CategoryExists) {
        throw new Error(`La categoria con id ${id} no existe`);
    }
}

const existeProductoById = async(id) => {
    const ProductExists = await Product.findById(id);
    if (!ProductExists) {
        throw new Error(`El producto con id ${id} no existe`);
    }
}

const validCollections = (collection = '', collections = []) => {
    const isInclude = collections.includes(collection);

    if(!isInclude) {
        throw new Error(`La coleccion ${collection} no es permitida. Colecciones permitidas: ${collections}`);
    }

    return true;
}

module.exports = {
    isValidRole,
    emailExists,
    userExistsById,
    existeCategoriaById,
    existeProductoById,
    validCollections,
};