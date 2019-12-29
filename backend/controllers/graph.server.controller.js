/* Dependencies */
var GPS = require('../models/GPS'),
    helper = require('../helper/helper.route')

/* 
    Get the most recent GPS coordinate for the live map
*/
exports.coord = (req, res) =>
{
    helper.getMostRecent(GPS)
    .then((data) => {
        res.json({ success: true, data: data });
    })
    .catch((err) =>
    {
        res.json({ success: false, error: err });
    })
};

exports.createCoord = (req, res) =>
{
    var gps = new GPS({heading: req.body.heading, coordinates: {latitude: req.body.latitude, longitude: req.body.longitude}})
    gps.save()
    res.json({ success: true})
}
