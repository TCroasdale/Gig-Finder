var User = require('../models/user')

module.exports.createUser = function (req, res) {
  res.json({ success: false, error: 'NOT YET IMPLEMENTED' })
}

module.exports.viewUser = function (req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.json({ success: false, error: err })
    } else {
      res.json({ success: true, user: user })
    }
  })
}
