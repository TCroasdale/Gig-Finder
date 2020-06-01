let searchController = require('../controllers/SearchController')

module.exports = (router, routeURL) => {
  /* QnD function for fetching data. */
  router.get(routeURL + '/', searchController.search)

  router.get(routeURL + '/getarea', searchController.locationSearch)
}
