var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.ObjectId

var Gig = new Schema({
  lineup: [{type: ObjectId, ref: 'Band'}],
  venue: {type: ObjectId, ref: "Venue"},
  startDate: { type: Date, required: true },
})

module.exports = mongoose.model('Gig', Gig)
