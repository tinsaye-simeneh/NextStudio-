const express = require('express')
const cardController = require('../Controllers/CardController')
const { protect } = require('../Middleware/authMiddleware')

const router = express.Router()

router
    .route('/')
    .get(protect, cardController.getCards)
    .post(protect, cardController.createCard)

router.post('/:slug/verify-password', cardController.verifyPassword)
router.post('/:slug/inquiry', cardController.sendInquiry)

router.get('/:slug', cardController.getCardBySlug)

router
    .route('/:id')
    .patch(protect, cardController.updateCard)
    .delete(protect, cardController.deleteCard)

module.exports = router
