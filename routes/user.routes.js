const { Router } = require('express');
const {
    getUsers,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.patch('/', patchUser);
router.delete('/', deleteUser);

module.exports = router;