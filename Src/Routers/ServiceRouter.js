const express = require('express')
const serviceController = require('../Controllers/ServiceController')

const { protect } = require('../Middleware/authMiddleware')

const router = express.Router()

router
    .route('/')
    .post(protect,serviceController.CreateServices)
    .get(serviceController.getAllServices)

router
    .route('/:id')
    .patch(protect,serviceController.updateService)

module.exports = router