//importamos mongoose y de ese mismo obtenemos Schema y model
const { Schema, model } = require("mongoose");
// en la constante decraramos los diferentes atrubutos del modelo
const BrandSchema = Schema({
  name: { type: String, required: true },
  status: { type: String, required: true, enum: ["Activo", "Inactivo"] },
  creationDate: { type: Date, required: true },
  //Fecha de actualización
  updateDate: { type: Date, required: true },
});

module.exports = model("Marca", BrandSchema);