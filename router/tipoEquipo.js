const { Router } = require("express");
const TipoEquipo = require("../models/TipoEquipo");
const {validateComputerType} = require('../helpers/validarTipoEquipo')
const router = Router();

router.get("/", async (req, res) => {
  try {
    const computerType = await TipoEquipo.find();
    res.send(computerType);
    console.log("Listando con exito: ", computerType);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error");
  }
});

router.get("/:tipoEquipo", async (req, res) => {
  try {
    const tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipo);
    if (!tipoEquipo) {
      return res.status(404).send("TipoEquipo no existe");
    }
    res.send(tipoEquipo);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error al listar tipos");
  }
});

router.post("/", async (req, res) => {
  try {
    const validations = validateComputerType(req);
    if (validations.length > 0) {
      return res.status(400).send(validations);
    }

    console.log("Recibiendo objeto tipoEquipo con exito", req.body);

    let computerType = new TipoEquipo();
    computerType.name = req.body.name;
    computerType.status = req.body.status;
    computerType.creationDate = new Date();
    computerType.updateDate = new Date();

    computerType = await computerType.save();
    res.send(computerType);
    console.log("Tipo de equipo creado con exito: ", computerType);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error");
  }
});
router.put("/:tipoEquipoId", async (req, res) => {
  try {
    const validations = validateComputerType(req);
    if (validations.length > 0) {
      return res.status(400).send(validations);
    }

    let computerType = await TipoEquipo.findById(req.params.tipoEquipoId);
    if (!computerType) {
      return res.status(400).send("No existe el tipo de equipo");
    }

    computerType.name = req.body.name;
    computerType.status = req.body.status;
    computerType.updateDate = new Date();

    computerType = await computerType.save();
    res.send(computerType);
    console.log("Tipo de equipo actualizado con exito: ", computerType);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error");
  }
});

router.delete("/:tipoEquipoId", async (req, res) => {
  try {
    //primero debemos buscar el id del estadoEquipo
    let computerType = await TipoEquipo.findById(req.params.tipoEquipoId);
    //Validar si existe
    if (!computerType) {
      return res.status(400).send("El tipo no existe");
    }
    console.log(computerType);

    computerType = await computerType.remove();
    res.send("Tipo equipo eliminado con exito");
    console.log("Estado eliminada con exito", computerType);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error");
  }
});

module.exports = router;