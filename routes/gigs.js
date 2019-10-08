var express = require('express')
var router = express.Router()
var gigController = require('../controllers/GigController')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("NOT YET IMPLEMENTED")
})

router.get('/create', gigController.createVenue)

router.get('/view', gigController.viewVenue)

module.exports = router
