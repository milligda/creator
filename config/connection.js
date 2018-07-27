// ==============================================================================
// Set Dependencies
// ==============================================================================

var mysql = require('mysql');

// ==============================================================================
// Establish Database Connection
// ==============================================================================

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'creator_db'
});

// ==============================================================================
// Connect to Database
// ==============================================================================

connection.connect(function(err) {
    if (err) {
        console.log('Error connecting to database: ' + err.stack);
        return;
    }

    console.log('Connected to database as id: ' + connection.threadId);
});

module.exports = connection;