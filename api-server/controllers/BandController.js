var Band = require('../models/Band')

module.exports.createBand = function (req, res) {
  res.send('NOT YET IMPLEMENTED')
}

module.exports.viewBand = function (req, res) {
  Band.findById(req.params.id, (err, band) => {
    if (err) {
      res.json({ success: false, error: err })
    } else {
      res.json({ success: true, band: band })
    }
  })
}
