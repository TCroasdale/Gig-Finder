module.exports = (router, routeURL) => {
  /* GET users listing. */
  router.get(routeURL + '/', function (req, res, next) {
    res.json({ success: false, error: 'NOT YET IMPLEMENTED' })
  })
}
