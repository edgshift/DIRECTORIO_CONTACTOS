const mongoose = require('mongoose')

const directorioContactosSchema = new mongoose.Schema(
{
    nombre: {
        type: String,
        required: true,
        trim: true
    },

    telefono: {
        type: String,
        required: true,
        trim: true,
        match: [/^[0-9+\-\s()]+$/, 'El teléfono contiene caracteres inválidos']
    },

    correo: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'El correo no es válido']
    },

    empresa: {
        type: String,
        required: true,
        trim: true
    },

    notas: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
}
)

const directorioContactos = mongoose.model(
    'Directorio_Contacto',
    directorioContactosSchema
)

module.exports = directorioContactos