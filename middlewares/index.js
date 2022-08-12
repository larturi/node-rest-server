const validarJWT       = require('../middlewares/validar-jwt');
const validarCampos    = require('../middlewares/validations');
const hasRole          = require('../middlewares/validar-rol');
const validarArchivoUpload   = require('../middlewares/validar-file');

module.exports = {
    ...validarJWT,
    ...validarCampos,
    ...hasRole,
    ...validarArchivoUpload,
}