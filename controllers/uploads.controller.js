const path = require('path');
const fs = require('fs');
const { response } = require('express');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

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

    // Elimina la imagen vieja
    if(modelo.img) {
        const pathImagenOld = path.join(__dirname, '../uploads', collection, modelo.img);
        if(fs.existsSync(pathImagenOld)) {
            fs.unlinkSync(pathImagenOld);
        }
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

const showImage = async (req, res = response) => {
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

    if(modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', collection, modelo.img);
        if(fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }

    // Si no existe la imagen mando un placeholder
    const pathImagenPlaceholder = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathImagenPlaceholder);
}

const actualizarImagenCloudinary = async (req, res = response) => {
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

    // Elimina la imagen vieja
    if(modelo.img) {
        const nameArr = modelo.img.split('/');
        const nombre = nameArr[nameArr.length - 1];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    // Guarda la imagen
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;

    await modelo.save();

    return res.status(400).json(modelo);
    
}

module.exports = {
    subirArchivo,
    actualizarImagen,
    showImage,
    actualizarImagenCloudinary,
}