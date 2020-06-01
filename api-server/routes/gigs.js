var gigController = require('../controllers/GigController')
module.exports = (router, routeURL) => {
  /* GET home page. */
  router.get(routeURL + '/', function (req, res, next) {
    res.json({ success: false, error: 'NOT YET IMPLEMENTED' })
  })

  router.post(routeURL + '/create', gigController.createGig)

  router.get(routeURL + '/get/:id', gigController.viewGig)
}
