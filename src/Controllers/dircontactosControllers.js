const directorioContactos = require('../Models/dircontactosModels')
const express = require('express')

const getContacts = async(req, res) => {
    const contactos = await directorioContactos.find()
    res.json(contactos)
}

const getContactById = async(req, res) => {
    const contacto = await directorioContactos.findById(req.params.id)
    res.status(200).json(contacto)
}

const createContact = async(req, res) => {
    const nuevoContacto = new directorioContactos(req.body)
    await nuevoContacto.save()
    res.status(201).json(nuevoContacto)
}

const updateContact = async(req, res) => {
    const contacto = await directorioContactos.findByIdAndUpdate( 
        req.params.id,
        req.body, 
        {new: true}
    )
    res.json(contacto)
}

const deleteContact = async(req, res) => {
    const contacto = await directorioContactos.findByIdAndDelete(
        req.params.id
    ); 
    res.send({mensaje: `El contacto con el id ${req.params.id} ha sido eliminado`})
}

module.exports = {
    getContacts, 
    getContactById, 
    createContact, 
    updateContact, 
    deleteContact
}