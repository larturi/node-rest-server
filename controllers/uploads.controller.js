const { response } = require('express');
const { uploadFile } = require('../helpers');

const subirArchivo = async (req, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({ msg: 'No hay archivos en la petición' });
    }

    try {
        const name = await uploadFile(req.files, ['png', 'jpg', 'jpeg'], 'img');
        return res.json({ name });
    } catch (msg) {
        res.status(400).json({ msg });
    }
}

const actualizarImagen = async (req, res = response) => {

    const { collection, id } = req.params;

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({ msg: 'No hay archivos en la petición' });
    }

    try {
       res.json({collection, id})
    } catch (msg) {
        res.status(400).json({ msg });
    }
}

module.exports = {
    subirArchivo,
    actualizarImagen,
}