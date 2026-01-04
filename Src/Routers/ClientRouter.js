const express = require('express')
const clientController = require('../Controllers/ClientControllers')

const { protect } = require('../Middleware/authMiddleware')

const router = express.Router()

router
    .route('/')
    .post(protect,clientController.CreateClient)
    .get(clientController.getAllClients)

router
    .route('/:id')
    .delete(protect, clientController.deleteClient)


module.exports = router