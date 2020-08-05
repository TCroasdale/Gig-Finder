const User = require('../models/User')
const bcrypt = require('bcrypt')

const saltRounds = 10

module.exports.createUser = function (req, res) {
  let email = req.body.email
  let textPassword = req.body.password
  let displayName = req.body.name
  let type = req.body.type

  bcrypt.getSalt(saltRounds, (err, salt) => {
    if (err) {
      res.json({ success: false, error: err })
    } else {
      bcrypt.hash(textPassword, salt, (err, hash) => {
        textPassword = ''
        if (err) {
          res.json({ success: false, error: err })
        } else {
          let user = new User({
            email: email,
            displayName: displayName,
            passwordHash: hash,
            passwordSalt: salt,
            accountType: type
          })

          user.save((err, user) => {
            if (err) {
              res.json({ success: false, error: err })
            } else {
              res.json({ success: true, user: user })
            }
          })
        }
      })
    }
  })
}

module.exports.loginUser = function (req, res, passport) {
  console.log(req.user)
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
