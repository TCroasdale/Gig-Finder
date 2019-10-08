var Venue = require('../models/venue')
var request = require('request')

module.exports.createVenue = function (req, res) {
    //Look up address
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.address +',&key=AIzaSyC37c4JE7erzz2DOdlyz3UsA2lU_LC0CJQ', 
    (err, resp, body) => {
        if (err) {
            throw err
        } else {
            let location = {
                long: JSON.parse(body).results[0].geometry.location.lng,
                lat: JSON.parse(body).results[0].geometry.location.lat
            }

            var venue = new Venue({
                name: req.body.name,
                location: location
            })
        
            venue.save((err, result) => {
                if (err) {
                    res.json({ "success": false, "error": err })
                } else {
                    res.json({"success": true, "result": result})
                }
            })    
        }
    })    
}

module.exports.viewVenue = function (req, res) {
    res.send("NOT YET IMPLEMENTED")
}