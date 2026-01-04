const express = require('express')
const adminController = require('../Controllers/AdminController')

const { protect } = require('../Middleware/authMiddleware')

const router = express.Router()

router.post('/signup',adminController.singup)
router.post('/login',adminController.login)
router.get('/user', protect, adminController.getAdmin )
router.patch('/changepassword',protect, adminController.updatePassword)

module.exports = router