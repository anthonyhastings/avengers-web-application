// Loading dependencies.
var Backbone = require('backbone'),
    $ = Backbone.$ = require('jquery'),
    AvengersCollection = require('../../src/collections/AvengersCollection'),
    AvengersModel = require('../../src/models/AvengersModel'),
    rawData = require('../../../api/data');

describe('The avengers collection', function() {

    beforeEach(function() {
        this.collection = new AvengersCollection(rawData);
    });

    afterEach(function() {
        this.collection = null;
    });

    it('should use avengers model', function() {
        expect(this.collection.at(0)).to.be.instanceof(AvengersModel);
    });

    it('should have an api endpoint', function() {
        expect(this.collection.url).to.exist;
        expect(this.collection.url.length).to.be.above(0);
    });

    it('should have parse response called', function() {
    });

});