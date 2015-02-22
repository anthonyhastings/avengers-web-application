// Loading dependencies.
var Backbone = require('backbone'),
    $ = Backbone.$ = require('jquery'),
    AvengersCollection = require('../../src/collections/AvengersCollection'),
    AvengersModel = require('../../src/models/AvengersModel');

describe('The avengers collection', function() {

    beforeEach(function() {
    });

    afterEach(function() {
    });

    it('should use avengers model', function() {
        var dummyCollection = new AvengersCollection([{ id: 'hulk', alias: 'Hulk' }]),
            dummyModel = dummyCollection.at(0),
            instanceOfAvengersModel = dummyModel instanceof AvengersModel;

        expect(instanceOfAvengersModel).to.be.true;
    });

    it('should have an api endpoint', function() {
    });

    it('should parse response and create valid JSON', function() {
    });

});