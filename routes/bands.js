var express = require('express')
var router = express.Router()
var bandController = require('../controllers/BandController')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("NOT YET IMPLEMENTED")
})

router.get('/create', bandController.createBand)

router.get('/view', bandController.viewBand)

module.exports = router
