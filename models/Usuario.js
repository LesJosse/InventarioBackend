//Inicialmente importamos dos funciones, schema y model de mongoose

const { Schema, model } = require("mongoose");
//almacenamos el esquema en la constante y posteriormente lo definimos
const UserSchema = Schema({
  //nombre requerido
  name: { type: String, required: true },
  //Email requerido y unico
  email: { type: String, require: true, unique: true },
  passw: {type: String, required: true},
  rol: {type: String, required: true, enum: ["Admin", "Docente"]},
  //estado requerido enumerable
  status: { type: String, required: true, enum: ["Activo", "Inactivo"] },
  //fecha de creación
  creationDate: { type: Date, required: true },
  //Fecha de actualización
  updateDate: { type: Date, required: true },
});

//finalmente creamos el modelo y lo exportamos asociando user con el schema
module.exports = model("Usuario", UserSchema);