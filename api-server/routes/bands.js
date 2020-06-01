var bandController = require('../controllers/BandController')

module.exports = (router, routeURL) => {
  /* GET home page. */
  router.get(routeURL + '/', function (req, res, next) {
    res.send('NOT YET IMPLEMENTED')
  })

  router.get(routeURL + '/create', bandController.createBand)

  router.get(routeURL + '/view', bandController.viewBand)
}
