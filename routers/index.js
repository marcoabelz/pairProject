const express = require('express')
const router = express.Router()
const Controller =require('../controllers/controller')

// define the home page route
router.get('/', Controller.landingPage)

router.get('/products', Controller.showAllProduct)

module.exports = router