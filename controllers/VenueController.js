var Venue = require('../models/venue')

module.exports.createVenue = function (req, res) {
    var venue = new Venue({
        name: req.body.name,
        location: {
            long: req.body.location.long,
            lat: req.body.location.lat,
        }
    })
    

    venue.save((err, result) => {
        if (err) {
            res.json({ "success": false, "error": err })
        } else {
            res.json({"success": true, "result": result})
        }
    })    

}

module.exports.viewVenue = function (req, res) {
    res.send("NOT YET IMPLEMENTED")
}