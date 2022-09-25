const {Schema, model} = require('mongoose')

const ComputerStatusSchema = Schema({
name: {type: String, required: true},
status: {type: String, required: true, enum: ['Activo', 'Inactivo']},
creationDate: {type: Date, required: true},
updateDate: {type: Date, required: true}
})

module.exports = model('EstadoEquipo', ComputerStatusSchema)