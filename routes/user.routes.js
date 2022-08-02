const { Router } = require('express');
const { check } = require('express-validator');
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validations');
const { isValidRole, emailExists, userExistsById } = require('../helpers/db-validators');

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('email', 'El email no tiene el formato correcto').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isValidRole),
    validarCampos
], createUser);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isValidRole),
    validarCampos
], updateUser);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userExistsById),
    validarCampos
], deleteUser);

module.exports = router;