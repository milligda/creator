// ==============================================================================
// Set Dependencies & Required files
// ==============================================================================

var express = require('express');
var router = express.Router();

var world = require('../models/world.js');

// ===============================================================================
// Routing
// ===============================================================================


// route to the creator url
router.get('/creator', function (req, res) {

    // get all the worlds from the database (via the orm which is called in the world.js file) 
    world.getAll(function(data) {

        // create the display object for handlebars
        var displayObj = {
            worlds: data,
        };

        // console.log(displayObj);

        // create the home page using index.handlebars and pass in the displayObj with the world information
        res.render('creator', displayObj);
    });
});

// route to the creator url
router.get('/destroyer', function (req, res) {

    // get all the worlds from the database (via the orm which is called in the world.js file) 
    world.getAll(function(data) {

        // create the display object for handlebars
        var displayObj = {
            worlds: data,
        };

        // console.log(displayObj);

        // create the home page using index.handlebars and pass in the displayObj with the world information
        res.render('destroyer', displayObj);
    });
});

// route to the root url
router.get('/*', function (req, res) {

    // get all the worlds from the database (via the orm which is called in the world.js file) 
    world.getAll(function(data) {

        // create the display object for handlebars
        var displayObj = {
            worlds: data,
        };

        // console.log(displayObj);

        // create the home page using index.handlebars and pass in the displayObj with the world information
        res.render('creator', displayObj);
    });
});




module.exports = router;