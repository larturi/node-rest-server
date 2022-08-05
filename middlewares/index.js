const validarJWT = require('../middlewares/validar-jwt');
const validarCampos = require('../middlewares/validations');
const hasRole = require('../middlewares/validar-rol');

module.exports = {
    ...validarJWT,
    ...validarCampos,
    ...hasRole,
}