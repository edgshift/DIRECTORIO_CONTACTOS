const mongoose = require('mongoose')

const directorioContactosSchema = new mongoose.Schema(
{
    nombre: {
        type: String,
        required: true
    }, 

    telefono: {
        type: String, 
        required: true
    },

    correo: {
        type: String, 
        required: true
    }, 

    empresa: {
        type: String, 
        required: true
    }, 

    notas:{
        type: String, 
        required: true
    }
}, {
    timestamps: true
}
)

const directorioContactos = new mongoose.model('Directorio_Contacto', directorioContactosSchema)
module.exports = directorioContactos