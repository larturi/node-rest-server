const { response } = require('express');

const esAdminRole = (req, res = response, next) => {

    if (!req.usuarioAutenticado) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar token previamente'
        });
    }

    const { role, name } = req.usuarioAutenticado;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no es Administrador`
        });
    }

    next();
}

module.exports = {
    esAdminRole
}