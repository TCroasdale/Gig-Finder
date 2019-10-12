var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.ObjectId

var Gig = new Schema({
  // lineup: [{type: ObjectId, ref: 'Band'}],
  lineup: [{type: String, requires: true}],
  venue: {type: ObjectId, ref: "Venue", required: true},
  date: { type: Date, required: true },
})

module.exports = mongoose.model('Gig', Gig)
