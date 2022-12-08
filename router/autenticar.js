const { Router } = require("express");
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const {generarJWT} = require('../helpers/jwt');

const router = Router();

router.post(
  "/",
  [
    check("email", "email.required").isEmail(),
    check("passw", "passw.required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      //validamos los campos
      const validator = validationResult(req);
      if (!validator.isEmpty()) {
        //si algun campo está´vació, entonces llamamos el metodo array que guarda los mensajes de validacion
        return res.status(400).json({ mensaje: validator.array() });
      }
      //preguntamos si hay un usuario con el email 
      const usuario = await Usuario.findOne({ email: req.body.email });
      if (!usuario) {
        return res.status(400).json({ mensaje: "Usuario no existe" });
      }
      //si el usuario existe comparamos las contraseñas 
      const passwEsIgual = bcrypt.compareSync(req.body.passw, usuario.passw);
      if (!passwEsIgual) {
        return res.status(400).json({ mensaje: "Usuario no existe" });
      }
      //generamos el token
      const token = generarJWT(usuario);

      //devolvemos la informacion del usuario y el token que generamos 
      res.json({
        _id: usuario._id,
        nombre: usuario.name,
        rol: usuario.rol,
        email: usuario.email,
        status: usuario.status,
        access_token: token
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ mensaje: "Error inerno del servidor" });
    }
  }
);

module.exports = router;
