const dbDebug = require('debug')("Project::MongoDB");

// Bring Mongoose into the app
var mongoose = require( 'mongoose' );
mongoose.Promise = require("bluebird");

// Build the connection string
var dbURI = 'mongodb://127.0.0.1:27017/project';

// Create the database connection
mongoose.connect(dbURI, { useMongoClient: true });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  dbDebug('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  dbDebug('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  dbDebug('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    dbDebug('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
