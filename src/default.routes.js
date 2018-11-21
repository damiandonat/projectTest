/*
* Node modules
*/
const debug = require('debug')("Project::CommonRoutes");
const express = require('express');
const router = express.Router();
const sanitize = require('mongo-sanitize');

/*
* utils
*/
const prFunctionLibrary = require('./plan/function.library');

/*
* Models
*/
const Plan = require('./plan/plan.schema');

router.get('/', function(req, res) {
    res.send({ status: 'Ok test!'});
});

module.exports = router;
