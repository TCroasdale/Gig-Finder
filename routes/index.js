var express = require('express')
var router = express.Router()

var Venue = require('../models/venue')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index')
})

/* QnD function for fetching data. */
router.get('/api/fetch-all', function (req, res) {
  Venue.find((err, data) => {
    if (err) {
      res.send({ success: false, error: err })
    } else {
      res.send({ success: true, results: { venues: data }})
    }
  })
})
module.exports = router
