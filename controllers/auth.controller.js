const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require( '../helpers/google-verify' );

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

const googleSignIn = async (req, res = response) => {
    const { google_token } = req.body;

    try {
        const { name, picture, email } = await googleVerify(google_token);

        let usuario = await User.findOne({ email });

        // Creo el usuario
        if (!usuario) {
            const data = {
                name,
                email,
                password: ':)',
                img: picture,
                google: true
            };

            usuario = new User(data);
            await usuario.save();
        }

        // Si el usuario existe pero esta inhabilitado
        if(!usuario.status){
            return res.status(401).json({
                msg: 'El usuario esta bloqueado. Hable con el administrador.'
            });
        }

        // Si el usuario existe, esta habilitado y no tenia cuenta de google, hago un update
        if(usuario.status) {
            usuario.google = true;
            await usuario.save();
        }

        // Generar JWT
        const token = await generarJWT(usuario.id)

        return res.status(200).json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

    
}

module.exports = {
    login,
    googleSignIn,
}