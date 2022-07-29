const { Router } = require('express');
const { check } = require('express-validator');
const {
    getUsers,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
} = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validations');

const router = Router();

router.get('/', getUsers);
router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('email', 'El email no tiene el formato correcto').isEmail(),
    check('role', 'No es un rol permitido').isIn('ADMIN_ROLE', 'USER_ROLE'),
    validarCampos
], createUser);
router.put('/:id', updateUser);
router.patch('/', patchUser);
router.delete('/', deleteUser);

module.exports = router;