//En principio debemos inportar router de express
const { Router } = require("express");
const { validationResult, check } = require("express-validator");
const router = Router();
//importamos la clase de Usuario
const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');
const {validarJWT} = require('../middlewares/validar-jwt');
const { validarRolAdmin } = require('../middlewares/validar-rol');


//para crear nuesvos usuarios
router.post(
  "/",
  [
    check("name", "name.error").not().isEmpty(),
    check("email", "emal.error").isEmail(),
    check("passw", "passw.error").not().isEmpty(),
    check("rol", "rol.error").isIn(["Admin", "Docente"]),
    check("status", "status.error").isIn(["Activo", "Inactivo"]),
    validarJWT,
    validarRolAdmin
  ],
  async (req, res) => {
    //los datos los recuperamos a travees del req.body
    try {
      const validations = validationResult(req);  
      if (!validations.isEmpty()) {
        return res.status(400).json({ mensaje: validations.array() });//Si hay errores
      }

      console.log("Objeto recibido con exito", req.body);
      //Validar el correo
      const exist = await Usuario.findOne({ email: req.body.email }); //buscamos el email en la bd por coincidencias
      console.log("Respuesta existe usuario", exist);
      if (exist) {
        return res.status(400).send("El email ya existe");
      }
      //seteamos los campos que nos llegan en el cuerpo de la petición 
      let user = new Usuario();
      user.name = req.body.name;
      user.email = req.body.email;
      
      const salt = bcrypt.genSaltSync();//para generar un hash único 
      const pass = bcrypt.hashSync(req.body.passw, salt); // generamos hash aleatorio
      user.passw = pass;
      
      user.rol = req.body.rol;
      user.status = req.body.status;
      user.creationDate = new Date();
      user.updateDate = new Date();

      user = await user.save(); //async = para que el llamado ocurra linea a linea y espere a que se haga la petición
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }
);

//Req = todos los datos que le enviamos al recurso
router.get("/", [validarJWT],async (req, res) => {
  try {
    const users = await Usuario.find();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ mensaje: "Error interno en el servidor" });
  }
});

router.get("/:usuarioId", [validarJWT], async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId);
    if (!usuario) {
      return res.status(404).send("Usuario no existe");
    }
    res.send(usuario);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error al listar usuarios");
  }
});

router.put("/:usuarioId", [
  check("name", "name.error").not().isEmpty(),
    check("email", "emal.error").isEmail(),
    check("passw", "passw.error").not().isEmpty(),
    check("rol", "name.error").isIn(["Admin", "Docente"]),
    check("status", "status.error").isIn(["Activo", "Inactivo"]),
    validarJWT,
    validarRolAdmin
], async function (req, res) {
  try {
    const validations = validationResult(req);  
    if (!validations.isEmpty()) {
      return res.status(400).json({ mensaje: validations.array() });//Si hay errores
    }

    console.log("Objeto recibido", req.body, req.params); //
    let user = await Usuario.findById(req.params.usuarioId);

    if (!user) {
      return res.status(400).send("Usuario no existe");
    }
    const existUser = await Usuario.findOne({
      email: req.body.email,
      _id: { $ne: user._id },
    });

    console.log("Respuesta existe usuario", existUser);

    if (existUser) {
      return res.status(400).send("Email ya existe");
    }

    user.name = req.body.name;
    user.email = req.body.email;
    
    const salt = bcrypt.genSaltSync();//para generar un hash 
    const pass = bcrypt.hashSync(req.body.passw, salt);
    user.passw = pass;
    
    user.rol = req.body.rol;
    user.status = req.body.status;
    user.updateDate = new Date();

    user = await user.save(); //
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Ocurrio un error");
  }
});

router.delete("/:usuarioId", [validarJWT, validarRolAdmin],async (req, res) => {
  try {
    //obtener usuario por id
    let user = await Usuario.findById(req.params.usuarioId);
    //Validar si existe
    if (!user) {
      return res.status(400).send("El usuario no existe");
    }

    const existUser = await Usuario.findOne(user._id);
    console.log(existUser);

    if (existUser) {
      user = await user.remove();
      return res.send("Usuario eliminado con exito");
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Ocurrió un error");
  }
});
//Finalmente exportamos router que tine todas las rutas asociadas
module.exports = router;
