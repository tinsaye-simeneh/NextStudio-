const express = require('express')
const videoController = require('../Controllers/VideoController')

const { protect } = require('../Middleware/authMiddleware')

const router = express.Router()

router
    .route('/')
    .post(protect, videoController.CreateVideo)
    .get(videoController.getBannerVideo)
    .patch(protect,videoController.UpdateBannerVideo)

module.exports = router