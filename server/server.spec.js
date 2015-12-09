// Loading dependencies.
var expect = require('chai').expect,
    createServer = require('./server'),
    superagent = require('superagent');

describe('Server and API Tests', function() {

    // Create a placeholder variable for the ExpressJS application.
    var expressApp = null;

    /**
     * Creates an instance of the ExpressJS application
     * before running any tests.
     */
    before(function() {
        expressApp = createServer(5678, true);
    });

    /**
     * Closes down the connection and port of the
     * ExpressJS application after all tests have
     * completed.
     */
    after(function() {
        expressApp.server.close();
        expressApp = null;
    });

    it('should re-direct requests to the root of the server', function(done) {
        superagent
            .get(expressApp.baseUrl)
            .redirects(0)
            .end(function(error, response) {
                expect(response.status).to.equal(302);
                expect(response.text).to.contain('/en');
                done();
            });
    });

    it('should load and serve the homepage', function(done) {
        superagent
            .get(expressApp.baseUrl + '/en')
            .end(function(error, response) {
                expect(error).to.not.exist;
                expect(response.status).to.equal(200);
                expect(response.type).to.equal('text/html');
                done();
            });
    });

    it('should return locale-specific translations', function(done) {
        superagent
            .get(expressApp.baseUrl + '/api/fr/translations')
            .end(function(error, response) {
                expect(error).to.not.exist;
                expect(response.status).to.equal(200);
                expect(response.type).to.equal('application/json');
                expect(response.body).to.have.ownProperty('locale_data');
                done();
            });
    });

    it('should return a collection of Avengers', function(done) {
        superagent
            .get(expressApp.baseUrl + '/api/en/avengers')
            .end(function(error, response) {
                expect(error).to.not.exist;
                expect(response.status).to.equal(200);
                expect(response.type).to.equal('application/json');
                expect(response.body).to.have.length.above(0);
                expect(response.body[0]).to.have.ownProperty('slug');
                done();
            });
    });

    it('should return an individual Avenger', function(done) {
        superagent
            .get(expressApp.baseUrl + '/api/en/avengers/thor')
            .end(function(error, response) {
                expect(error).to.not.exist;
                expect(response.status).to.equal(200);
                expect(response.type).to.equal('application/json');
                expect(response.body).to.have.ownProperty('slug');
                expect(response.body.slug).to.equal('thor');
                done();
            });
    });

});