'use strict';

// Loading dependencies.
var _ = require('underscore'),
    express = require('express'),
    bodyParser = require('body-parser');

// Loading all of the locale-specific avenger data.
var data = {
    de: require('./data/de'),
    en: require('./data/en'),
    fr: require('./data/fr')
};

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
router.get('/:locale/avengers', function(request, response) {
    var relevantDataset = data[request.params.locale],
        returnData = [];

    relevantDataset.forEach(function(record) {
        returnData.push(_.pick(record, 'id', 'slug', 'alias', 'gender'));
    });

    setTimeout(function() {
        response.type('application/json');
        response.send(xssiString + JSON.stringify(returnData));
    }, 3000);
});

// Route: Model endpoint returning an individual record.
router.get('/:locale/avengers/:slug', function(request, response) {
    var relevantDataset = data[request.params.locale],
        individualRecord = _.findWhere(relevantDataset, { slug: request.params.slug });

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