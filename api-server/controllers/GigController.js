var Gig = require('../models/Gig')
var Venue = require('../models/Venue')

module.exports.createGig = function (req, res) {
  var gig = new Gig({
    date: req.body.date,
    venue: req.body.venue,
    lineup: req.body.lineup
  })

  gig.save((err, result) => {
    if (err) {
      res.json({ 'success': false, 'error': err })
    } else {
      res.json({ 'success': true, 'result': result })
    }
  })
}

module.exports.viewGig = function (req, res) {
  let id = req.params.id
  Gig.findById(id, (err, gig) => {
    if (err) {
      res.json({ success: false, error: err })
    } else {
      Venue.findById(gig.venue, (err, venue) => {
        if (err) {
          res.json({ success: false, error: err })
        } else {
          gig.venue = venue
          res.json({ success: true, gig: gig })
        }
      })
    }
  })
}
