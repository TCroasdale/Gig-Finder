let UsersController = require('../controllers/UserController')

module.exports = (router, routeURL, passport) => {
  /* GET users listing. */
  router.get(routeURL + '/', function (req, res, next) {
    res.json({ success: false, error: 'NOT YET IMPLEMENTED' })
  })

  router.post(routeURL + '/login', passport.authenticate('local'), UsersController.loginUser)

  router.post(routeURL + '/signup', UsersController.createUser)
}
