const { request, response } = require('express');
const { Category, Product } = require( '../models' );

const getProducts = async(req = request, res = response) => {
    const { limit = 5, init = 0 } = req.query;
    const filter = { isActive: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(filter),
        Product.find(filter)
            .populate('user', 'name')
            .skip(Number(init))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        products,
    });
}

const getProductById = async(req = request, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name');

    res.json({
        product
    });
}

const createProduct = async(req = request, res = response) => {
    // Cualquier persona autenticada puede crear productos 

    const { isActive, user, ...body } = req.body;

    // Validar que el producto no exista
    const productDB = await Product.findOne({ name: body.name.toUpperCase() });
    if (productDB) {
        return res.status(400).json({
            msg: `El producto ya existe en la base de datos`
        });
    }

    // Validar que la categoria exista
    const categoryExists = await Category.findById({ _id: body.category });
    if (!categoryExists) {
        return res.status(400).json({
            msg: `La categoria no existe`
        });
    }

    const data = {
        body,
        name: body.name.toUpperCase(),
        user: req.usuarioAutenticado._id
    }

    const product = await new Product(data);
    await product.save();

    res.status(201).json({
        product
    });
}

const updateProduct = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, isActive, user, ...data } = req.body;

    if(data.name) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.usuarioAutenticado._id

    const productUpdated = await Product.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json(productUpdated);
}

const deleteProduct = async(req = request, res = response) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
    res.json(product);
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}