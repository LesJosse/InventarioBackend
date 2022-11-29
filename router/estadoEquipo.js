const { Router } = require("express");
const router = Router();
const EstadoEquipo = require("../models/EstadoEquipo");
const { validateComputerStatus } = require('../helpers/validarEstadoEquipo');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarRolAdmin} = require('../middlewares/validar-rol');
//metodo get
router.get("/", [validarJWT], async (req, res) => {
  try {
    const computerStatus = await EstadoEquipo.find();
    res.send(computerStatus);
    console.log("Método  get ejecutado correctamente");
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error");
  }
});

router.get("/:estadoEquipoId", [validarJWT], async (req, res) => {
  try {
    const estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
    if (!estadoEquipo) {
      return res.status(404).send("El estado de equipo no existe");
    }
    res.send(estadoEquipo);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error al listar los estados");
  }
});

//req hace referencia a la petición
router.post("/", [validarJWT, validarRolAdmin], async (req, res) => {
  try {
    const validations = validateComputerStatus(req);
    if (validations.length > 0) {
      return res.status(400).send(validations);
    }

    console.log("Recibiendo objeto con exito", req.body);
    //Datos a guardar en la base de datos
    let computerStatus = new EstadoEquipo();
    computerStatus.name = req.body.name;
    computerStatus.status = req.body.status;
    computerStatus.creationDate = new Date();
    computerStatus.updateDate = new Date();
    //await para esperar que se haga la consulta
    computerStatus = await computerStatus.save();
    //enviamos la marca creada
    res.send(computerStatus);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error");
  }
});
//res hace referencia a la respuesta
router.put("/:estadoEquipoId", [validarJWT, validarRolAdmin], async (req, res) => {
  try {
    const validations = validateComputerStatus(req);
    if (validations.length > 0) {
      return res.status(400).send(validations);
    }

    let computerStatus = await EstadoEquipo.findById(
      req.params.estadoEquipoId
    );
    if (!computerStatus) {
      return res.status(400).send("No existe el estado");
    }
    computerStatus.name = req.body.name;
    computerStatus.status = req.body.status;
    computerStatus.updateDate = new Date();
    computerStatus = await computerStatus.save();
    res.send(computerStatus);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error");
  }
});

router.delete("/:estadoEquipoId", [validarJWT, validarRolAdmin], async (req, res) => {
  try {
    //primero debemos buscar el id del estadoEquipo
    let computerStatus = await EstadoEquipo.findById(req.params.estadoEquipoId);
    //Validar si existe
    if (!computerStatus) {
      return res.status(400).send("El estado no existe");
    }
    console.log(computerStatus);

    if (computerStatus) {
      computerStatus = await computerStatus.remove();
      return res.send("Estado eliminado con exito");
    }
    res.send(computerStatus);
    console.log("Estado eliminada con exito");
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error");
  }
});
//Finalmente exportamos
module.exports = router;