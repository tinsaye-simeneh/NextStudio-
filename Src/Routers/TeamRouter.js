const express = require('express')
const teamController =  require('../Controllers/TeamController')


const { protect } = require('../Middleware/authMiddleware')

const router = express.Router()

router
    .route('/')
    .post(protect,teamController.createTeam)
    .get(teamController.getTeam)

router
    .route('/:id')
    .patch(protect,teamController.updateTeam)
    .delete(protect,teamController.deleteTeam)


module.exports = router