var Venue = require('../models/Venue')
var Band = require('../models/Band')

module.exports.search = function (req, res) {
  let searchType = req.query.type
  let query = req.query.query

  if (searchType === 'Venue') {
    Venue.find({ name: { $regex: '.*' + query + '.*' } }, (err, venues) => {
      if (err) {
        res.json({ 'success': false, 'error': err })
      } else {
        res.json({ 'success': true, 'results': { 'venues': venues } })
      }
    })
  } else if (searchType === 'Artist') {
    Band.find({ name: { $regex: '.*' + query + '.*' } }, (err, artists) => {
      if (err) {
        res.json({ 'success': false, 'error': err })
      } else {
        res.json({ 'success': true, 'results': { 'artists': artists } })
      }
    })
  } else {
    res.json({ 'success': false, 'error': 'Not Yet Implemented' })
  }
}

module.exports.locationSearch = function (req, res) {
  let lat = req.query.lat
  let lng = req.query.lng
  let maxDist = req.query.r

  Venue.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        $minDistance: 0,
        $maxDistance: maxDist
      }
    }
  }, (err, venues) => {
    if (err) {
      res.json({ 'success': false, 'error': err })
    } else {
      res.json({ 'success': true, 'results': { 'venues': venues } })
    }
  })
}
