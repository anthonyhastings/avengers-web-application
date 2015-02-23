'use strict';

// Loading dependencies.
var AvengersCollection = require('../collections/AvengersCollection');

// Setting up the application-wide dataStore object.
var dataStore = {};

// Constructing an instance of our collection (but not performing any fetches).
dataStore.avengers = new AvengersCollection();

module.exports = dataStore;