const { Router } = require("express");
const router = Router();
const Marca = require("../models/Marca");
const {validateBrand} = require('../helpers/validarMarca')

router.get("/", async (req, res) => {
  try {
    const brands = await Marca.find();
    res.send(brands);
    console.log("Método  get ejecutado correctamente");
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error");
  }
});

router.get("/:marcaId", async (req, res) => {
  try {
    const marca = await Marca.findById(req.params.marcaId);
    if (!marca) {
      return res.status(404).send("Marca no existe");
    }
    res.send(marca);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error al listar marcas");
  }
});

router.post("/", async (req, res) => {
  try {
    const validations = validateBrand(req);
    if (validations.length > 0) {
      return res.status(400).send(validations);
    }


    console.log("Recibiendo objeto con exito", req.body);
    //Datos a guardar en la base de datos
    let brand = new Marca();
    brand.name = req.body.name;
    brand.status = req.body.status;
    brand.creationDate = new Date();
    brand.updateDate = new Date();
    //await para esperar que se haga la consulta
    brand = await brand.save();
    //enviamos la marca creada
    res.send(brand);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error");
  }
});
router.put("/:marcaId", async (req, res) => {
  try {
    const validations = validateBrand(req);
    if (validations.length > 0) {
      return res.status(400).send(validations);
    }

    console.log("Objeto recibido", req.body, req.params); //
    let brand = await Marca.findById(req.params.marcaId);

    const existBrand = await Marca.findOne(brand._id);
    console.log("Marca: ", existBrand);
    if (!existBrand) {
      return res.status(400).send("La marca no existe");
    }

    brand.name = req.body.name;
    brand.status = req.body.status;
    brand.updateDate = new Date();

    brand = await brand.save(); //
    res.send(brand);
    console.log("Marca actualizada con exito");
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error");
  }
});

router.delete("/:marcaId", async (req, res) => {
  try {
    //primero debemos buscar el id de marca
    let brand = await Marca.findById(req.params.marcaId);
    //Validar si existe
    if (!brand) {
      return res.status(400).send("La marca no existe");
    }
     const existBrand = await Marca.findOne(brand);
    console.log(existBrand);

    if (existBrand) {
      brand = await brand.remove();
      return res.send("Marca eliminado con exito");
    }
    res.send(brand);
    console.log("Marca eliminada con exito");
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocurrió un error");
  }
});

module.exports = router;