const jwt = require('jsonwebtoken');

//funcion que recibe tres parametros, req, res y next para informar que se siga con la ejecucion 
const validarJWT = (req, res, next) =>{
    const token = req.header('Authorization');
    //si no hay token, entonces no está autorizado
    if(!token){
        return res.status(401).json({mensaje: 'Error, no está autorizado' });
    }

    try{
        //verificamos que el token esté asociado a la aplicación
        const payload = jwt.verify(token, '12345');
        req.payload = payload;//adicionamos la data al req del usuario autenticado
        next();
    }catch(e){
        console.log(e);
        return res.status(401).json({mensaje: 'Error, no está autorizado' });
    }
}

module.exports = {
    validarJWT
}