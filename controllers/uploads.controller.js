const { response } = require('express');
const { uploadFile } = require('../helpers');
const { Product, User } = require('../models')

const subirArchivo = async (req, res = response) => {
    try {
        const name = await uploadFile(req.files, ['png', 'jpg', 'jpeg'], 'img');
        return res.json({ name });
    } catch (error) {
        res.status(400).json(error);
    }
}

const actualizarImagen = async (req, res = response) => {

    const { collection, id } = req.params;

    let modelo;

    switch (collection) {
        case 'users':
            modelo = await User.findById(id);
            if(!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }
        break;

        case 'products':
            modelo = await Product.findById(id);
            if(!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el id ${id}` });
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'Colleccion no soportada' })
    }

    // Guarda la imagen
    try {
        modelo.img = await uploadFile(req.files, ['png', 'jpg', 'jpeg'], collection);
        await modelo.save();
        return res.json(modelo);
    } catch (error) {
        res.status(400).json(error);
    }

}

module.exports = {
    subirArchivo,
    actualizarImagen,
}