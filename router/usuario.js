//En principio debemos inportar router de express
const { Router } = require("express");
const router = Router();
//importamos la clase de Usuario
const Usuario = require("../models/Usuario");
const { validateUser } = require("../helpers/validarUsuario");

//para crear nuesvos usuarios
router.post("/", async (req, res) => {
  //los datos los recuperamos a travees del req.body
  try {
    const validations = validateUser(req);
    if (validations.length > 0) {
      return res.status(400).send(validations);
    }

    console.log("Objeto recibido con exito", req.body);

    const exist = await Usuario.findOne({ email: req.body.email });
    console.log("Respuesta existe usuario", exist);
    if (exist) {
      return res.status(400).send("El email ya existe");
    }

    let user = new Usuario();
    user.name = req.body.name;
    user.email = req.body.email;
    user.status = req.body.status;
    user.creationDate = new Date();
    user.updateDate = new Date();

    user = await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Ocurrión un error");
  }
});

//Req = todos los datos que le enviamos al recurso
router.get("/", async (req, res) => {
  try {
    const users = await Usuario.find();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Ocurrió un error");
  }
});

router.get("/:usuarioId", async (req, res) => {
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

router.put("/:usuarioId", async function (req, res) {
  try {
    const validations = validateUser(req);
    if (validations.length > 0) {
      return res.status(400).send(validations);
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

    user.email = req.body.email;
    user.name = req.body.name;
    user.status = req.body.status;
    user.updateDate = new Date();

    user = await user.save(); //
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Ocurrio un error");
  }
});

router.delete("/:usuarioId", async (req, res) => {
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
