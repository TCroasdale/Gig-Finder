var mongoose = require('mongoose')
var Schema = mongoose.Schema
// var ObjectId = mongoose.ObjectId

var User = new Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  passwordSalt: { type: String, required: true },
  accountType: { type: String, enum: ['Promoter', 'Venue', 'Artist'], required: true },
  displayName: { type: String, maxlength: 32, unique: true },
  validatedAccount: { type: Boolean, default: false }
})

module.exports = mongoose.model('User', User)
