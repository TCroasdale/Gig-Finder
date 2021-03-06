var Venue = require('../models/Venue')
var Gig = require('../models/Gig')

module.exports.createVenue = function (req, res) {
  var venue = new Venue({
    name: req.body.name,
    location: {
      type: 'Point',
      coordinates: [
        req.body.location.lng,
        req.body.location.lat
      ]
    }
  })

  console.log(req.body)
  venue.save((err, result) => {
    if (err) {
      res.json({ success: false, error: err })
    } else {
      res.json({ success: true, result: result })
    }
  })
}

module.exports.viewVenue = function (req, res) {
  let id = req.params.id
  Venue.findById(id, (err, venue) => {
    if (err) {
      res.json({ success: false, error: err })
    } else {
      Gig.find({ venue: id }, (err, gigs) => {
        if (err) {
          res.json({ success: false, error: err })
        } else {
          res.json({ success: true, venue: venue, gigs: gigs })
        }
      })
    }
  })
}
