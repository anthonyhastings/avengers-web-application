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

// Loading all of the locale-specific translations.
var translations = {
    de: require('./locales/de.json'),
    fr: require('./locales/fr.json')
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

// Route: Locale-specific translations.
router.get('/api/:locale(de|fr)/translations', function(request, response) {
    var relevantRecord = translations[request.params.locale];

    setTimeout(function() {
        response.type('application/json');
        response.send(xssiString + JSON.stringify(relevantRecord));
    }, 1000);
});

// Route: Collection endpoint returning all records.
router.get('/api/:locale/avengers', function(request, response) {
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
router.get('/api/:locale/avengers/:slug', function(request, response) {
    var relevantDataset = data[request.params.locale],
        individualRecord = _.findWhere(relevantDataset, { slug: request.params.slug });

    setTimeout(function() {
        response.type('application/json');
        response.send(xssiString + JSON.stringify(individualRecord));
    }, 3000);
});

// Route: Homepage with locale.
router.get('/:locale(en|fr|de)', function(request, response) {
    response.render ('homepage', { locale: request.params.locale });
});

// Route: Homepage without locale (redirected).
router.get('^/$', function(request, response) {
    response.redirect('/en');
});

// Hook up the jade view engine to our application.
app.set('view engine', 'jade');
app.set('views', './views');
app.locals.pretty = true;

// Associate the router with our application.
app.use('/', router);

// Hosting the dist folder as a static directory of files.
app.use('/dist', express.static('dist'));

// Listen for the above routes on the following port.
app.listen(apiPort);

// Debugging to the console that the server has started.
console.log('Mock API Server: http://localhost:' + apiPort + '/');