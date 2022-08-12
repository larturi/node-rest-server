const path = require('path');
const { response } = require('express');

const uploadFile = (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({ msg: 'No hay archivos en la petición' });
    }
    
    const { file } = req.files;
  
    const uploadPath = path.join(__dirname, '../uploads/', file.name);
  
    file.mv(uploadPath, function(err) {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }
  
      res.json({ msg: 'File uploaded to ' + uploadPath });
    });

}

module.exports = {
    uploadFile,
}