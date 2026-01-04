const express = require('express')
const aboutController =  require('../Controllers/AboutController')


const { protect } = require('../Middleware/authMiddleware')

const router = express.Router()

router
    .route('/')
    .post(protect, aboutController.CreateAbout)
    .get(aboutController.getAbout)
    .patch(protect, aboutController.updateAbout)

module.exports = router