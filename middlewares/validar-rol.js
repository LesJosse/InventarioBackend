
const validarRolAdmin = (req, res, next) =>{
    if(req.payload.rol !== 'Admin'){
        return res.status(401).json({mensaje: 'Error, no está autorizado'});
    }
    next();
}

module.exports = {
    validarRolAdmin
}