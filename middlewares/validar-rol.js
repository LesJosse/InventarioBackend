
const validarRolAdmin = (req, res, next) =>{
    if(req.payload.rol !== 'Admin'){
        return res.status(401).json({mensaje: 'Error, no está autorizado'});
    }
    next();//si es Admin seguimos con la ejecucion 
}

module.exports = {
    validarRolAdmin
}