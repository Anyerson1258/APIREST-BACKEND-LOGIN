const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido']
    },
    email: {
        type: String,
        required: [true, 'email requerido'],
        unique: true
       
    },
    password:{
        type: String,
        required:true
    },
    rol:{
        type: String,
        required:true,
        enum:['ADMIN','DOCENTE']
    },
    estado: {
        type: String,
        required: true,
        enum:['ACTIVO','INACTIVO']
    },
    fechaCreacion:{
        type: Date,
        default: new Date()
    },
    fechaActualizacion:{
        type: Date,
        default: new Date()
    },
})

module.exports = model('Usuario', UsuarioSchema)