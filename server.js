/*
* DEBUGS
*/
const debug = require('debug')('Project::Main');

/*
* Modules
*/
const express = require('express');
const app = express();
const http = require('http');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require( 'mongoose' );

/*
* DB connection
* Config
*/
const db = require('./src/modules/db.module');
const config = require('./src/config/config');
const serverApi = config.serverApi;

/*
* Routes
*/
const prDefault = require('./src/default.routes');
const prPlan = require('./src/plan/plan.routes');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use( cors() );

app.use( '/', prDefault );
app.use( '/api', prPlan );

const server = http.createServer(app);

server.listen( config.port , function listening() {
  debug("Listening on %d", config.port);
});
