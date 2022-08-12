const { response } = require('express');
const { uploadFile } = require('../helpers');

const subirArchivo = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({ msg: 'No hay archivos en la petición' });
    }

    const name = await uploadFile(req.files);

    return res.json({ name });

}

module.exports = {
    subirArchivo,
}