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

    it('should override sync and set a specific dataType', function() {
        var syncSpy = new sinon.spy(this.collection, 'sync');

        this.collection.fetch();

        // The arguments from the first call to the sync method.
        var firstCallsFunctionArguments = syncSpy.args[0];

        // From the above arguments we select the `options` argument.
        var syncOptions = firstCallsFunctionArguments[2];

        // Expecting the function only to be called once and the key to exist.
        expect(syncSpy.calledOnce).to.be.true;
        expect(syncOptions.dataType).to.exist;
    });

    it('should parse API responses and return objects', function() {
        var parsedData = this.collection.parse(')]}\',[{"id":"thor","alias":"Thor"},{"id":"hulk","alias":"Hulk"}]');
        expect(parsedData).to.be.an('array');
        expect(parsedData.length).to.equal(2);
    });

    // By specifying a `done` callback, Mocha realises it needs to wait
    // for it to be called in order for the test to be successful.
    it('should fetch data correctly', function(done) {
        var self = this;

        this.timeout(4000);

        this.collection.fetch({
            success: function() {
                if (self.collection.length > 0) {
                    done();
                } else {
                    done(new Error());
                }
            },
            error: function() {
                done(new Error());
            }
        });
    });

});