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

const hasRole = (...roles) => {

    return (req, res = response, next) => {

        if (!req.usuarioAutenticado) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar token previamente'
            });
        }

        if (!roles.includes(req.usuarioAutenticado.role)) {
            return res.status(401).json({
                msg: `Esta funcionalidad solo esta permitida para los roles: ${roles.join(', ')}`
            });
        }

        next();
    }

}

module.exports = {
    esAdminRole,
    hasRole,
}