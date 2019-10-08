var express = require('express')
var router = express.Router()
var venuesController = require('../controllers/VenueController')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("NOT YET IMPLEMENTED")
})

router.get('/create', venuesController.createVenue)

router.get('/view', venuesController.viewVenue)

module.exports = router
