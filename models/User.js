var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.ObjectId

var User = new Schema({
  email: { type: String, required: true },
  associtedAct: { type: ObjectId, ref: "Band" }
})

module.exports = mongoose.model('Gig', Gig)
