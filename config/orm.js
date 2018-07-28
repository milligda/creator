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
    },
    add: function(table, obj, cb) {
        var queryString = 'INSERT INTO ' + table + ' SET ?';

        connection.query(queryString, obj, function (err, result) {
            if (err) throw err;

            cb(result);
        });
    }
}


module.exports = orm;