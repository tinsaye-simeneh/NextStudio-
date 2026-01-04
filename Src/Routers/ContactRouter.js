const express = require('express')

const contactController = require('../Controllers/ContactController')
const contactFormController = require('../Controllers/ContactFormController')


const { protect } = require('../Middleware/authMiddleware')

const router = express.Router()

router
    .route('/')
    .post(protect,contactController.CreateContact)
    .get(contactController.getContact)
    .patch(protect,contactController.updateContact)

router
    .route('/send-mail')
    .post(contactFormController.sendMails)

    router.post('/apply', contactFormController.sendApplicationEmail);

router
    .route('/mme/send-mail')
    .post(contactFormController.MMEsendMails)

module.exports = router