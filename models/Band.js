var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.ObjectId

var Band = new Schema({
  name: { type: String, required: true }
})

module.exports = mongoose.model('Band', Band)
