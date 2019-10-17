var express = require('express')
var router = express.Router()
var venuesController = require('../controllers/VenueController')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('NOT YET IMPLEMENTED')
})

router.post('/create', venuesController.createVenue)

router.get('/get/:id', venuesController.viewVenue)

module.exports = router
