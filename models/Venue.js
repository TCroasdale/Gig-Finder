var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Venue = new Schema({
  name: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true }
  }
})

module.exports = mongoose.model('Venue', Venue)
