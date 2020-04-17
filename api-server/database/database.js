const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/GigFinder'

mongoose.connect(url)

mongoose.Promise = global.Promise
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB Connection Error: '))

db.once('open', function () {
  console.log('Connected to database!')
})

module.exports = db
