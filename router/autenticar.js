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
      const validator = validationResult(req);
      if (!validator.isEmpty()) {
        return res.status(400).json({ mensaje: validator.array() });
      }


      const usuario = await Usuario.findOne({ email: req.body.email });
      if (!usuario) {
        return res.status(400).json({ mensaje: "Usuario no existe" });
      }
      //validamos que la contraseña sea igaul
      const passwEsIgual = bcrypt.compareSync(req.body.passw, usuario.passw);
      if (!passwEsIgual) {
        return res.status(400).json({ mensaje: "Usuario no existe" });
      }
      //generamos el token
      const token = generarJWT(usuario);

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
