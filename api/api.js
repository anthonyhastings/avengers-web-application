'use strict';

// Loading dependencies.
var _ = require('underscore'),
    express = require('express'),
    bodyParser = require('body-parser'),
    data = require('./data.js');

// Instantiating the framework and a router for our requests.
var app = express(),
    router = express.Router();

// The port which this script will listen to.
var apiPort = 4000;

// Anti XSSI (Cross-site script inclusion) string.
var xssiString = ')]}\',';

// Application parses request bodies: application/json, application/x-www-form-urlencoded, and multipart/form-data.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handler for all requests. Responses are given CORS headers.
router.use(function(request, response, next) {
    console.log('Request:', 'GET', request.originalUrl);
    response.header('Access-Control-Allow-Origin', '*');
    next();
});

// Route: Collection endpoint returning all records.
router.get('/avengers', function(request, response) {
    var returnData = [];

    data.forEach(function(record) {
        var subsetRecord = _.pick(record, 'id', 'alias');
        returnData.push(subsetRecord);
    });

    setTimeout(function() {
        response.type('application/json');
        response.send(xssiString + JSON.stringify(returnData));
    }, 3000);
});

// Route: Model endpoint returning an individual record.
router.get('/avengers/:id', function(request, response) {
    var individualRecord = _.findWhere(data, { id: request.params.id });

    setTimeout(function() {
        response.type('application/json');
        response.send(xssiString + JSON.stringify(individualRecord));
    }, 3000);
});

// Associate the router with our application, and prefix the routes.
app.use('/api', router);

// Listen for the above routes on the following port.
app.listen(apiPort);

// Debugging to the console that the server has started.
console.log('Mock API Server: http://localhost:' + apiPort + '/');