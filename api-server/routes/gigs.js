var express = require('express')
var router = express.Router()
var gigController = require('../controllers/GigController')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ success: false, error: 'NOT YET IMPLEMENTED' })
})

router.post('/create', gigController.createGig)

router.get('/get/:id', gigController.viewGig)

module.exports = router
