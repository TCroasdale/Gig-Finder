var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var passport = require('passport')
var LocalStrategy = require('passport-local')
var bcrypt = require('bcrypt')

const User = require('./models/User')

passport.use(new LocalStrategy(
  function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' })
      }
      bcrypt.compare(password, user.passwordHash, (err, result) => {
        if (err) {
          return done(err)
        } else {
          if (result === true) {
            return done(null, user._id)
          } else {
            return done(null, false, { message: 'Incorrect password.' })
          }
        }
      })
    })
  }
))

var subdomain = require('express-subdomain')

// var indexRouter = require('./routes/index')
var mainRouter = express.Router()
require('./routes/users')(mainRouter, '/users', passport)
require('./routes/gigs')(mainRouter, '/gigs')
require('./routes/venues')(mainRouter, '/venues')
require('./routes/bands')(mainRouter, '/bands')
require('./routes/search')(mainRouter, '/search')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// app.use('/', indexRouter)
// mainRouter.use('/users', usersRouter)
// mainRouter.use('/gigs', gigsRouter)
// mainRouter.use('/venues', venuesRouter)
// mainRouter.use('/bands', bandsRouter)
// mainRouter.use('/search', searchRouter)

mainRouter.get('/', (req, res) => {
  res.json({ message: 'Welcome to the GigFinder API' })
})

app.use('/', mainRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({ success: false, error: err.status })
})

app.use(subdomain('api', mainRouter))

module.exports = app
