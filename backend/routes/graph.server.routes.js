
var graph = require('../controllers/graph.server.controller.js'), 
express = require('express'), //refers to Express the middleware helper for Node.js
router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

router.route('/coord')
    .get(graph.coord)
    .post(graph.createCoord)

module.exports = router;
