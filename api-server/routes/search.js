var express = require('express')
var router = express.Router()

let searchController = require('../controllers/SearchController')

/* QnD function for fetching data. */
router.get('/', searchController.search)

router.get('/getarea', searchController.locationSearch)

module.exports = router
