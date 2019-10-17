var Gig = require('../models/Gig')

module.exports.createGig = function (req, res) {
  console.log(req.body)
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
  res.send('NOT YET IMPLEMENTED')
}
