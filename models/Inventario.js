const { Schema, model } = require("mongoose");
const EstadoEquipo = require("./EstadoEquipo");
const Marca = require("./Marca");
const TipoEquipo = require("./TipoEquipo");
const Usuario = require("./Usuario");

const InventorySchema = Schema({
    serial: { type: String, required: true, unique: true },
    model: { type: String, required: true, unique: true},
    description: { type: String, required: true },
    photoComputer: { type: String, required: true },
    color: { type: String, required: true },
    datePurchase: { type: String, required: true },
    price: { type: Number, required: true },
    //de la foram referenciando documentos
    userCharge: { type: Schema.Types.ObjectId, ref: "Usuario", required: false },
    brand: { type: Schema.Types.ObjectId, ref: "Marca", required: true },
    computerStatus: {type: Schema.Types.ObjectId, ref: "EstadoEquipo", required: true,
    },
    computerType: {type: Schema.Types.ObjectId,ref: "TipoEquipo",required: true,},
    creationDate: { type: Date, required: true },
    updateDate: { type: Date, required: true },
});

module.exports = model("Inventario", InventorySchema);