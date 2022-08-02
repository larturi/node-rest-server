const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`El rol ${role} no es un rol valido`);
    }
}

const emailExists = async(email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`El email ${email} ya esta registrado`);
    }
}

const userExistsById = async(id) => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`El usuario con id ${id} no existe`);
    }
}


module.exports = {
    isValidRole,
    emailExists,
    userExistsById,
};