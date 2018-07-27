// ==============================================================================
// Required files
// ==============================================================================

var connection = require('../config/connection.js');

// ==============================================================================
// orm Object
// ==============================================================================

var orm = {

    getAll: function(table, cb) {

        var queryString = 'SELECT * FROM ' + table + ';';

        connection.query(queryString, function (err, result) {
            if (err) throw err;

            cb(result);
        });
    }
}


module.exports = orm;