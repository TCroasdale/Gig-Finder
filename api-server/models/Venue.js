var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Venue = new Schema({
  name: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
})

Venue.index({ location: '2dsphere' })

module.exports = mongoose.model('Venue', Venue)
