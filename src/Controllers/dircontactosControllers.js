const directorioContactos = require('../Models/dircontactosModels')

const getContacts = async (req, res) => {
    try {
        const contactos = await directorioContactos.find()

        res.status(200).json(contactos)
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los contactos'
        })
    }
}

const getContactById = async (req, res) => {
    try {
        const contacto = await directorioContactos.findById(req.params.id)

        if (!contacto) {
            return res.status(404).json({
                mensaje: 'Contacto no encontrado'
            })
        }

        res.status(200).json(contacto)
    } catch (error) {
        res.status(400).json({
            mensaje: 'ID de contacto inválido'
        })
    }
}

const createContact = async (req, res) => {
    try {
        const nuevoContacto = new directorioContactos(req.body)

        await nuevoContacto.save()

        res.status(201).json(nuevoContacto)
    } catch (error) {
        res.status(400).json({
            mensaje: 'Datos del contacto inválidos',
            error: error.message
        })
    }
}

const updateContact = async (req, res) => {
    try {
        const contacto = await directorioContactos.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!contacto) {
            return res.status(404).json({
                mensaje: 'Contacto no encontrado'
            })
        }

        res.status(200).json(contacto)
    } catch (error) {
        res.status(400).json({
            mensaje: 'No se pudo actualizar el contacto',
            error: error.message
        })
    }
}

const deleteContact = async (req, res) => {
    try {
        const contacto = await directorioContactos.findByIdAndDelete(
            req.params.id
        )

        if (!contacto) {
            return res.status(404).json({
                mensaje: 'Contacto no encontrado'
            })
        }

        res.status(200).json({
            mensaje: `El contacto con el id ${req.params.id} ha sido eliminado`
        })
    } catch (error) {
        res.status(400).json({
            mensaje: 'ID de contacto inválido'
        })
    }
}

module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
}