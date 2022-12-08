const jwt = require('jsonwebtoken');


const generarJWT = (usuario) =>{
    const payload = {_id: usuario._id, nombre: usuario.name, email: usuario.email, rol: usuario.rol, estado: usuario.status};
   
    const  token = jwt.sign(payload, '12345', {expiresIn: '1h'});
    return token;
}

module.exports = {
    generarJWT
}