const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-jwt-token');

    if (!token) {
        return res.status(401).send({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        // Validar que el usuario exista
        const usuarioAutenticado = await User.findById(uid);

        if (!usuarioAutenticado) {
            return res.status(401).send({
                msg: 'Usuario inexistente'
            });
        }

        // Validar que el usuario esta habilitado
        if (!usuarioAutenticado.status) {
            return res.status(401).send({
                msg: 'Token no valido. El usuario no esta habilitado'
            });
        }

        req.usuarioAutenticado = usuarioAutenticado;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT,
}