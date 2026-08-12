const express = require('express')
const controller = require('../Controllers/dircontactosControllers')
const router = express.Router()

router.get('/:id', controller.getContactById)
router.get('/', controller.getContacts)

router.post('/', controller.createContact)

router.delete('/:id', controller.deleteContact)

router.put('/:id', controller.updateContact)

module.exports = router