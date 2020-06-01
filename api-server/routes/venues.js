var venuesController = require('../controllers/VenueController')

module.exports = (router, routeURL) => {
  /* GET home page. */
  router.get(routeURL + '/', function (req, res, next) {
    res.send('NOT YET IMPLEMENTED')
  })

  router.post(routeURL + '/create', venuesController.createVenue)

  router.get(routeURL + '/get/:id', venuesController.viewVenue)
}
