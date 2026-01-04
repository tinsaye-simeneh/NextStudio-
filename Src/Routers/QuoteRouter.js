const express = require('express')
const quoteController = require('../Controllers/QuoteController')

const { protect } = require('../Middleware/authMiddleware')

const router = express.Router()

router
    .route('/')
    .post(protect,quoteController.CreateQuote)
    .get(quoteController.getQuote)
    .patch(protect,quoteController.updateQuote)

module.exports = router