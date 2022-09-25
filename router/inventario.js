const { Router } = require("express");
const Inventario = require("../models/Inventario");
const { validateInventory } = require("../helpers/validar");
const { findById } = require("../models/Inventario");
const router = Router();

router.get("/", async (req, res) => {
  try {
    //populate recibe un arreglo
    const inventory = await Inventario.find().populate([
      {
        path: "userCharge",
        select: "name email status",
      },
      {
        path: "brand",
        select: "name status",
      },
      {
        path: "computerStatus",
        select: "name status",
      },
      {
        path: "computerType",
        select: "name status",
      },
    ]);
    res.send(inventory);
    console.log("Listando inventario: ", inventory);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error");
  }
});
router.post("/", async (req, res) => {
  try {
    const validations = validateInventory(req);
    if (validations.length > 0) {
      return res.status(400).send(validations);
    }
    console.log("Recibiendo objeto tipoEquipo con exito", req.body);
    //Primero se verifica si existe un serial
    const exitsInventorySerial = await Inventario.findOne({
      serial: req.body.serial,
    });
    if (exitsInventorySerial) {
      return res.status(400).send("El serial existe para otro equipo");
    }

    let inventory = new Inventario();
    inventory.serial = req.body.serial;
    inventory.model = req.body.model;
    inventory.description = req.body.description;
    inventory.photoComputer = req.body.photoComputer;
    inventory.color = req.body.color;
    inventory.datePurchase = req.body.datePurchase;
    inventory.price = req.body.price;
    inventory.userCharge = req.body.userCharge._id;
    inventory.brand = req.body.brand._id;
    inventory.computerStatus = req.body.computerStatus._id;
    inventory.computerType = req.body.computerType._id;
    inventory.creationDate = new Date();
    inventory.updateDate = new Date();

    inventory = await inventory.save();
    res.send(inventory);
    console.log("Creando nuevo inventario: ", inventory);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error");
  }
});
router.put("/:inventarioId", async (req, res) => {
  try {
    const validations = validateInventory(req);
    if (validations.length > 0) {
      return res.status(400).send(validations);
    }

    let inventory = await Inventario.findById(req.params.inventarioId);
    if (!inventory) {
      return res.status(400).send("El inventario no existe");
    }
    const exitsInventorySerial = await Inventario.findOne({
      serial: req.body.serial,
      _id: { $ne: inventory._id },
    });
    if (exitsInventorySerial) {
      return res.status(400).send("El serial existe para otro equipo");
    }
    inventory.serial = req.body.serial;
    inventory.model = req.body.model;
    inventory.description = req.body.description;
    inventory.photoComputer = req.body.photoComputer;
    inventory.color = req.body.color;
    inventory.datePurchase = req.body.datePurchase;
    inventory.price = req.body.price;
    inventory.userCharge = req.body.userCharge._id;
    inventory.brand = req.body.brand._id;
    inventory.computerStatus = req.body.computerStatus._id;
    inventory.computerType = req.body.computerType._id;
    inventory.updateDate = new Date();

    inventory = await inventory.save();
    res.send(inventory);
    console.log("Tipo de equipo actualizado con exito: ", inventory);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error");
  }
});

router.delete("/:inventarioId", async (req, res) => {
  try {
    //obtener usuario por id
    let inventory = await Inventario.findById(req.params.inventarioId);
    //Validar si existe
    if (!inventory) {
      return res.status(400).send("El inventario no existe");
    }
    console.log(inventory);

    inventory = await inventory.remove();
    res.send("El inventario se ha eliminado con exito");

    res.send(inventory);
  } catch (err) {
    console.log(err);
    res.status(500).send("Ocurrió un error");
  }
});

router.get("/:inventarioId", async (req, res) => {
  try {
    const inventario = await Inventario.findById(req.params.inventarioId);
    if (!inventario) {
      return res.status(404).send("Inventario no existe");
    }
    res.send(inventario);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error al listar inventarios");
  }
});

module.exports = router;
