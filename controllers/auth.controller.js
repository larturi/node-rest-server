const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Usuario y/o password incorrectos' });
        }

        // Verificar si esta activo
        if (!user.status) {
            return res.status(400).json({ msg: 'Usuario y/o password incorrectos' });
        }

        // Verificar password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ msg: 'Usuario y/o password incorrectos' });
        }

        // Generar JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Ha habido un error al intentar autenticar el usuario'
        });
    }
}

module.exports = {
    login,
}